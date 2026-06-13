"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, BookOpen } from "lucide-react";
import { articles, categories, type Category } from "@/data/articles";
import { useVotes } from "@/context/VoteContext";

function ArticleCard({ article }: { article: (typeof articles)[0] }) {
  const { votes, voted, castVote } = useVotes();
  const voteCount = votes[article.id] ?? article.votes;

  return (
    <div className="rounded-2xl border bg-white flex flex-col hover:shadow-md transition-shadow" style={{ borderColor: "#e5e7eb" }}>
      <div className="p-5 flex flex-col flex-1">
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs mb-3 self-start"
          style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
        >
          {article.category}
        </span>
        <Link href={`/article/${article.id}`}>
          <h3
            style={{ color: "#14532d", fontWeight: 600, fontSize: "1rem", lineHeight: "1.4", marginBottom: "0.5rem" }}
            className="hover:underline cursor-pointer"
          >
            {article.title}
          </h3>
        </Link>
        <p style={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: "1.7", flex: 1 }}>
          {article.excerpt}
        </p>
      </div>
      <div className="px-5 py-3 flex items-center justify-between border-t" style={{ borderColor: "#f3f4f6" }}>
        <div>
          <div style={{ color: "#374151", fontSize: "0.8rem", fontWeight: 500 }}>{article.author}</div>
          <div style={{ color: "#9ca3af", fontSize: "0.7rem" }}>{article.grade.split("—")[0].trim()}</div>
        </div>
        <button
          onClick={() => castVote(article.id)}
          disabled={voted[article.id]}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all"
          style={{
            backgroundColor: voted[article.id] ? "#14532d" : "#f0fdf4",
            color: voted[article.id] ? "#ffffff" : "#15803d",
            border: "1px solid #bbf7d0",
            cursor: voted[article.id] ? "default" : "pointer",
          }}
        >
          <ThumbsUp size={12} />
          {voteCount}
        </button>
      </div>
    </div>
  );
}

export function LiteraryHub() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <div className="max-w-7xl mx-auto px-5 pt-24 pb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={22} style={{ color: "#16a34a" }} />
          <h1 style={{ color: "#14532d", fontWeight: 700, fontSize: "1.75rem" }}>The Literary Hub</h1>
        </div>
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
          Browse every piece published by Manarat CWC — filtered by category.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-8 pb-5 border-b" style={{ borderColor: "#e5e7eb" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="px-4 py-1.5 rounded-full text-sm transition-all"
            style={{
              backgroundColor: active === cat ? "#14532d" : "#f0fdf4",
              color: active === cat ? "#ffffff" : "#15803d",
              border: `1px solid ${active === cat ? "#14532d" : "#bbf7d0"}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: "#9ca3af" }}>
          No pieces in this category yet.
        </div>
      ) : (
        <>
          <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "1.25rem" }}>
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            {active !== "All" ? ` in ${active}` : ""}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
