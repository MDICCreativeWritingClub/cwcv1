"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { articles, writerOfMonth as defaultWOM, currentTheme as defaultTheme } from "@/data/articles";

interface SiteConfig {
  themeName: string;
  themeDescription: string;
  themeMonth: string;
  womName: string;
  womGrade: string;
  womBio: string;
  womArticleId: string;
  editorChoiceId: string;
}

const defaults: SiteConfig = {
  themeName: defaultTheme.name,
  themeDescription: defaultTheme.description,
  themeMonth: defaultTheme.month,
  womName: defaultWOM.name,
  womGrade: defaultWOM.grade,
  womBio: defaultWOM.bio,
  womArticleId: defaultWOM.featuredArticleId,
  editorChoiceId: articles.find((a) => a.isEditorChoice)?.id ?? "1",
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (partial: Partial<SiteConfig>) => void;
  resetConfig: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window === "undefined") return defaults;
    const stored = localStorage.getItem("cwc_site_config");
    if (stored) {
      try {
        return { ...defaults, ...JSON.parse(stored) };
      } catch {
        return defaults;
      }
    }
    return defaults;
  });

  useEffect(() => {
    localStorage.setItem("cwc_site_config", JSON.stringify(config));
  }, [config]);

  function updateConfig(partial: Partial<SiteConfig>) {
    setConfig((prev) => ({ ...prev, ...partial }));
  }

  function resetConfig() {
    setConfig(defaults);
    localStorage.removeItem("cwc_site_config");
  }

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) throw new Error("useSiteConfig must be used inside SiteConfigProvider");
  return ctx;
}
