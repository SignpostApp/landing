import Image from "next/image";
import type { Post, Tint } from "../posts";

/**
 * Banner / header image for a post. The displayed area is a fixed 12:5 (2.4:1)
 * box, which is why the recommended source image is 2400 × 1000 px.
 *
 * If `post.image` is set, it is shown (object-cover). Otherwise an on-brand
 * gradient placeholder is rendered so the layout never shows a broken image and
 * the index/post still look finished before custom art is added.
 */

// Each tint maps to two accent RGB triples used for the placeholder's glows.
const TINTS: Record<Tint, [string, string]> = {
  blue: ["59,130,246", "37,99,235"],
  indigo: ["99,102,241", "79,70,229"],
  sky: ["14,165,233", "2,132,199"],
  cyan: ["6,182,212", "8,145,178"],
  violet: ["139,92,246", "124,58,237"],
};

export default function PostBanner({
  post,
  priority = false,
  rounded = true,
  sizes = "(max-width: 1024px) 100vw, 1024px",
}: {
  post: Post;
  priority?: boolean;
  /** Apply rounded-2xl corners. Set false when a parent already clips. */
  rounded?: boolean;
  sizes?: string;
}) {
  const [a, b] = TINTS[post.tint];
  const radius = rounded ? "rounded-2xl" : "";

  if (post.image) {
    return (
      <div
        className={`relative w-full aspect-[12/5] overflow-hidden border border-slate-200 bg-slate-100 ${radius}`}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-[12/5] overflow-hidden border border-slate-200 ${radius}`}
      style={{
        background: [
          `radial-gradient(120% 140% at 0% 0%, rgba(${a},0.20), transparent 55%)`,
          `radial-gradient(130% 150% at 100% 100%, rgba(${b},0.18), transparent 55%)`,
          "linear-gradient(180deg, #ffffff 0%, #f6f8fc 100%)",
        ].join(", "),
      }}
      aria-hidden="true"
    >
      {/* faint dot grid for texture */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
          style={{ boxShadow: `0 10px 30px -12px rgba(${b},0.45)` }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: `rgb(${b})` }}
          />
          {post.category}
        </span>
      </div>
    </div>
  );
}
