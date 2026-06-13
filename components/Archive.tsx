"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy, Crown, Users, BookOpen, Archive as ArchiveIcon, GraduationCap,
} from "lucide-react";
import {
  pastAwardees, pastStaff, articles, archiveArticles, type StaffMember,
} from "@/data/articles";

type ArchiveTab = "awardees" | "team" | "submissions";

const allPublished = [...articles, ...archiveArticles].sort((a, b) => {
  const monthOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const [aM, aY] = a.month.split(" ");
  const [bM, bY] = b.month.split(" ");
  if (aY !== bY) return Number(bY) - Number(aY);
  return monthOrder.indexOf(bM) - monthOrder.indexOf(aM);
});

const groupedByYear = pastAwardees.reduce<Record<number, typeof pastAwardees>>((acc, a) => {
  if (!acc[a.year]) acc[a.year] = [];
  acc[a.year].push(a);
  return acc;
}, {});

const sortedYears = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);

function AwardeeRow({ awardee, isFirst }: { awardee: (typeof pastAwardees)[0]; isFirst: boolean }) {
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl border"
      style={{
        backgroundColor: isFirst ? "#f0fdf4" : "#ffffff",
        borderColor: isFirst ? "#bbf7d0" : "#e5e7eb",
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: isFirst ? "#dcfce7" : "#f3f4f6", border: isFirst ? "2px solid #4ade80" : "none" }}
      >
        {isFirst ? <Crown size={18} style={{ color: "#16a34a" }} /> : <Trophy size={16} style={{ color: "#9ca3af" }} />}
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ color: "#14532d", fontWeight: 600, fontSize: "0.9rem" }}>{awardee.name}</p>
        <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>{awardee.grade}</p>
        <p style={{ color: "#374151", fontSize: "0.8rem", marginTop: "0.15rem", fontStyle: "italic" }}>
          &quot;{awardee.title}&quot;
        </p>
      </div>
      <div className="text-right shrink-0">
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs mb-1"
          style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
        >
          {awardee.category}
        </span>
        <p style={{ color: "#9ca3af", fontSize: "0.7rem" }}>{awardee.month} {awardee.year}</p>
        <p style={{ color: "#16a34a", fontSize: "0.8rem", fontWeight: 600 }}>{awardee.votes} votes</p>
      </div>
    </div>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl border"
      style={{
        backgroundColor: member.type === "teacher" ? "#f0fdf4" : "#ffffff",
        borderColor: member.type === "teacher" ? "#bbf7d0" : "#e5e7eb",
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white"
        style={{ backgroundColor: member.type === "teacher" ? "#14532d" : "#6b7280" }}
      >
        {member.type === "teacher" ? <GraduationCap size={18} /> : member.name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ color: "#14532d", fontWeight: 600, fontSize: "0.9rem" }}>{member.name}</p>
        <p style={{ color: "#16a34a", fontSize: "0.8rem" }}>{member.role}</p>
        {member.grade && (
          <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>{member.grade}</p>
        )}
      </div>
      <span style={{ color: "#9ca3af", fontSize: "0.75rem", whiteSpace: "nowrap" }}>{member.period}</span>
    </div>
  );
}

export function Archive() {
  const [tab, setTab] = useState<ArchiveTab>("awardees");

  const teachers = pastStaff.filter((s) => s.type === "teacher");
  const students = pastStaff.filter((s) => s.type === "student");

  const tabConfig: { key: ArchiveTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: "awardees",    label: "Writer of the Month", icon: <Trophy size={14} />,    count: pastAwardees.length },
    { key: "team",        label: "Our Team",             icon: <Users size={14} />,     count: pastStaff.length },
    { key: "submissions", label: "All Submissions",      icon: <BookOpen size={14} />,  count: allPublished.length },
  ];

  return (
    <div className="max-w-4xl mx-auto px-5 pt-24 pb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ArchiveIcon size={22} style={{ color: "#16a34a" }} />
          <h1 style={{ color: "#14532d", fontWeight: 700, fontSize: "1.75rem" }}>The Archive</h1>
        </div>
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
          A record of everyone who has written for, worked on, and been honoured by Manarat CWC.
        </p>
      </div>

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
            {t.count !== undefined && (
              <span
                className="rounded-full px-1.5 py-0.5 text-xs"
                style={{
                  backgroundColor: tab === t.key ? "#166534" : "#e5e7eb",
                  color: tab === t.key ? "#bbf7d0" : "#6b7280",
                }}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "awardees" && (
        <div className="flex flex-col gap-8">
          {sortedYears.map((year) => (
            <div key={year}>
              <div className="flex items-center gap-3 mb-4">
                <h2 style={{ color: "#14532d", fontWeight: 700, fontSize: "1.1rem" }}>{year}</h2>
                <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
              </div>
              <div className="flex flex-col gap-3">
                {groupedByYear[year].map((awardee, i) => (
                  <AwardeeRow
                    key={`${awardee.month}-${awardee.year}`}
                    awardee={awardee}
                    isFirst={i === 0 && year === sortedYears[0]}
                  />
                ))}
              </div>
            </div>
          ))}
          <div
            className="text-center py-6 rounded-xl border"
            style={{ borderColor: "#e5e7eb", backgroundColor: "#fafafa" }}
          >
            <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>
              Records from June 2025 onward. Earlier editions were published in print.
            </p>
          </div>
        </div>
      )}

      {tab === "team" && (
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={16} style={{ color: "#16a34a" }} />
              <h2 style={{ color: "#14532d", fontWeight: 600, fontSize: "1rem" }}>Faculty &amp; Moderators</h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
            </div>
            <div className="flex flex-col gap-3">
              {teachers.map((m) => <StaffCard key={m.name + m.period} member={m} />)}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users size={16} style={{ color: "#16a34a" }} />
              <h2 style={{ color: "#14532d", fontWeight: 600, fontSize: "1rem" }}>Student Editors</h2>
              <div className="flex-1 h-px" style={{ backgroundColor: "#e5e7eb" }} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {students.map((m) => <StaffCard key={m.name + m.period} member={m} />)}
            </div>
          </div>
        </div>
      )}

      {tab === "submissions" && (
        <div className="flex flex-col gap-3">
          <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
            {allPublished.length} published pieces — current issue and archive
          </p>
          {allPublished.map((article) => (
            <Link
              key={article.id}
              href={article.id.startsWith("arch-") ? "#" : `/article/${article.id}`}
              className="flex items-start gap-4 p-4 rounded-xl border hover:shadow-sm transition-shadow"
              style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}
              onClick={article.id.startsWith("arch-") ? (e) => e.preventDefault() : undefined}
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{ backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
                  >
                    {article.category}
                  </span>
                  <span style={{ color: "#9ca3af", fontSize: "0.7rem" }}>{article.month}</span>
                </div>
                <p style={{ color: "#14532d", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                  {article.title}
                </p>
                <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                  {article.author} · {article.grade.split("—")[0].trim()}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p style={{ color: "#16a34a", fontWeight: 600, fontSize: "0.85rem" }}>{article.votes}</p>
                <p style={{ color: "#9ca3af", fontSize: "0.7rem" }}>votes</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
