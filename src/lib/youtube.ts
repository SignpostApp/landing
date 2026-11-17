export interface SignVideo {
  id: string;
  start?: number;
  end?: number;
  title?: string;
  author?: string;
  authorUrl?: string;
  uploadDate?: string;
}

export function youTubeThumbnail(video: SignVideo): string {
  return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
}

export function youTubeEmbedUrl(video: SignVideo, autoplay: boolean): string {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1" });
  if (autoplay) params.set("autoplay", "1");
  if (video.start !== undefined) params.set("start", String(video.start));
  if (video.end !== undefined) params.set("end", String(video.end));
  return `https://www.youtube-nocookie.com/embed/${video.id}?${params.toString()}`;
}

export function youTubeWatchUrl(video: SignVideo): string {
  const url = new URL(`https://www.youtube.com/watch?v=${video.id}`);
  if (video.start !== undefined) url.searchParams.set("t", `${video.start}s`);
  return url.toString();
}
