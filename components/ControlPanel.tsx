"use client";

import { useState } from "react";
import {
  Eye, EyeOff, Lock, Settings, Palette, Crown, Star, BookOpen,
  RotateCcw, Save, CheckCircle, BarChart2, Users, FileText, ThumbsUp,
} from "lucide-react";
import { articles, archiveArticles, leaderboard } from "@/data/articles";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useSubmissions } from "@/context/SubmissionsContext";
import { useVotes } from "@/context/VoteContext";

const ADMIN_PASSWORD = "1234567";

type PanelTab = "overview" | "theme" | "wom" | "choice" | "content";

const allArticles = [...articles, ...archiveArticles];
const allAuthors = Array.from(new Set(allArticles.map((a) => a.author))).map((name) => {
  const article = allArticles.find((a) => a.author === name)!;
  return { name, grade: article.grade };
});

function SaveBanner({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div
      className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg z-50"
      style={{ backgroundColor: "#14532d", color: "#ffffff" }}
    >
      <CheckCircle size={16} />
      <span style={{ fontSize: "0.875rem" }}>Changes saved</span>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}>
      <div className="flex items-center gap-2 mb-3" style={{ color: "#16a34a" }}>
        {icon}
        <span style={{ color: "#6b7280", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
      </div>
      <p style={{ color: "#14532d", fontWeight: 700, fontSize: "1.75rem", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "0.25rem" }}>{sub}</p>}
    </div>
  );
}

