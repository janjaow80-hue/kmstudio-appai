import React, { useState } from "react";
import {
  Code,
  Copy,
  Check,
  Eye,
  FileCode,
  Smartphone,
  Sparkles,
  Edit3,
  RotateCcw,
  Layers,
} from "lucide-react";
import { PreviewCanvas } from "./PreviewCanvas";
import { GeneratedUI } from "../types";

interface CodeViewerProps {
  currentUI: GeneratedUI;
  htmlContent: string;
  onUpdateHtml: (newHtml: string) => void;
  onCopyCode: (code: string, type: string) => void;
  copiedType: string | null;
}

type TabType = "preview" | "html" | "react" | "diagnostics";

export const CodeViewer: React.FC<CodeViewerProps> = ({
  currentUI,
  htmlContent,
  onUpdateHtml,
  onCopyCode,
  copiedType,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("preview");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedHtml, setEditedHtml] = useState<string>(htmlContent);

  // Sync editedHtml when htmlContent changes from generation or preset load
  React.useEffect(() => {
    setEditedHtml(htmlContent);
  }, [htmlContent]);

  const handleApplyEdits = () => {
    onUpdateHtml(editedHtml);
    setIsEditing(false);
  };

  const handleResetEdits = () => {
    setEditedHtml(htmlContent);
    setIsEditing(false);
  };

  // Diagnostic helper to extract responsive utility classes from HTML
  const extractResponsiveClasses = (html: string) => {
    const smMatches = html.match(/\bsm:[a-zA-Z0-9_\-\[\]]+/g) || [];
    const mdMatches = html.match(/\bmd:[a-zA-Z0-9_\-\[\]]+/g) || [];
    const lgMatches = html.match(/\blg:[a-zA-Z0-9_\-\[\]]+/g) || [];
    const xlMatches = html.match(/\bxl:[a-zA-Z0-9_\-\[\]]+/g) || [];

    const unique = (arr: string[]) => Array.from(new Set(arr));
    return {
      sm: unique(smMatches),
      md: unique(mdMatches),
      lg: unique(lgMatches),
      xl: unique(xlMatches),
    };
  };

  const responsiveClasses = extractResponsiveClasses(htmlContent);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-61px)] overflow-hidden bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-slate-200 bg-white px-4 sm:px-6 pt-2 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "preview"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Responsive Preview</span>
          </button>

          <button
            onClick={() => setActiveTab("html")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "html"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>HTML & Tailwind</span>
          </button>

          <button
            onClick={() => setActiveTab("react")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "react"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>React JSX / TSX</span>
          </button>

          <button
            onClick={() => setActiveTab("diagnostics")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "diagnostics"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Responsive Breakdown</span>
          </button>
        </div>

        {/* Tab Right Actions */}
        <div className="flex items-center gap-2 py-1.5">
          {activeTab === "html" && (
            <>
              {isEditing ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleResetEdits}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyEdits}
                    className="px-3 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply to Preview</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-2.5 py-1 text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Edit Markup</span>
                </button>
              )}
            </>
          )}

          {(activeTab === "html" || activeTab === "react") && (
            <button
              onClick={() =>
                onCopyCode(activeTab === "html" ? htmlContent : currentUI.reactCode, activeTab.toUpperCase())
              }
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              {copiedType === activeTab.toUpperCase() ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-hidden relative">
        {/* Preview Panel */}
        {activeTab === "preview" && (
          <PreviewCanvas htmlContent={htmlContent} title={currentUI.title} />
        )}

        {/* HTML / Tailwind Code Panel */}
        {activeTab === "html" && (
          <div className="h-full flex flex-col bg-slate-950 text-slate-100 font-mono text-xs overflow-hidden">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>component.html (Tailwind CSS Ready)</span>
              </span>
              <span className="text-[11px] text-slate-500">
                {isEditing ? "Editing Mode Active" : "Click 'Edit Markup' to tweak code"}
              </span>
            </div>
            {isEditing ? (
              <textarea
                value={editedHtml}
                onChange={(e) => setEditedHtml(e.target.value)}
                className="flex-1 w-full p-4 bg-slate-950 text-emerald-300 focus:outline-none font-mono text-xs leading-relaxed resize-none selection:bg-indigo-600"
                spellCheck={false}
              />
            ) : (
              <pre className="flex-1 p-4 overflow-auto text-slate-300 leading-relaxed selection:bg-indigo-600 selection:text-white">
                <code>{htmlContent}</code>
              </pre>
            )}
          </div>
        )}

        {/* React JSX Panel */}
        {activeTab === "react" && (
          <div className="h-full flex flex-col bg-slate-950 text-slate-100 font-mono text-xs overflow-hidden">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Component.tsx (React + Tailwind + Lucide)</span>
              </span>
              <span className="text-[11px] text-slate-500">Ready to drop into Vite or Next.js</span>
            </div>
            <pre className="flex-1 p-4 overflow-auto text-slate-300 leading-relaxed selection:bg-indigo-600 selection:text-white">
              <code>{currentUI.reactCode}</code>
            </pre>
          </div>
        )}

        {/* Diagnostics & Responsive Breakdown */}
        {activeTab === "diagnostics" && (
          <div className="h-full overflow-y-auto p-6 bg-slate-50 space-y-6 font-sans">
            {/* Component Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Architecture & Layout Insights</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{currentUI.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{currentUI.summary}</p>

              {currentUI.tags && currentUI.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {currentUI.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* AI Responsive Strategy Highlights */}
            {currentUI.responsiveHighlights && currentUI.responsiveHighlights.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Responsive Strategy
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {currentUI.responsiveHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extracted Breakpoint Utilities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                Tailwind Breakpoint Utility Usage
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* sm: */}
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-amber-900 font-mono">sm: (640px+)</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {responsiveClasses.sm.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                    {responsiveClasses.sm.length > 0 ? (
                      responsiveClasses.sm.map((cls, i) => (
                        <span key={i} className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200 text-amber-900">
                          {cls}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-amber-700/60 italic">None used</span>
                    )}
                  </div>
                </div>

                {/* md: */}
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-blue-900 font-mono">md: (768px+)</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                      {responsiveClasses.md.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                    {responsiveClasses.md.length > 0 ? (
                      responsiveClasses.md.map((cls, i) => (
                        <span key={i} className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-900">
                          {cls}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-blue-700/60 italic">None used</span>
                    )}
                  </div>
                </div>

                {/* lg: */}
                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-indigo-900 font-mono">lg: (1024px+)</span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                      {responsiveClasses.lg.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                    {responsiveClasses.lg.length > 0 ? (
                      responsiveClasses.lg.map((cls, i) => (
                        <span key={i} className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-indigo-200 text-indigo-900">
                          {cls}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-indigo-700/60 italic">None used</span>
                    )}
                  </div>
                </div>

                {/* xl: */}
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-900 font-mono">xl: (1280px+)</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      {responsiveClasses.xl.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                    {responsiveClasses.xl.length > 0 ? (
                      responsiveClasses.xl.map((cls, i) => (
                        <span key={i} className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900">
                          {cls}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-700/60 italic">None used</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
