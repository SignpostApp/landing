"use client";

import { useEffect, useRef } from "react";
import type Matter from "matter-js";

import {
  ILY_CENTER,
  ILY_CREASES,
  ILY_LAYOUT,
  ILY_PARTS,
  ILY_PATH,
  ILY_SCALE,
  ILY_VIEWBOX,
} from "./ilyHand";

type MatterModule = typeof Matter;

type Point = { x: number; y: number };

type Held = {
  index: number;
  body: Matter.Body;
  angle: number;
  inertia: number;
};

type Sim = {
  M: MatterModule;
  engine: Matter.Engine;
  runner: Matter.Runner;
  mouse: Matter.Mouse;
  bodies: (Matter.Body | null)[];
  scale: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  pivotDelta: Point;
  rendered: Float64Array;
  running: boolean;
  pointerId: number | null;
  held: Held | null;
  thrown: { body: Matter.Body; until: number } | null;
};

type Pending = Point & { pointerId: number };

const LIT_MS = 2000;
const THROWN_MS = 1200;
const WALL = 100;
const CEILING_GAP = 16;
const PIVOT_X = ILY_CENTER.x * ILY_SCALE;
const PIVOT_Y = ILY_CENTER.y * ILY_SCALE;

let matterModule: Promise<MatterModule> | null = null;

function loadMatter() {
  matterModule ??= import("matter-js").then((mod) => mod.default);
  return matterModule;
}

