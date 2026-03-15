"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { ChatMessage } from "@/types/business";

interface PromptGroup {
  title: string;
  prompts: string[];
}

interface ChatWindowProps {
  history: ChatMessage[];
  onSendMessage: (message: string) => void;
  promptGroups?: PromptGroup[];
}

export function ChatWindow({ history, onSendMessage, promptGroups }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) {
      return;
    }
    node.scrollTop = node.scrollHeight;
  }, [history]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextMessage = message.trim();
    if (!nextMessage) {
      return;
    }

    onSendMessage(nextMessage);
    setMessage("");
  }

  return (
    <div className="rounded-[28px] border border-white/10 bg-panel-gradient p-5 shadow-card">
      {promptGroups && promptGroups.length > 0 && (
        <div className="mb-4 grid gap-3">
          {promptGroups.map((group) => (
            <div key={group.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{group.title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => onSendMessage(prompt)}
                    className="rounded-full border border-white/10 bg-black/10 px-3 py-2 text-left text-xs font-medium text-slate-100 transition hover:border-accent/40 hover:bg-accent/10"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        ref={scrollRef}
        className="grid max-h-[60vh] min-h-[440px] gap-3 overflow-y-auto rounded-[24px] border border-white/10 bg-slate-950/70 p-4"
      >
        {history.map((item, index) => (
          <div
            key={`${item.role}-${index}`}
            className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 ${
              item.role === "user"
                ? "justify-self-end border border-accent/60 bg-accent/10 text-white"
                : "justify-self-start border border-white/10 bg-white/5 text-slate-100"
            }`}
          >
            {item.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask about pricing, leads, scripts, tools, LLC, insurance..."
          className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          className="rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/15"
        >
          Send
        </button>
      </form>
    </div>
  );
}
