export type StyleArchetype =
  | "modern"
  | "minimal"
  | "dark"
  | "vibrant"
  | "neobrutalist"
  | "glassmorphic";

export type ComponentCategory =
  | "layout"
  | "hero"
  | "pricing"
  | "features"
  | "dashboard"
  | "card"
  | "form"
  | "navbar";

export type DeviceMode = "desktop" | "tablet" | "mobile" | "custom";

export interface GeneratedUI {
  id: string;
  title: string;
  summary: string;
  html: string;
  reactCode: string;
  responsiveHighlights: string[];
  suggestedRefinements: string[];
  tags: string[];
  prompt: string;
  styleArchetype: StyleArchetype;
  category: ComponentCategory;
  timestamp: number;
}

export interface PromptPreset {
  id: string;
  title: string;
  category: ComponentCategory;
  styleArchetype: StyleArchetype;
  prompt: string;
  description: string;
  previewSnippet?: string;
  defaultData?: Partial<GeneratedUI>;
}
