# Blog banner images

Drop your post header/banner images in this folder.

## Size

**2400 × 1000 px** — a 12:5 ratio (2.4 : 1).

- **Format:** JPG or WebP (photos/illustrations) — keep it under ~400 KB so pages stay fast.
- **Why 2400 wide:** the banner displays up to ~1024 px wide, and 2400 px keeps it
  crisp on high-DPI / Retina screens (which render at 2×).
- **Safe zone:** keep titles, faces, and anything important inside the centered
  **80%** of the image. On phones the banner is cropped to a taller slice, so the
  far left/right edges can get cut off.
- **No text needed:** the post title, category, date, and author are rendered in
  HTML *below* the banner, so your image can be purely visual. (You can bake text
  in if you want, just keep it inside the safe zone.)

## Wiring an image to a post

1. Save the file here, e.g. `public/blog/how-to-learn-the-asl-alphabet.jpg`
2. Open `src/app/blog/posts.ts`, find that post, and set its `image` field:

   ```ts
   image: "/blog/how-to-learn-the-asl-alphabet.jpg",
   ```

   (Each post already has this line commented out with the suggested filename —
   just uncomment it.)

If `image` is left unset, the post shows an on-brand gradient placeholder instead,
so the blog always looks finished even before you add art.

## Optional: social share image

If you don't set a per-post `image`, social/preview cards fall back to
`/public/og-image.png` (1200 × 630). You can leave that as-is.
