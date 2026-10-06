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

type Drag = {
  index: number;
  body: Matter.Body;
  constraint: Matter.Constraint;
  inertia: number;
  pointerId: number;
  trail: (Point & { t: number })[];
};

type Sim = {
  M: MatterModule;
  engine: Matter.Engine;
  bodies: (Matter.Body | null)[];
  indexById: Map<number, number>;
  scale: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  pivotDelta: Point;
  rendered: Float64Array;
  frame: number;
  last: number;
  carry: number;
  drag: Drag | null;
  thrown: { body: Matter.Body; until: number } | null;
};

type Pending = Point & { index: number; pointerId: number };

const LIT_MS = 2000;
const STEP_MS = 1000 / 60;
const THROW_WINDOW_MS = 90;
const THROWN_MS = 1200;
const MAX_THROW = 42;
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
    restitution: 0.25,
    friction: 0.5,
    frictionStatic: 0.8,
    frictionAir: 0.012,
    density: 0.0016,
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
      if (hold || sim?.drag?.index === index) return;
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

    function tick(now: number) {
      if (!sim) return;
      sim.frame = 0;
      sim.carry += Math.min(now - sim.last, 64);
      sim.last = now;
      let steps = 0;
      while (sim.carry >= STEP_MS && steps < 4) {
        sim.M.Engine.update(sim.engine, STEP_MS);
        sim.carry -= STEP_MS;
        steps += 1;
      }
      render();
      const resting = !sim.drag && sim.bodies.every((body) => !body || body.isSleeping);
      if (resting || !visible) return;
      sim.frame = requestAnimationFrame(tick);
    }

    function run() {
      if (!sim || sim.frame || !visible) return;
      sim.last = performance.now();
      sim.carry = 0;
      sim.frame = requestAnimationFrame(tick);
    }

    function build(M: MatterModule): Sim {
      const rect = wrap!.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const scale = Math.max(width / ILY_VIEWBOX.width, height / ILY_VIEWBOX.height);
      const offsetX = (width - ILY_VIEWBOX.width * scale) / 2;
      const offsetY = height - ILY_VIEWBOX.height * scale;
      const unit = ILY_SCALE * scale;
      const wall = 400;
      const ceiling = offsetY - 40 * scale;

      const engine = M.Engine.create({ gravity: { x: 0, y: 1.4 }, enableSleeping: true });
      M.Composite.add(engine.world, [
        M.Bodies.rectangle(width / 2, height + wall / 2, width + wall * 2, wall, { isStatic: true }),
        M.Bodies.rectangle(width / 2, ceiling - wall / 2, width + wall * 2, wall, { isStatic: true }),
        M.Bodies.rectangle(-wall / 2, height / 2, wall, height * 4, { isStatic: true }),
        M.Bodies.rectangle(width + wall / 2, height / 2, wall, height * 4, { isStatic: true }),
      ]);

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

      const next: Sim = {
        M,
        engine,
        bodies,
        indexById,
        scale,
        offsetX,
        offsetY,
        width,
        height,
        pivotDelta,
        rendered: new Float64Array(bodies.length * 3).fill(Number.NaN),
        frame: 0,
        last: 0,
        carry: 0,
        drag: null,
        thrown: null,
      };

      M.Events.on(engine, "beforeUpdate", () => {
        if (next.drag) M.Body.setAngularVelocity(next.drag.body, 0);
      });

      M.Events.on(engine, "collisionStart", (event) => {
        const held = next.drag?.body;
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

      return next;
    }

    function beginDrag(index: number, pointerId: number, point: Point) {
      if (!sim || sim.drag) return;
      const body = sim.bodies[index];
      if (!body) return;
      const { M } = sim;
      M.Sleeping.set(body, false);
      const constraint = M.Constraint.create({
        pointA: point,
        bodyB: body,
        pointB: { x: point.x - body.position.x, y: point.y - body.position.y },
        stiffness: 0.2,
        damping: 0.1,
        length: 0,
      });
      M.Composite.add(sim.engine.world, constraint);
      sim.drag = {
        index,
        body,
        constraint,
        inertia: body.inertia,
        pointerId,
        trail: [{ ...point, t: performance.now() }],
      };
      M.Body.setInertia(body, Infinity);
      M.Body.setAngularVelocity(body, 0);
      light(index, true);
      wrap!.dataset.dragging = "";
      run();
    }

    function endDrag() {
      const drag = sim?.drag;
      if (!sim || !drag) return;
      const { M } = sim;
      M.Composite.remove(sim.engine.world, drag.constraint);
      M.Body.setInertia(drag.body, drag.inertia);

      const now = performance.now();
      const recent = drag.trail.filter((sample) => now - sample.t <= THROW_WINDOW_MS);
      const first = recent[0];
      const last = recent[recent.length - 1];
      const elapsed = first && last ? last.t - first.t : 0;
      const vx = elapsed > 0 ? ((last.x - first.x) / elapsed) * STEP_MS : 0;
      const vy = elapsed > 0 ? ((last.y - first.y) / elapsed) * STEP_MS : 0;
      M.Body.setVelocity(drag.body, {
        x: clamp(vx, -MAX_THROW, MAX_THROW),
        y: clamp(vy, -MAX_THROW, MAX_THROW),
      });
      M.Body.setAngularVelocity(drag.body, clamp(vx * 0.006, -0.25, 0.25));

      sim.drag = null;
      sim.thrown = Math.hypot(vx, vy) > 4 ? { body: drag.body, until: now + THROWN_MS } : null;
      delete wrap!.dataset.dragging;
      light(drag.index);
      run();
    }

    async function activate(index: number, event: PointerEvent) {
      if (sim || starting) return;
      starting = true;
      pending = { index, pointerId: event.pointerId, ...localPoint(event) };
      const M = await loadMatter();
      starting = false;
      if (disposed) return;
      sim = build(M);
      wrap!.dataset.live = "";
      const grab = pending;
      pending = null;
      if (grab) beginDrag(grab.index, grab.pointerId, grab);
      run();
    }

    function reset() {
      if (!sim) return;
      cancelAnimationFrame(sim.frame);
      sim.M.Events.off(sim.engine, "beforeUpdate");
      sim.M.Events.off(sim.engine, "collisionStart");
      sim.M.Composite.clear(sim.engine.world, false);
      sim.M.Engine.clear(sim.engine);
      sim = null;
      pending = null;
      delete wrap!.dataset.live;
      delete wrap!.dataset.dragging;
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
      if (sim?.drag) return;
      light(index);
    }

    function onPointerDown(event: PointerEvent) {
      const index = handIndex(event.target);
      if (index < 0) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      event.preventDefault();
      if (reduceMotion.matches) {
        light(index);
        return;
      }
      try {
        svg!.setPointerCapture(event.pointerId);
      } catch {}
      if (!sim) {
        light(index, true);
        void activate(index, event);
        return;
      }
      beginDrag(index, event.pointerId, localPoint(event));
    }

    function onPointerMove(event: PointerEvent) {
      if (pending && pending.pointerId === event.pointerId) {
        Object.assign(pending, localPoint(event));
        return;
      }
      const drag = sim?.drag;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const point = localPoint(event);
      drag.constraint.pointA = point;
      drag.trail.push({ ...point, t: performance.now() });
      if (drag.trail.length > 12) drag.trail.shift();
      sim!.M.Sleeping.set(drag.body, false);
    }

    function onPointerUp(event: PointerEvent) {
      if (pending && pending.pointerId === event.pointerId) {
        const index = pending.index;
        pending = null;
        light(index);
        return;
      }
      if (sim?.drag?.pointerId === event.pointerId) endDrag();
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
      if (!visible) return;
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
      timers.forEach((timer) => window.clearTimeout(timer));
      reset();
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
