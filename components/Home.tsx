"use client";

import Link from "next/link";
import { Trophy, Star, ThumbsUp, ArrowRight, Crown, BookOpen, PenLine, Archive } from "lucide-react";
import { articles, leaderboard } from "@/data/articles";
import { useVotes } from "@/context/VoteContext";
import { useSiteConfig } from "@/context/SiteConfigContext";

function WriterOfMonth() {
  const { votes } = useVotes();
  const { config } = useSiteConfig();
  const voteCount = votes[config.womArticleId] ?? 0;
  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
      style={{ backgroundColor: "#14532d" }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-2xl"
        style={{ backgroundColor: "#166534", border: "3px solid #4ade80" }}
      >
        <Crown size={28} style={{ color: "#4ade80" }} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={14} style={{ color: "#fbbf24" }} />
          <span style={{ color: "#fbbf24", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Writer of the Month — {config.themeMonth}
          </span>
        </div>
        <h2 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.25rem" }}>
          {config.womName}
        </h2>
        <p style={{ color: "#86efac", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
          {config.womGrade}
        </p>
        <p style={{ color: "#bbf7d0", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          {config.womBio}
        </p>
        <Link
          href={`/article/${config.womArticleId}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#16a34a", color: "#ffffff" }}
        >
          Read their work <ArrowRight size={14} />
        </Link>
      </div>
      <div className="text-center shrink-0">
        <div style={{ color: "#4ade80", fontWeight: 700, fontSize: "2rem" }}>{voteCount}</div>
        <div style={{ color: "#86efac", fontSize: "0.7rem" }}>votes</div>
      </div>
    </div>
  );
}

function ThemeBanner() {
  const { config } = useSiteConfig();
  return (
    <div
      className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
      style={{ backgroundColor: "#fefce8", borderColor: "#fde68a" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: "#fef9c3", border: "2px solid #fbbf24" }}
      >
        <PenLine size={20} style={{ color: "#d97706" }} />
      </div>
      <div className="flex-1">
        <p style={{ color: "#92400e", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
          {config.themeMonth} Theme
        </p>
        <h3 style={{ color: "#78350f", fontWeight: 700, fontSize: "1.4rem", marginBottom: "0.4rem" }}>
          {config.themeName}
        </h3>
        <p style={{ color: "#92400e", fontSize: "0.85rem", lineHeight: "1.6" }}>
          {config.themeDescription}
        </p>
      </div>
      <Link
        href="/submit"
        className="shrink-0 px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "#d97706", color: "#ffffff" }}
      >
        Submit Now
      </Link>
    </div>
  );
}

function EditorChoice() {
  const { votes, voted, castVote } = useVotes();
  const { config } = useSiteConfig();
  const piece = articles.find((a) => a.id === config.editorChoiceId) ?? articles.find((a) => a.isEditorChoice)!;
  const voteCount = votes[piece.id] ?? piece.votes;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Star size={16} style={{ color: "#16a34a" }} />
        <span style={{ color: "#16a34a", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Editor&apos;s Choice — June 2026
        </span>
      </div>
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "#bbf7d0" }}>
        <div className="px-6 py-2 flex items-center gap-2" style={{ backgroundColor: "#dcfce7" }}>
          <Star size={14} style={{ color: "#15803d" }} fill="#15803d" />
          <span style={{ color: "#15803d", fontSize: "0.75rem", fontWeight: 500 }}>Featured Pick</span>
        </div>
        <div className="p-7 bg-white">
          <span
            className="inline-block px-3 py-0.5 rounded-full text-xs mb-3"
            style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
          >
            {piece.category}
          </span>
          <Link href={`/article/${piece.id}`}>
            <h2
              style={{ color: "#14532d", fontWeight: 700, fontSize: "1.6rem", lineHeight: "1.3", marginBottom: "0.75rem" }}
              className="hover:underline cursor-pointer"
            >
              {piece.title}
            </h2>
          </Link>
          <p style={{ color: "#6b7280", lineHeight: "1.8", marginBottom: "1.25rem", fontSize: "0.95rem" }}>
            {piece.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <div style={{ color: "#14532d", fontWeight: 500, fontSize: "0.875rem" }}>{piece.author}</div>
              <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{piece.grade}</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => castVote(piece.id)}
                disabled={voted[piece.id]}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all"
                style={{
                  backgroundColor: voted[piece.id] ? "#14532d" : "#f0fdf4",
                  color: voted[piece.id] ? "#ffffff" : "#15803d",
                  border: "1px solid #bbf7d0",
                  cursor: voted[piece.id] ? "default" : "pointer",
                }}
              >
                <ThumbsUp size={14} />
                {voteCount}
              </button>
              <Link
                href={`/article/${piece.id}`}
                className="flex items-center gap-1 text-sm hover:underline"
                style={{ color: "#16a34a" }}
              >
                Read <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideLeaderboard() {
  const { votes } = useVotes();

  const ranked = [...leaderboard]
    .map((w) => {
      const writerArticles = articles.filter((a) => a.author === w.name);
      const total = writerArticles.reduce((sum, a) => sum + (votes[a.id] ?? a.votes), 0);
      return { ...w, totalVotes: total };
    })
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border overflow-hidden sticky top-20" style={{ borderColor: "#bbf7d0" }}>
        <div className="px-5 py-3.5" style={{ backgroundColor: "#14532d" }}>
          <div className="flex items-center gap-2">
            <Trophy size={16} style={{ color: "#fbbf24" }} />
            <span style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.875rem" }}>Top Writers</span>
          </div>
          <p style={{ color: "#86efac", fontSize: "0.7rem", marginTop: "0.1rem" }}>
            People&apos;s Choice — June 2026
          </p>
        </div>
        <div className="bg-white divide-y" style={{ borderColor: "#f3f4f6" }}>
          {ranked.map((writer, i) => (
            <div key={writer.name} className="px-5 py-3.5 flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                style={{ backgroundColor: i === 0 ? "#fef9c3" : "#f3f4f6", color: i === 0 ? "#d97706" : "#6b7280" }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ color: "#14532d", fontWeight: 500, fontSize: "0.8rem" }} className="truncate">
                  {writer.name}
                </div>
                <div style={{ color: "#9ca3af", fontSize: "0.7rem" }}>{writer.grade}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <ThumbsUp size={11} style={{ color: "#16a34a" }} />
                <span style={{ color: "#15803d", fontSize: "0.8rem", fontWeight: 600 }}>{writer.totalVotes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border p-5 flex flex-col gap-3" style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}>
        <p style={{ color: "#6b7280", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Quick Links
        </p>
        <Link
          href="/hub"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
          style={{ border: "1px solid #e5e7eb" }}
        >
          <BookOpen size={16} style={{ color: "#16a34a" }} />
          <span style={{ color: "#14532d", fontSize: "0.85rem", fontWeight: 500 }}>Browse All Pieces</span>
        </Link>
        <Link
          href="/archive"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
          style={{ border: "1px solid #e5e7eb" }}
        >
          <Archive size={16} style={{ color: "#16a34a" }} />
          <span style={{ color: "#14532d", fontSize: "0.85rem", fontWeight: 500 }}>The Archive</span>
        </Link>
      </div>
    </div>
  );
}

function RecentCard({ article }: { article: (typeof articles)[0] }) {
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
        <p style={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: "1.7", flex: 1 }}>{article.excerpt}</p>
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

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-5 pt-24 pb-16">
      <div className="mb-6">
        <WriterOfMonth />
      </div>

      <div className="mb-6">
        <ThemeBanner />
      </div>

      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <EditorChoice />

          <div className="mt-8 pt-6 border-t" style={{ borderColor: "#e5e7eb" }}>
            <div className="flex items-center justify-between mb-5">
              <p style={{ color: "#14532d", fontWeight: 600, fontSize: "0.95rem" }}>Recent Pieces</p>
              <Link
                href="/hub"
                className="flex items-center gap-1 text-sm hover:underline"
                style={{ color: "#16a34a" }}
              >
                Browse all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {articles
                .filter((a) => !a.isEditorChoice)
                .slice(0, 4)
                .map((article) => (
                  <RecentCard key={article.id} article={article} />
                ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-64 shrink-0">
          <SideLeaderboard />
        </div>
      </div>
    </div>
  );
}
