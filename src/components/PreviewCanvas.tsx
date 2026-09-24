import React, { useState, useRef, useEffect } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  RefreshCw,
  ExternalLink,
  Sliders,
  Sun,
  Moon,
  Grid,
} from "lucide-react";
import { DeviceMode } from "../types";
import { generateStandaloneHtml } from "../utils/exportHelper";

interface PreviewCanvasProps {
  htmlContent: string;
  title: string;
}

type CanvasBg = "light" | "white" | "dark" | "checkerboard";

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ htmlContent, title }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [canvasBg, setCanvasBg] = useState<CanvasBg>("light");
  const [key, setKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getActiveWidth = (): string => {
    switch (deviceMode) {
      case "desktop":
        return "100%";
      case "tablet":
        return "768px";
      case "mobile":
        return "375px";
      case "custom":
        return `${customWidth}px`;
    }
  };

  const getBreakpointLabel = (widthPx: number): { label: string; color: string } => {
    if (widthPx < 640) return { label: "mobile (<640px)", color: "bg-rose-50 text-rose-700 border-rose-200" };
    if (widthPx < 768) return { label: "sm: (640px+)", color: "bg-amber-50 text-amber-700 border-amber-200" };
    if (widthPx < 1024) return { label: "md: (768px+)", color: "bg-blue-50 text-blue-700 border-blue-200" };
    if (widthPx < 1280) return { label: "lg: (1024px+)", color: "bg-indigo-50 text-indigo-700 border-indigo-200" };
    return { label: "xl: (1280px+)", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  };

  const currentPx = deviceMode === "desktop" ? 1280 : deviceMode === "tablet" ? 768 : deviceMode === "mobile" ? 375 : customWidth;
  const breakpoint = getBreakpointLabel(currentPx);

  const handleOpenExternal = () => {
    const fullHtml = generateStandaloneHtml(htmlContent, title);
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const iframeSrcDoc = generateStandaloneHtml(htmlContent, title);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden">
      {/* Canvas Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === "desktop"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Desktop View (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setDeviceMode("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === "tablet"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet (768px)</span>
          </button>

          <button
            onClick={() => setDeviceMode("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === "mobile"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile (375px)</span>
          </button>

          <button
            onClick={() => setDeviceMode("custom")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === "custom"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
            title="Custom Resizable Width"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Custom</span>
          </button>
        </div>

        {/* Custom Width Slider if in custom mode */}
        {deviceMode === "custom" && (
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
            <span className="text-[11px] font-mono font-bold text-slate-600">{customWidth}px</span>
            <input
              type="range"
              min={320}
              max={1440}
              step={10}
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value))}
              className="w-24 sm:w-36 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        )}

        {/* Current Breakpoint Pill */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-slate-400">Breakpoint:</span>
          <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${breakpoint.color}`}>
            {breakpoint.label}
          </span>
        </div>

        {/* Canvas Background & Window controls */}
        <div className="flex items-center gap-1.5">
          {/* Background switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setCanvasBg("light")}
              className={`p-1.5 rounded text-slate-600 hover:text-slate-900 ${canvasBg === "light" ? "bg-white shadow-xs" : ""}`}
              title="Light Slate Background"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300"></div>
            </button>
            <button
              onClick={() => setCanvasBg("white")}
              className={`p-1.5 rounded text-slate-600 hover:text-slate-900 ${canvasBg === "white" ? "bg-white shadow-xs" : ""}`}
              title="Clean White Background"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            </button>
            <button
              onClick={() => setCanvasBg("dark")}
              className={`p-1.5 rounded text-slate-600 hover:text-slate-900 ${canvasBg === "dark" ? "bg-white shadow-xs" : ""}`}
              title="Dark Contrast Canvas"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
            </button>
          </div>

          {/* Refresh iframe button */}
          <button
            onClick={() => setKey((k) => k + 1)}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Open in new tab */}
          <button
            onClick={handleOpenExternal}
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div
        className={`flex-1 overflow-auto p-4 sm:p-6 flex items-start justify-center transition-colors ${
          canvasBg === "light"
            ? "bg-slate-100"
            : canvasBg === "white"
            ? "bg-white"
            : "bg-slate-950"
        }`}
      >
        <div
          style={{ width: getActiveWidth() }}
          className={`transition-all duration-300 min-h-[600px] flex flex-col rounded-2xl shadow-xl border overflow-hidden ${
            canvasBg === "dark" ? "border-slate-800 bg-slate-900" : "border-slate-300 bg-white"
          }`}
        >
          {/* Simulated Device Frame Topbar */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500 shrink-0 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <div className="text-[11px] font-mono text-slate-600 bg-white px-3 py-0.5 rounded-md border border-slate-200 shadow-2xs max-w-xs truncate">
              {title || "gemini-ui-layout.html"} ({currentPx}px)
            </div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Tailwind v3/v4</div>
          </div>

          {/* Iframe Viewport */}
          <iframe
            key={key}
            ref={iframeRef}
            srcDoc={iframeSrcDoc}
            title={title}
            sandbox="allow-scripts allow-modals allow-forms"
            className="w-full flex-1 min-h-[580px] bg-white border-0"
          />
        </div>
      </div>
    </div>
  );
};