export function ControlPanel() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<PanelTab>("overview");
  const [saved, setSaved] = useState(false);

  const { config, updateConfig, resetConfig } = useSiteConfig();
  const { submissions } = useSubmissions();
  const { votes } = useVotes();

  const [draft, setDraft] = useState({ ...config });

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      setError(false);
      setDraft({ ...config });
    } else {
      setError(true);
    }
  }

  function handleSave() {
    updateConfig(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleReset() {
    if (confirm("Reset all site settings to defaults? This cannot be undone.")) {
      resetConfig();
      setDraft({ ...config });
    }
  }

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto px-5 pt-32 pb-20">
        <div className="rounded-2xl border p-8 text-center" style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "#fef9c3", border: "2px solid #fbbf24" }}
          >
            <Lock size={24} style={{ color: "#d97706" }} />
          </div>
          <h1 style={{ color: "#14532d", fontWeight: 700, fontSize: "1.4rem", marginBottom: "0.4rem" }}>
            Control Panel
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: "1.75rem", lineHeight: "1.6" }}>
            Administrator access only. Enter the admin password to continue.
          </p>
          <form onSubmit={handleUnlock} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Admin password"
                style={{
                  width: "100%",
                  padding: "0.65rem 2.5rem 0.65rem 1rem",
                  borderRadius: "0.75rem",
                  border: `1px solid ${error ? "#fca5a5" : "#e5e7eb"}`,
                  fontSize: "0.875rem",
                  outline: "none",
                  color: "#111827",
                  textAlign: "center",
                  letterSpacing: "0.1em",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p style={{ color: "#dc2626", fontSize: "0.8rem" }}>Incorrect password. Please try again.</p>
            )}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#14532d", fontWeight: 500 }}
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalVotes = articles.reduce((sum, a) => sum + (votes[a.id] ?? a.votes), 0);
  const pendingCount  = submissions.filter((s) => s.status === "pending").length;
  const approvedCount = submissions.filter((s) => s.status === "approved").length;

  const tabConfig: { key: PanelTab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview",         icon: <BarChart2 size={14} /> },
    { key: "theme",    label: "Theme",             icon: <Palette size={14} /> },
    { key: "wom",      label: "Writer of Month",   icon: <Crown size={14} /> },
    { key: "choice",   label: "Editor's Choice",   icon: <Star size={14} /> },
    { key: "content",  label: "Content",           icon: <BookOpen size={14} /> },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.6rem 1rem",
    borderRadius: "0.75rem",
    border: "1px solid #e5e7eb",
    fontSize: "0.875rem",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#111827",
  };

  const labelStyle: React.CSSProperties = {
    color: "#374151",
    fontSize: "0.8rem",
    fontWeight: 500,
    display: "block",
    marginBottom: "0.4rem",
  };

  return (
    <div className="max-w-5xl mx-auto px-5 pt-24 pb-16">
      <SaveBanner show={saved} />

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Settings size={22} style={{ color: "#d97706" }} />
            <h1 style={{ color: "#14532d", fontWeight: 700, fontSize: "1.75rem" }}>Control Panel</h1>
          </div>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Manage site content, themes, and settings.</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border hover:bg-red-50 transition-colors"
          style={{ borderColor: "#fca5a5", color: "#991b1b" }}
        >
          <RotateCcw size={13} /> Reset to defaults
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-8 pb-5 border-b" style={{ borderColor: "#e5e7eb" }}>
        {tabConfig.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all"
            style={{
              backgroundColor: tab === t.key ? "#14532d" : "#f3f4f6",
              color: tab === t.key ? "#ffffff" : "#374151",
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={<FileText size={15} />} label="Published"   value={articles.length} sub="current issue" />
            <StatCard icon={<ThumbsUp size={15} />} label="Total Votes" value={totalVotes} sub="across all pieces" />
            <StatCard icon={<FileText size={15} />} label="Submissions" value={pendingCount} sub={`${approvedCount} approved`} />
            <StatCard icon={<Users size={15} />}    label="Writers"     value={leaderboard.length} sub="this issue" />
          </div>

          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
            <div className="px-5 py-3 border-b" style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}>
              <p style={{ color: "#374151", fontWeight: 600, fontSize: "0.875rem" }}>Top 5 by votes this issue</p>
            </div>
            <div className="divide-y bg-white">
              {[...articles]
                .sort((a, b) => (votes[b.id] ?? b.votes) - (votes[a.id] ?? a.votes))
                .slice(0, 5)
                .map((a, i) => (
                  <div key={a.id} className="flex items-center gap-4 px-5 py-3">
                    <span style={{ color: "#9ca3af", fontSize: "0.8rem", width: "1.2rem" }}>{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p style={{ color: "#14532d", fontSize: "0.85rem", fontWeight: 500 }} className="truncate">{a.title}</p>
                      <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{a.author}</p>
                    </div>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs"
                      style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
                    >
                      {a.category}
                    </span>
                    <span style={{ color: "#14532d", fontWeight: 600, fontSize: "0.875rem", minWidth: "2.5rem", textAlign: "right" }}>
                      {votes[a.id] ?? a.votes}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border p-5" style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}>
              <p style={{ color: "#6b7280", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                Active Theme
              </p>
              <p style={{ color: "#14532d", fontWeight: 700, fontSize: "1.2rem" }}>{config.themeName}</p>
              <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{config.themeMonth}</p>
            </div>
            <div className="rounded-xl border p-5" style={{ borderColor: "#e5e7eb", backgroundColor: "#ffffff" }}>
              <p style={{ color: "#6b7280", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
                Writer of the Month
              </p>
              <p style={{ color: "#14532d", fontWeight: 700, fontSize: "1.2rem" }}>{config.womName}</p>
              <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{config.womGrade}</p>
            </div>
          </div>
        </div>
      )}

      {/* Theme */}
      {tab === "theme" && (
        <div className="max-w-xl flex flex-col gap-5">
          <div className="rounded-xl p-4 border" style={{ backgroundColor: "#fefce8", borderColor: "#fde68a" }}>
            <p style={{ color: "#92400e", fontSize: "0.8rem" }}>
              Changes here update the theme banner on the Homepage and the Help Desk form.
            </p>
          </div>

          <div>
            <label style={labelStyle}>Theme Name</label>
            <input
              style={inputStyle}
              value={draft.themeName}
              onChange={(e) => setDraft((d) => ({ ...d, themeName: e.target.value }))}
              placeholder="e.g. Courage"
            />
          </div>

          <div>
            <label style={labelStyle}>Month Label</label>
            <input
              style={inputStyle}
              value={draft.themeMonth}
              onChange={(e) => setDraft((d) => ({ ...d, themeMonth: e.target.value }))}
              placeholder="e.g. June 2026"
            />
          </div>

          <div>
            <label style={labelStyle}>Theme Description</label>
            <textarea
              rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: "1.7" }}
              value={draft.themeDescription}
              onChange={(e) => setDraft((d) => ({ ...d, themeDescription: e.target.value }))}
              placeholder="Describe this month's theme..."
            />
          </div>

          <div className="rounded-xl border p-4" style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}>
            <p style={{ color: "#6b7280", fontSize: "0.75rem", marginBottom: "0.5rem" }}>Preview</p>
            <p style={{ color: "#92400e", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{draft.themeMonth} Theme</p>
            <p style={{ color: "#78350f", fontWeight: 700, fontSize: "1.2rem" }}>{draft.themeName || "—"}</p>
            <p style={{ color: "#92400e", fontSize: "0.8rem", lineHeight: "1.5", marginTop: "0.25rem" }}>{draft.themeDescription || "—"}</p>
          </div>

          <button
            onClick={handleSave}
            className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#14532d" }}
          >
            <Save size={15} /> Save Theme
          </button>
        </div>
      )}

      {/* Writer of the Month */}
      {tab === "wom" && (
        <div className="max-w-xl flex flex-col gap-5">
          <div>
            <label style={labelStyle}>Select Writer</label>
            <select
              style={{ ...inputStyle, color: "#111827" }}
              value={draft.womName}
              onChange={(e) => {
                const author = allAuthors.find((a) => a.name === e.target.value);
                if (author) setDraft((d) => ({ ...d, womName: author.name, womGrade: author.grade }));
              }}
            >
              {allAuthors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name} — {a.grade.split("—")[0].trim()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Grade</label>
            <input
              style={inputStyle}
              value={draft.womGrade}
              onChange={(e) => setDraft((d) => ({ ...d, womGrade: e.target.value }))}
              placeholder="e.g. Grade 11 — AS-B"
            />
          </div>

          <div>
            <label style={labelStyle}>Featured Article</label>
            <select
              style={{ ...inputStyle, color: "#111827" }}
              value={draft.womArticleId}
              onChange={(e) => setDraft((d) => ({ ...d, womArticleId: e.target.value }))}
            >
              {allArticles
                .filter((a) => a.author === draft.womName)
                .map((a) => (
                  <option key={a.id} value={a.id}>{a.title}</option>
                ))}
              {allArticles.filter((a) => a.author === draft.womName).length === 0 && (
                <option value="">No articles found for this author</option>
              )}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Bio</label>
            <textarea
              rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: "1.7" }}
              value={draft.womBio}
              onChange={(e) => setDraft((d) => ({ ...d, womBio: e.target.value }))}
              placeholder="Short bio shown on the homepage..."
            />
          </div>

          <div className="rounded-xl border p-4" style={{ backgroundColor: "#14532d" }}>
            <p style={{ color: "#86efac", fontSize: "0.7rem", marginBottom: "0.25rem" }}>Preview — Homepage Banner</p>
            <p style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>{draft.womName || "—"}</p>
            <p style={{ color: "#86efac", fontSize: "0.8rem" }}>{draft.womGrade}</p>
            <p style={{ color: "#bbf7d0", fontSize: "0.8rem", marginTop: "0.4rem", lineHeight: "1.5" }}>{draft.womBio || "—"}</p>
          </div>

          <button
            onClick={handleSave}
            className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#14532d" }}
          >
            <Save size={15} /> Save
          </button>
        </div>
      )}

      {/* Editor's Choice */}
      {tab === "choice" && (
        <div className="max-w-xl flex flex-col gap-5">
          <div>
            <label style={labelStyle}>Featured Article (Editor&apos;s Choice)</label>
            <select
              style={{ ...inputStyle, color: "#111827" }}
              value={draft.editorChoiceId}
              onChange={(e) => setDraft((d) => ({ ...d, editorChoiceId: e.target.value }))}
            >
              {articles.map((a) => (
                <option key={a.id} value={a.id}>{a.title} — {a.author}</option>
              ))}
            </select>
          </div>

          {(() => {
            const selected = articles.find((a) => a.id === draft.editorChoiceId);
            if (!selected) return null;
            return (
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#bbf7d0" }}>
                <div className="px-5 py-2 flex items-center gap-2" style={{ backgroundColor: "#dcfce7" }}>
                  <Star size={13} style={{ color: "#15803d" }} fill="#15803d" />
                  <span style={{ color: "#15803d", fontSize: "0.75rem", fontWeight: 500 }}>Preview — Editor&apos;s Choice</span>
                </div>
                <div className="p-5 bg-white">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs mb-2"
                    style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
                  >
                    {selected.category}
                  </span>
                  <p style={{ color: "#14532d", fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem" }}>{selected.title}</p>
                  <p style={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: "1.6" }}>{selected.excerpt}</p>
                  <p style={{ color: "#14532d", fontSize: "0.8rem", fontWeight: 500, marginTop: "0.75rem" }}>{selected.author}</p>
                  <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{selected.grade}</p>
                </div>
              </div>
            );
          })()}

          <button
            onClick={handleSave}
            className="self-start flex items-center gap-2 px-6 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#14532d" }}
          >
            <Save size={15} /> Save
          </button>
        </div>
      )}

      {/* Content */}
      {tab === "content" && (
        <div className="flex flex-col gap-3">
          <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            {articles.length} pieces published in the current issue
          </p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
            <div
              className="grid grid-cols-[1fr_auto_auto_auto] px-5 py-2.5 border-b"
              style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
            >
              {["Title / Author", "Category", "Votes", "Flags"].map((h) => (
                <span key={h} style={{ color: "#6b7280", fontSize: "0.75rem", fontWeight: 500 }}>{h}</span>
              ))}
            </div>
            <div className="divide-y bg-white">
              {articles.map((a) => (
                <div key={a.id} className="grid grid-cols-[1fr_auto_auto_auto] items-center px-5 py-3.5 gap-4">
                  <div className="min-w-0">
                    <p style={{ color: "#14532d", fontSize: "0.85rem", fontWeight: 500 }} className="truncate">{a.title}</p>
                    <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{a.author} · {a.grade.split("—")[0].trim()}</p>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs whitespace-nowrap"
                    style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
                  >
                    {a.category}
                  </span>
                  <span style={{ color: "#14532d", fontWeight: 600, fontSize: "0.875rem", minWidth: "2.5rem", textAlign: "right" }}>
                    {votes[a.id] ?? a.votes}
                  </span>
                  <div className="flex gap-1.5 justify-end">
                    {(a.isEditorChoice || config.editorChoiceId === a.id) ? (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                        style={{ backgroundColor: "#dcfce7", color: "#14532d", border: "1px solid #bbf7d0" }}
                      >
                        <Star size={10} fill="#15803d" style={{ color: "#15803d" }} /> EC
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
