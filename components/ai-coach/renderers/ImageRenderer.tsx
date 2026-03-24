"use client";

import { CoachImagePayload } from "@/lib/ai/coachTypes";

interface ImageRendererProps {
  data: CoachImagePayload;
}

function getSrc(image: string) {
  if (image.startsWith("http")) {
    return image;
  }

  return `data:image/png;base64,${image}`;
}

export function ImageRenderer({ data }: ImageRendererProps) {
  const images = data.b64_json?.length ? data.b64_json : data.urls ?? [];

  return (
    <div className="grid gap-4">
      <article className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {data.assetType ? data.assetType.replace("_", " ") : "image concept"}
          </p>
          {data.transparentBackground ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
              Transparent background
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">
          Premium creative direction is ready. Use the actions below to refine the asset without restarting the request.
        </p>
        <details className="mt-4 rounded-[18px] border border-white/10 bg-white/5 p-3">
          <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
            Prompt details
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-100">{data.prompt}</p>
        </details>
      </article>

      {images.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {images.map((image, index) => (
            <article key={`${index}-${image.slice(0, 20)}`} className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={getSrc(image)} alt={`Generated concept ${index + 1}`} className="h-full w-full object-cover" />
            </article>
          ))}
        </div>
      ) : (
        <article className="rounded-[24px] border border-amber-400/20 bg-amber-500/5 p-5 text-sm leading-6 text-slate-100">
          The design prompt is ready, but image generation did not return renderable assets in this environment.
        </article>
      )}
    </div>
  );
}
