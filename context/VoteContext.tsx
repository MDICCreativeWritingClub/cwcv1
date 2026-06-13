"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { articles as initialArticles } from "@/data/articles";

interface VoteContextType {
  votes: Record<string, number>;
  voted: Record<string, boolean>;
  castVote: (id: string) => void;
}

const VoteContext = createContext<VoteContextType | null>(null);

export function VoteProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    if (typeof window === "undefined")
      return Object.fromEntries(initialArticles.map((a) => [a.id, a.votes]));
    const stored = localStorage.getItem("cwc_votes");
    if (stored) return JSON.parse(stored);
    return Object.fromEntries(initialArticles.map((a) => [a.id, a.votes]));
  });

  const [voted, setVoted] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    const stored = localStorage.getItem("cwc_voted");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("cwc_votes", JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem("cwc_voted", JSON.stringify(voted));
  }, [voted]);

  function castVote(id: string) {
    if (voted[id]) return;
    setVotes((v) => ({ ...v, [id]: (v[id] ?? 0) + 1 }));
    setVoted((v) => ({ ...v, [id]: true }));
  }

  return (
    <VoteContext.Provider value={{ votes, voted, castVote }}>
      {children}
    </VoteContext.Provider>
  );
}

export function useVotes() {
  const ctx = useContext(VoteContext);
  if (!ctx) throw new Error("useVotes must be used inside VoteProvider");
  return ctx;
}
