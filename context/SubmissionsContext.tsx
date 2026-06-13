"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Submission {
  id: string;
  name: string;
  studentCode: string;
  grade: string;
  category: string;
  theme: string;
  title: string;
  content: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

const SEED: Submission[] = [
  {
    id: "seed-1",
    name: "Imran Hossain",
    studentCode: "MIS-2024-0342",
    grade: "Grade 10 — AS-B",
    category: "Fiction / Short Stories",
    theme: "Courage",
    title: "The Boy Who Climbed Back",
    content:
      "He had fallen before. Everyone knew it — the whole class had watched him stumble at the debate final, go blank at the microphone, walk off stage with burning cheeks. But he came back the next year, stood at the same microphone, and spoke anyway.",
    submittedAt: "2026-06-10T09:15:00Z",
    status: "pending",
  },
  {
    id: "seed-2",
    name: "Tasnia Binte Karim",
    studentCode: "MIS-2024-0198",
    grade: "Grade 11 — AS-A",
    category: "Articles",
    theme: "Courage",
    title: "What We Don't Say Aloud",
    content:
      "There is a particular kind of courage that has no audience — the kind practiced in small decisions, in quiet rooms, when no one is watching. It is the courage to be honest with yourself. This is harder, I think, than any public act of bravery.",
    submittedAt: "2026-06-10T11:42:00Z",
    status: "pending",
  },
  {
    id: "seed-3",
    name: "Rifat Mahmud",
    studentCode: "MIS-2025-0087",
    grade: "Grade 9 — AS-D",
    category: "Blogs",
    theme: "Open Theme",
    title: "Why I Started Drawing Again",
    content:
      "I stopped drawing when I was twelve because someone told me I wasn't good at it. I started again last month. I am still not particularly good at it. But I am doing it, and that feels like enough.",
    submittedAt: "2026-06-11T07:30:00Z",
    status: "pending",
  },
  {
    id: "seed-4",
    name: "Anika Siddiqui",
    studentCode: "MIS-2023-0511",
    grade: "Grade 12 — AS-C",
    category: "Argumentative / Descriptive Essays",
    theme: "Courage",
    title: "On Saying No",
    content:
      "We teach children to be agreeable. We reward compliance and call it manners. But there is a skill we rarely teach, and it may be the most important one: the ability to say no, clearly and without apology, when no is the honest answer.",
    submittedAt: "2026-06-11T08:05:00Z",
    status: "pending",
  },
];

interface SubmissionsContextType {
  submissions: Submission[];
  addSubmission: (sub: Omit<Submission, "id" | "submittedAt" | "status">) => void;
  updateStatus: (id: string, status: "approved" | "rejected") => void;
}

const SubmissionsContext = createContext<SubmissionsContextType | null>(null);

export function SubmissionsProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    if (typeof window === "undefined") return SEED;
    const stored = localStorage.getItem("cwc_submissions");
    if (stored) return JSON.parse(stored);
    return SEED;
  });

  useEffect(() => {
    localStorage.setItem("cwc_submissions", JSON.stringify(submissions));
  }, [submissions]);

  function addSubmission(sub: Omit<Submission, "id" | "submittedAt" | "status">) {
    const newSub: Submission = {
      ...sub,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };
    setSubmissions((prev) => [newSub, ...prev]);
  }

  function updateStatus(id: string, status: "approved" | "rejected") {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  }

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission, updateStatus }}>
      {children}
    </SubmissionsContext.Provider>
  );
}

export function useSubmissions() {
  const ctx = useContext(SubmissionsContext);
  if (!ctx) throw new Error("useSubmissions must be used inside SubmissionsProvider");
  return ctx;
}
