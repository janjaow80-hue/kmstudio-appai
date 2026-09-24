import React, { useState } from "react";
import {
  Wand2,
  Send,
  History,
  Sparkles,
  RefreshCw,
  Sliders,
  CheckCircle2,
  ChevronDown,
  Palette,
  LayoutGrid,
  Zap,
} from "lucide-react";
import { StyleArchetype, ComponentCategory, GeneratedUI } from "../types";

interface PromptControlPanelProps {
  prompt: string;
  setPrompt: (p: string) => void;
  styleArchetype: StyleArchetype;
  setStyleArchetype: (s: StyleArchetype) => void;
  category: ComponentCategory;
  setCategory: (c: ComponentCategory) => void;
  includeInteractivity: boolean;
  setIncludeInteractivity: (v: boolean) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  // Refinement props
  currentUI: GeneratedUI | null;
  refinementPrompt: string;
  setRefinementPrompt: (r: string) => void;
  isRefining: boolean;
  onRefine: () => void;
  // History
  history: GeneratedUI[];
  onSelectHistoryItem: (item: GeneratedUI) => void;
}

const STYLE_OPTIONS: { id: StyleArchetype; label: string; desc: string }[] = [
  { id: "modern", label: "Modern Clean", desc: "Balanced slate & indigo, subtle borders" },
  { id: "minimal", label: "Minimal Enterprise", desc: "High contrast, monospaced details, zinc" },
  { id: "dark", label: "Dark Luxury", desc: "Onyx blacks, emerald accents, deep shadows" },
  { id: "vibrant", label: "Vibrant SaaS", desc: "Energetic gradients, violet accents, badges" },
  { id: "neobrutalist", label: "Neo-Brutalist", desc: "High contrast black borders, bold punchy colors" },
  { id: "glassmorphic", label: "Glassmorphic", desc: "Backdrop blur, frosted panels, subtle glows" },
];

const CATEGORY_OPTIONS: { id: ComponentCategory; label: string }[] = [
  { id: "layout", label: "Full Page" },
  { id: "hero", label: "Hero Section" },
  { id: "pricing", label: "Pricing Table" },
  { id: "features", label: "Feature / Bento" },
  { id: "dashboard", label: "Dashboard / KPI" },
  { id: "card", label: "Product / Card" },
  { id: "form", label: "Auth / Form" },
  { id: "navbar", label: "Navigation" },
];

const QUICK_INSPIRATION = [
  "Split-screen SaaS sign-up form with social OAuth buttons and testimonial side panel",
  "Feature comparison table with sticky header and tooltip explanations",
  "Modern e-commerce checkout step with order summary card & promo code input",
  "User settings profile page with notification toggles and avatar upload preview",
  "Job board listing card with salary tags, remote pills, and quick apply button",
];

export const PromptControlPanel: React.FC<PromptControlPanelProps> = ({
  prompt,
  setPrompt,
  styleArchetype,
  setStyleArchetype,
  category,
  setCategory,
  includeInteractivity,
  setIncludeInteractivity,
  isGenerating,
  onGenerate,
  currentUI,
  refinementPrompt,
  setRefinementPrompt,
  isRefining,
  onRefine,
  history,
  onSelectHistoryItem,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isGenerating && prompt.trim()) {
        onGenerate();
      }
    }
  };

  const handleRefineKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isRefining && refinementPrompt.trim()) {
      e.preventDefault();
      onRefine();
    }
  };

  return (
    <div className="w-full lg:w-[420px] shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col h-auto lg:h-[calc(100vh-61px)] overflow-y-auto p-4 sm:p-5 space-y-6">
      {/* Prompt Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Prompt Interface</span>
          </label>
          <span className="text-[11px] text-slate-400 font-medium">⌘ + Enter to run</span>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder="Describe the responsive layout or UI component you want to generate (e.g. 'Modern pricing table with 3 tiers and monthly/annual switcher')..."
            className="w-full p-3 text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
          />
        </div>

        {/* Quick Prompts Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Quick Suggestions:</span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_INSPIRATION.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(item)}
                className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border border-slate-200 transition-colors line-clamp-1"
                title={item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Component Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
          <span>Component Type</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-all ${
                category === cat.id
                  ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Style Archetype */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            <span>Style Archetype</span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {STYLE_OPTIONS.map((style) => (
            <button
              key={style.id}
              onClick={() => setStyleArchetype(style.id)}
              className={`p-2.5 text-left rounded-xl border transition-all ${
                styleArchetype === style.id
                  ? "bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-600 shadow-sm"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              <p className={`text-xs font-bold ${styleArchetype === style.id ? "text-indigo-700" : "text-slate-800"}`}>
                {style.label}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{style.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Interactivity Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <div>
            <span className="text-xs font-bold text-slate-800 block">Interactive Behaviors</span>
            <span className="text-[11px] text-slate-500 block">Tabs, toggles, state hooks & scripts</span>
          </div>
        </div>
        <input
          type="checkbox"
          checked={includeInteractivity}
          onChange={(e) => setIncludeInteractivity(e.target.checked)}
          className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
        />
      </div>

      {/* Primary Generate Action */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-indigo-100 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Architecting Layout with Gemini...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate UI Component</span>
          </>
        )}
      </button>

      {/* Refine & Iterate Section (Active when component is loaded) */}
      {currentUI && (
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Refine with Gemini</span>
            </label>
            <span className="text-[10px] text-slate-400">Iterate on active layout</span>
          </div>

          <div className="flex gap-1.5">
            <input
              type="text"
              value={refinementPrompt}
              onChange={(e) => setRefinementPrompt(e.target.value)}
              onKeyDown={handleRefineKeyDown}
              placeholder="e.g. 'Add dark mode theme', 'Make it 2 columns on tablet'..."
              className="flex-1 px-3 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
            <button
              onClick={onRefine}
              disabled={isRefining || !refinementPrompt.trim()}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              {isRefining ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Suggested Refinements from AI */}
          {currentUI.suggestedRefinements && currentUI.suggestedRefinements.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggested Tweaks:</span>
              <div className="flex flex-col gap-1">
                {currentUI.suggestedRefinements.map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setRefinementPrompt(sugg);
                    }}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-900 border border-indigo-100 transition-colors flex items-center gap-2"
                  >
                    <span className="text-indigo-400">↳</span>
                    <span className="line-clamp-1">{sugg}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Session History */}
      {history.length > 1 && (
        <div className="pt-4 border-t border-slate-200 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <History className="w-3.5 h-3.5" />
            <span>Generation History ({history.length})</span>
          </div>
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectHistoryItem(item)}
                className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  currentUI?.id === item.id
                    ? "bg-indigo-50 text-indigo-900 font-bold border border-indigo-200"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                <span className="truncate flex-1">{item.title}</span>
                <span className="text-[10px] text-slate-400 ml-2 uppercase">{item.category}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
