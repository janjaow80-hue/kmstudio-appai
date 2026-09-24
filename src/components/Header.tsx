import React from "react";
import { Sparkles, Download, Copy, Check, Eye, Code, Layers, ExternalLink } from "lucide-react";
import { downloadHtmlFile } from "../utils/exportHelper";

interface HeaderProps {
  title: string;
  htmlContent: string;
  hasApiKey: boolean;
  onOpenPresets: () => void;
  onCopyCode: (code: string, type: string) => void;
  copiedType: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  htmlContent,
  hasApiKey,
  onOpenPresets,
  onCopyCode,
  copiedType,
}) => {
  const handleDownload = () => {
    downloadHtmlFile(htmlContent, "gemini-code-1788988029267.html");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 ring-2 ring-indigo-50">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Gemini UI Layout Studio</h1>
              <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                gemini-3.8-flash
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Responsive web layouts & UI component generation from natural language
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          {/* Preset templates button */}
          <button
            onClick={onOpenPresets}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            title="Browse pre-built responsive templates"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Templates</span>
          </button>

          {/* Quick Copy HTML */}
          <button
            onClick={() => onCopyCode(htmlContent, "HTML")}
            disabled={!htmlContent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50"
            title="Copy standalone HTML"
          >
            {copiedType === "HTML" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy HTML</span>
              </>
            )}
          </button>

          {/* Download standalone bundle file */}
          <button
            onClick={handleDownload}
            disabled={!htmlContent}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all hover:shadow disabled:opacity-50"
            title="Export full self-contained file with Tailwind CDN"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export gemini-code.html</span>
          </button>
        </div>
      </div>
    </header>
  );
};
