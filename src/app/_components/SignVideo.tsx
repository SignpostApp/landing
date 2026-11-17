"use client";

import { useState } from "react";

import { youTubeEmbedUrl, youTubeThumbnail, youTubeWatchUrl, type SignVideo as SignVideoData } from "@/lib/youtube";

export default function SignVideo({ video, title }: { video: SignVideoData; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900">
        {playing ? (
          <iframe
            src={youTubeEmbedUrl(video, true)}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={youTubeThumbnail(video)}
              alt=""
              width={480}
              height={360}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-blue-600 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.6)] transition-transform duration-150 group-hover:scale-105">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
                <path d="M8.5 6.2v11.6c0 .8.9 1.3 1.6.9l9-5.8a1 1 0 0 0 0-1.7l-9-5.8c-.7-.5-1.6 0-1.6.8Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-xs text-slate-500">
        Reference clip
        {video.author ? (
          <>
            {" "}by{" "}
            {video.authorUrl ? (
              <a href={video.authorUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-slate-900">
                {video.author}
              </a>
            ) : (
              video.author
            )}
          </>
        ) : null}
        {" "}on{" "}
        <a href={youTubeWatchUrl(video)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-slate-900">
          YouTube
        </a>
        .
      </figcaption>
    </figure>
  );
}
