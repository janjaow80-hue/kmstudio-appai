import React from "react";
import { X, ArrowRight, Sparkles, Layout } from "lucide-react";
import { PROMPT_PRESETS } from "../data/presets";
import { PromptPreset } from "../types";

interface PresetGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PromptPreset) => void;
}

export const PresetGalleryModal: React.FC<PresetGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Curated Responsive Layouts</h3>
              <p className="text-xs text-slate-500">Pick an archetype to test, preview, or iterate with Gemini</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMPT_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="group p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    {preset.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium capitalize">
                    {preset.styleArchetype} style
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {preset.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{preset.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>Load into Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
