/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PromptControlPanel } from "./components/PromptControlPanel";
import { CodeViewer } from "./components/CodeViewer";
import { PresetGalleryModal } from "./components/PresetGalleryModal";
import { PROMPT_PRESETS } from "./data/presets";
import { GeneratedUI, StyleArchetype, ComponentCategory, PromptPreset } from "./types";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

export default function App() {
  // Initialize with the first rich preset
  const initialPreset = PROMPT_PRESETS[0];
  const initialUI: GeneratedUI = {
    id: "init-1",
    title: initialPreset.defaultData?.title || initialPreset.title,
    summary: initialPreset.defaultData?.summary || initialPreset.description,
    html: initialPreset.defaultData?.html || "<div>No HTML</div>",
    reactCode: initialPreset.defaultData?.reactCode || "// React Code",
    responsiveHighlights: initialPreset.defaultData?.responsiveHighlights || [],
    suggestedRefinements: initialPreset.defaultData?.suggestedRefinements || [],
    tags: initialPreset.defaultData?.tags || ["Responsive", "Tailwind"],
    prompt: initialPreset.prompt,
    styleArchetype: initialPreset.styleArchetype,
    category: initialPreset.category,
    timestamp: Date.now(),
  };

  const [currentUI, setCurrentUI] = useState<GeneratedUI>(initialUI);
  const [htmlContent, setHtmlContent] = useState<string>(initialUI.html);
  const [prompt, setPrompt] = useState<string>(initialPreset.prompt);
  const [styleArchetype, setStyleArchetype] = useState<StyleArchetype>("modern");
  const [category, setCategory] = useState<ComponentCategory>("pricing");
  const [includeInteractivity, setIncludeInteractivity] = useState<boolean>(true);

  // Refinement state
  const [refinementPrompt, setRefinementPrompt] = useState<string>("");
  const [isRefining, setIsRefining] = useState<boolean>(false);

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [history, setHistory] = useState<GeneratedUI[]>([initialUI]);

  // UI Modals & Feedback
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  // Check health on mount
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(Boolean(data.hasApiKey));
      })
      .catch((err) => console.error("Health check error:", err));
  }, []);

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(type);
    showToast(`${type} code copied to clipboard!`);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/generate-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          styleArchetype,
          componentType: category,
          deviceTarget: "all",
          includeInteractivity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate layout");
      }

      const newUI: GeneratedUI = {
        id: `gen-${Date.now()}`,
        title: data.title,
        summary: data.summary,
        html: data.html,
        reactCode: data.reactCode,
        responsiveHighlights: data.responsiveHighlights || [],
        suggestedRefinements: data.suggestedRefinements || [],
        tags: data.tags || [category, styleArchetype],
        prompt,
        styleArchetype,
        category,
        timestamp: Date.now(),
      };

      setCurrentUI(newUI);
      setHtmlContent(newUI.html);
      setHistory((prev) => [newUI, ...prev]);
      showToast("UI Component generated successfully!");
    } catch (err: any) {
      console.error("Generation error:", err);
      setErrorMessage(err.message || "Failed to connect to Gemini API. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async () => {
    if (!refinementPrompt.trim() || isRefining || !currentUI) return;

    setIsRefining(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/refine-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentHtml: htmlContent,
          refinementPrompt,
          title: currentUI.title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to refine layout");
      }

      const updatedUI: GeneratedUI = {
        ...currentUI,
        id: `refine-${Date.now()}`,
        title: data.title || currentUI.title,
        summary: data.summary || currentUI.summary,
        html: data.html,
        reactCode: data.reactCode || currentUI.reactCode,
        responsiveHighlights: data.responsiveHighlights || currentUI.responsiveHighlights,
        suggestedRefinements: data.suggestedRefinements || currentUI.suggestedRefinements,
        timestamp: Date.now(),
      };

      setCurrentUI(updatedUI);
      setHtmlContent(updatedUI.html);
      setHistory((prev) => [updatedUI, ...prev]);
      setRefinementPrompt("");
      showToast("Changes applied with Gemini!");
    } catch (err: any) {
      console.error("Refinement error:", err);
      setErrorMessage(err.message || "Failed to refine component.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleSelectPreset = (preset: PromptPreset) => {
    setPrompt(preset.prompt);
    setStyleArchetype(preset.styleArchetype);
    setCategory(preset.category);

    if (preset.defaultData) {
      const presetUI: GeneratedUI = {
        id: `preset-${preset.id}-${Date.now()}`,
        title: preset.defaultData.title || preset.title,
        summary: preset.defaultData.summary || preset.description,
        html: preset.defaultData.html || "<div>No HTML</div>",
        reactCode: preset.defaultData.reactCode || "// React Code",
        responsiveHighlights: preset.defaultData.responsiveHighlights || [],
        suggestedRefinements: preset.defaultData.suggestedRefinements || [],
        tags: preset.defaultData.tags || [preset.category, preset.styleArchetype],
        prompt: preset.prompt,
        styleArchetype: preset.styleArchetype,
        category: preset.category,
        timestamp: Date.now(),
      };
      setCurrentUI(presetUI);
      setHtmlContent(presetUI.html);
      setHistory((prev) => [presetUI, ...prev]);
      showToast(`Loaded ${preset.title}`);
    }
  };

  const handleSelectHistoryItem = (item: GeneratedUI) => {
    setCurrentUI(item);
    setHtmlContent(item.html);
    setPrompt(item.prompt);
    setStyleArchetype(item.styleArchetype);
    setCategory(item.category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900 antialiased selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation Header */}
      <Header
        title={currentUI.title}
        htmlContent={htmlContent}
        hasApiKey={hasApiKey}
        onOpenPresets={() => setIsPresetsOpen(true)}
        onCopyCode={handleCopyCode}
        copiedType={copiedType}
      />

      {/* Error Banner */}
      {errorMessage && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 flex items-center justify-between text-xs text-rose-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-600 hover:text-rose-900 font-bold p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Workspace: Left Control Panel + Right Code/Preview Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <PromptControlPanel
          prompt={prompt}
          setPrompt={setPrompt}
          styleArchetype={styleArchetype}
          setStyleArchetype={setStyleArchetype}
          category={category}
          setCategory={setCategory}
          includeInteractivity={includeInteractivity}
          setIncludeInteractivity={setIncludeInteractivity}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          currentUI={currentUI}
          refinementPrompt={refinementPrompt}
          setRefinementPrompt={setRefinementPrompt}
          isRefining={isRefining}
          onRefine={handleRefine}
          history={history}
          onSelectHistoryItem={handleSelectHistoryItem}
        />

        <CodeViewer
          currentUI={currentUI}
          htmlContent={htmlContent}
          onUpdateHtml={(newHtml) => {
            setHtmlContent(newHtml);
            showToast("Preview updated with edited markup");
          }}
          onCopyCode={handleCopyCode}
          copiedType={copiedType}
        />
      </div>

      {/* Preset Gallery Modal */}
      <PresetGalleryModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
