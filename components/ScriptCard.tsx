import { Script } from "@/types/business";

interface ScriptCardProps {
  script: Script;
}

export function ScriptCard({ script }: ScriptCardProps) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
      <div className="border-b border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white">{script.title}</div>
      <pre className="whitespace-pre-wrap px-5 py-4 font-sans text-sm leading-6 text-slate-200">{script.body}</pre>
    </article>
  );
}