function handTransform(x: number, y: number, degrees: number) {
  return `translate(${x} ${y}) rotate(${degrees} ${PIVOT_X} ${PIVOT_Y}) scale(${ILY_SCALE})`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createHand(M: MatterModule, unit: number) {
  const parts = ILY_PARTS.map((part) => {
    if (part.kind === "rect") {
      return M.Bodies.rectangle(part.x * unit, part.y * unit, part.w * unit, part.h * unit, {
        chamfer: { radius: part.r * unit },
      });
    }
    const vertices = part.points.map(([x, y]) => ({ x: x * unit, y: y * unit }));
    const centre = M.Vertices.centre(vertices);
    return M.Bodies.fromVertices(centre.x, centre.y, [vertices]);
  });

  return M.Body.create({
    parts,
    restitution: 0.3,
    friction: 0.4,
    frictionAir: 0.01,
  });
}

export default function IlyPile() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const handRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const hands = handRefs.current;
    const timers = new Map<number, number>();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sim: Sim | null = null;
    let pending: Pending | null = null;
    let starting = false;
    let visible = true;
    let disposed = false;

    function light(index: number, hold = false) {
      const el = hands[index];
      if (!el) return;
      el.classList.add("is-lit");
      const timer = timers.get(index);
      if (timer !== undefined) {
        window.clearTimeout(timer);
        timers.delete(index);
      }
      if (hold || sim?.held?.index === index) return;
      timers.set(
        index,
        window.setTimeout(() => {
          el.classList.remove("is-lit");
          timers.delete(index);
        }, LIT_MS),
      );
    }

    function handIndex(target: EventTarget | null) {
      const el = target instanceof Element ? target.closest<SVGGElement>("[data-hand]") : null;
      return el ? Number(el.dataset.hand) : -1;
    }

    function localPoint(event: PointerEvent): Point {
      const rect = wrap!.getBoundingClientRect();
      return {
        x: clamp(event.clientX - rect.left, 4, rect.width - 4),
        y: clamp(event.clientY - rect.top, 4, rect.height - 4),
      };
    }

    function render() {
      if (!sim) return;
      const { bodies, rendered, offsetX, offsetY, scale, pivotDelta } = sim;
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const el = hands[i];
        if (!body || !el) continue;
        const angle = body.angle;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const tx = (body.position.x - offsetX) / scale - PIVOT_X - (cos * pivotDelta.x - sin * pivotDelta.y);
        const ty = (body.position.y - offsetY) / scale - PIVOT_Y - (sin * pivotDelta.x + cos * pivotDelta.y);
        const degrees = (angle * 180) / Math.PI;
        const slot = i * 3;
        if (
          Math.abs(rendered[slot] - tx) < 0.05 &&
          Math.abs(rendered[slot + 1] - ty) < 0.05 &&
          Math.abs(rendered[slot + 2] - degrees) < 0.05
        ) {
          continue;
        }
        rendered[slot] = tx;
        rendered[slot + 1] = ty;
        rendered[slot + 2] = degrees;
        el.setAttribute("transform", handTransform(+tx.toFixed(2), +ty.toFixed(2), +degrees.toFixed(2)));
      }
    }

    function run() {
      if (!sim || sim.running || !visible) return;
      sim.running = true;
      sim.M.Runner.run(sim.runner, sim.engine);
    }

    function pause() {
      if (!sim || !sim.running) return;
      sim.running = false;
      sim.M.Runner.stop(sim.runner);
    }

    function drop(next: Sim) {
      const held = next.held;
      if (!held) return;
      next.M.Body.setInertia(held.body, held.inertia);
      next.held = null;
      next.thrown =
        held.body.speed > 4 ? { body: held.body, until: performance.now() + THROWN_MS } : null;
      delete wrap!.dataset.dragging;
      light(held.index);
    }

    function build(M: MatterModule): Sim {
      const rect = wrap!.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const scale = Math.max(width / ILY_VIEWBOX.width, height / ILY_VIEWBOX.height);
      const offsetX = (width - ILY_VIEWBOX.width * scale) / 2;
      const offsetY = height - ILY_VIEWBOX.height * scale;
      const unit = ILY_SCALE * scale;

      const engine = M.Engine.create({ gravity: { x: 0, y: 1.5 } });
      const indexById = new Map<number, number>();
      let pivotDelta: Point = { x: 0, y: 0 };

      const bodies = ILY_LAYOUT.map(([x, y, degrees], i) => {
        const body = createHand(M, unit);
        pivotDelta = { x: body.position.x / scale - PIVOT_X, y: body.position.y / scale - PIVOT_Y };
        const angle = (degrees * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const cx = offsetX + (x + PIVOT_X + cos * pivotDelta.x - sin * pivotDelta.y) * scale;
        const cy = offsetY + (y + PIVOT_Y + sin * pivotDelta.x + cos * pivotDelta.y) * scale;
        if (cx < 0 || cx > width) {
          hands[i]?.style.setProperty("display", "none");
          return null;
        }
        M.Body.setPosition(body, { x: cx, y: cy });
        M.Body.setAngle(body, angle);
        M.Composite.add(engine.world, body);
        indexById.set(body.id, i);
        return body;
      });

      M.Composite.add(engine.world, [
        M.Bodies.rectangle(width / 2, height + WALL / 2, width * 2, WALL, { isStatic: true }),
        M.Bodies.rectangle(width / 2, -WALL / 2, width * 2, WALL, { isStatic: true }),
        M.Bodies.rectangle(-WALL / 2, height / 2, WALL, height * 3, { isStatic: true }),
        M.Bodies.rectangle(width + WALL / 2, height / 2, WALL, height * 3, { isStatic: true }),
      ]);

      const mouse = M.Mouse.create(document.createElement("div"));
      const grab = M.MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2 } });
      M.Composite.add(engine.world, grab);

      const next: Sim = {
        M,
        engine,
        runner: M.Runner.create(),
        mouse,
        bodies,
        scale,
        offsetX,
        offsetY,
        width,
        height,
        pivotDelta,
        rendered: new Float64Array(bodies.length * 3).fill(Number.NaN),
        running: false,
        pointerId: null,
        held: null,
        thrown: null,
      };

      M.Events.on(grab, "startdrag", () => {
        const body = grab.body;
        const index = indexById.get(body.id);
        if (index === undefined) return;
        drop(next);
        next.held = { index, body, angle: body.angle, inertia: body.inertia };
        M.Body.setAngularVelocity(body, 0);
        M.Body.setInertia(body, Infinity);
        light(index, true);
        wrap!.dataset.dragging = "";
      });

      M.Events.on(grab, "enddrag", () => drop(next));

      M.Events.on(engine, "beforeUpdate", () => {
        const held = next.held;
        if (!held || grab.body !== held.body) return;
        const { body } = held;
        M.Body.setAngle(body, held.angle);
        M.Body.setAngularVelocity(body, 0);
        const reach = CEILING_GAP + (body.position.y - body.bounds.min.y);
        if (mouse.position.y < reach) mouse.position.y = reach;
        if (body.bounds.min.y < CEILING_GAP) {
          M.Body.setPosition(body, {
            x: body.position.x,
            y: body.position.y + CEILING_GAP - body.bounds.min.y,
          });
          M.Body.setVelocity(body, { x: body.velocity.x, y: Math.max(0, body.velocity.y) });
        }
      });

      M.Events.on(engine, "collisionStart", (event) => {
        const held = next.held?.body;
        const thrown = next.thrown && performance.now() < next.thrown.until ? next.thrown.body : null;
        for (const pair of event.pairs) {
          const a = pair.bodyA.parent;
          const b = pair.bodyB.parent;
          const ia = indexById.get(a.id);
          const ib = indexById.get(b.id);
          if (ia === undefined || ib === undefined) continue;
          if (a === held || a === thrown) light(ib);
          else if (b === held || b === thrown) light(ia);
        }
      });

      M.Events.on(next.runner, "afterTick", render);

      return next;
    }

    function press(pointerId: number, point: Point) {
      if (!sim) return;
      sim.pointerId = pointerId;
      sim.mouse.position.x = point.x;
      sim.mouse.position.y = point.y;
      sim.mouse.button = 0;
    }

    async function activate() {
      if (starting) return;
      starting = true;
      const M = await loadMatter();
      starting = false;
      if (disposed || sim) return;
      sim = build(M);
      wrap!.dataset.live = "";
      const grabAt = pending;
      pending = null;
      if (grabAt) press(grabAt.pointerId, grabAt);
      run();
    }

    function reset() {
      if (!sim) return;
      const { M, engine, runner, held } = sim;
      M.Runner.stop(runner);
      M.Composite.clear(engine.world, false);
      M.Engine.clear(engine);
      sim = null;
      pending = null;
      delete wrap!.dataset.live;
      delete wrap!.dataset.dragging;
      if (held) light(held.index);
      ILY_LAYOUT.forEach(([x, y, degrees], i) => {
        const el = hands[i];
        if (!el) return;
        el.setAttribute("transform", handTransform(x, y, degrees));
        el.style.removeProperty("display");
      });
    }

    function onPointerOver(event: PointerEvent) {
      const index = handIndex(event.target);
      if (index < 0) return;
      void loadMatter();
      if (sim?.held) return;
      light(index);
    }

    function capture(pointerId: number) {
      try {
        svg!.setPointerCapture(pointerId);
      } catch {}
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (sim) {
        if (sim.pointerId !== null) return;
        event.preventDefault();
        capture(event.pointerId);
        press(event.pointerId, localPoint(event));
        return;
      }
      const index = handIndex(event.target);
      if (index < 0) return;
      event.preventDefault();
      light(index);
      if (reduceMotion.matches) return;
      capture(event.pointerId);
      pending = { pointerId: event.pointerId, ...localPoint(event) };
      void activate();
    }

    function onPointerMove(event: PointerEvent) {
      if (!sim || sim.pointerId !== event.pointerId) return;
      const point = localPoint(event);
      sim.mouse.position.x = point.x;
      sim.mouse.position.y = point.y;
    }

    function onPointerUp(event: PointerEvent) {
      if (pending?.pointerId === event.pointerId) {
        pending = null;
        return;
      }
      if (!sim || sim.pointerId !== event.pointerId) return;
      sim.pointerId = null;
      sim.mouse.button = -1;
    }

    function onTouchStart(event: TouchEvent) {
      if (handIndex(event.target) >= 0) event.preventDefault();
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!sim || !entry) return;
      const { width, height } = entry.contentRect;
      if (Math.abs(width - sim.width) > 1 || Math.abs(height - sim.height) > 1) reset();
    });
    resizeObserver.observe(wrap);

    const touchOnly = window.matchMedia("(hover: none)");
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (!visible) {
        pause();
        return;
      }
      if (touchOnly.matches) void loadMatter();
      run();
    });
    visibilityObserver.observe(wrap);

    svg.addEventListener("pointerover", onPointerOver);
    svg.addEventListener("pointerdown", onPointerDown);
    svg.addEventListener("pointermove", onPointerMove);
    svg.addEventListener("pointerup", onPointerUp);
    svg.addEventListener("pointercancel", onPointerUp);
    svg.addEventListener("touchstart", onTouchStart, { passive: false });

    return () => {
      disposed = true;
      svg.removeEventListener("pointerover", onPointerOver);
      svg.removeEventListener("pointerdown", onPointerDown);
      svg.removeEventListener("pointermove", onPointerMove);
      svg.removeEventListener("pointerup", onPointerUp);
      svg.removeEventListener("pointercancel", onPointerUp);
      svg.removeEventListener("touchstart", onTouchStart);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reset();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div ref={wrapRef} className="ily-pile" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${ILY_VIEWBOX.width} ${ILY_VIEWBOX.height}`}
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <filter id="ily-glow-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <path id="ily-glow-shape" d={ILY_PATH} fill="#2563eb" filter="url(#ily-glow-blur)" />
          <g id="ily-hand-shape">
            <path
              d={ILY_PATH}
              fill="currentColor"
              stroke="#fcfcfd"
              strokeWidth={12}
              strokeLinejoin="round"
              paintOrder="stroke"
            />
            <path
              d={ILY_CREASES}
              fill="none"
              stroke="rgba(15, 23, 42, 0.13)"
              strokeWidth={3.2}
              strokeLinecap="round"
            />
          </g>
        </defs>
        {ILY_LAYOUT.map(([x, y, degrees], i) => (
          <g
            key={i}
            ref={(el) => {
              handRefs.current[i] = el;
            }}
            className="ily-hand"
            data-hand={i}
            transform={handTransform(x, y, degrees)}
          >
            <use href="#ily-glow-shape" className="ily-glow" />
            <use href="#ily-hand-shape" />
          </g>
        ))}
      </svg>
    </div>
  );
}
