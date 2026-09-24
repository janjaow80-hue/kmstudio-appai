import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "5mb" }));

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

const SYSTEM_INSTRUCTION = `You are an expert elite UI/UX engineer and front-end architect specializing in Tailwind CSS and responsive design.
Your task is to generate production-quality, responsive web layouts and UI components based on natural language prompts.

Guidelines for generated HTML:
1. Use semantic HTML5 elements (<section>, <header>, <nav>, <article>, <aside>, <footer>, <main>, <button>, <input>, etc.).
2. Use modern Tailwind CSS (v3/v4 compatible) utility classes for all styling. Do not use external custom CSS or arbitrary weird styles.
3. Responsive-First: Ensure meticulous responsiveness across viewports using sm:, md:, lg:, xl: breakpoints (e.g. flex-col sm:flex-row, grid-cols-1 md:grid-cols-2 lg:grid-cols-3).
4. Visual Polish: Use generous whitespace, balanced line-heights, refined subtle borders (e.g. border border-slate-200 dark:border-slate-800), clean contrast ratios, tasteful transitions (e.g., transition-all duration-200 hover:shadow-md hover:-translate-y-0.5).
5. Rich, Realistic Copy: Write realistic, engaging copy, real labels, numbers, and tags. Avoid lazy placeholders like "Lorem Ipsum" or "Feature 1".
6. SVG Icons: Inline clean, standard SVG icons directly with appropriate viewBox="0 0 24 24" and stroke/fill classes (like Lucide style) when icons are needed (e.g., checkmarks, stars, arrows, search, cart).
7. Interactivity: If helpful (e.g., tabs, accordion, toggle, dropdown), include minimal, self-contained inline vanilla JavaScript event handlers or attributes (e.g., onclick="this.classList.toggle('active')") so the component is delightfully interactive in the preview.
8. Output Format: Return pure, clean HTML ready to embed in a container. Do NOT wrap with markdown backticks inside JSON fields.

Also generate a clean React (JSX/TSX) equivalent of the component using Lucide icon placeholders or inline SVGs and standard React state if applicable.`;

// Generate new UI component or web layout
app.post("/api/generate-ui", async (req, res) => {
  try {
    const {
      prompt,
      styleArchetype = "modern",
      componentType = "layout",
      deviceTarget = "all",
      includeInteractivity = true,
    } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      res.status(400).json({ error: "A prompt is required." });
      return;
    }

    const ai = getGenAI();

    const userInstructions = `Generate a high quality, responsive web component or layout for:
"${prompt.trim()}"

Specifications:
- Component/Layout Type: ${componentType}
- Style Archetype: ${styleArchetype} (e.g. modern clean, minimal enterprise, dark luxury, vibrant cyberpunk, neobrutalist, glassmorphism)
- Primary Device Target: ${deviceTarget} (ensure it scales beautifully across mobile, tablet, and desktop)
- Interactivity: ${includeInteractivity ? "Include interactive touches (e.g., state toggles, tabs, interactive hover states, modals or accordions)" : "Static component"}

Return the response matching the specified JSON schema strictly.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userInstructions,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A short, descriptive name for the generated UI layout or component",
            },
            summary: {
              type: Type.STRING,
              description: "A 1-2 sentence description of what was designed and its key UX highlights",
            },
            html: {
              type: Type.STRING,
              description: "Complete, valid HTML markup styled with Tailwind CSS utility classes and inline SVGs",
            },
            reactCode: {
              type: Type.STRING,
              description: "Equivalent React JSX/TSX component code ready to copy-paste into a React app",
            },
            responsiveHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 bullet points describing responsive breakpoint behaviors (mobile, tablet, desktop)",
            },
            suggestedRefinements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3-4 natural language suggestions for follow-up prompts to customize this layout",
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Keywords such as 'Pricing', 'Responsive', 'Tailwind', 'Interactive'",
            },
          },
          required: ["title", "summary", "html", "reactCode", "responsiveHighlights", "suggestedRefinements"],
        },
      },
    });

    const responseText = response.text?.trim();
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    const parsedData = JSON.parse(responseText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/generate-ui:", error);
    res.status(500).json({
      error: error.message || "Failed to generate UI component. Please check your Gemini API key.",
    });
  }
});

// Refine existing UI component
app.post("/api/refine-ui", async (req, res) => {
  try {
    const { currentHtml, refinementPrompt, title } = req.body;

    if (!currentHtml || !refinementPrompt) {
      res.status(400).json({ error: "Both currentHtml and refinementPrompt are required." });
      return;
    }

    const ai = getGenAI();

    const promptText = `We have an existing HTML + Tailwind CSS component titled "${title || "Component"}".
Current HTML:
\`\`\`html
${currentHtml}
\`\`\`

The user requests the following modification or refinement:
"${refinementPrompt.trim()}"

Please apply these changes carefully. Keep the existing structure and polish while strictly implementing the requested adjustments.
Ensure the layout remains fully responsive and styled with Tailwind CSS.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Updated title if applicable, or existing title",
            },
            summary: {
              type: Type.STRING,
              description: "Summary of changes applied in this refinement",
            },
            html: {
              type: Type.STRING,
              description: "The updated complete HTML markup with Tailwind CSS classes",
            },
            reactCode: {
              type: Type.STRING,
              description: "The updated React component code",
            },
            responsiveHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestedRefinements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "summary", "html", "reactCode", "responsiveHighlights", "suggestedRefinements"],
        },
      },
    });

    const responseText = response.text?.trim();
    if (!responseText) {
      throw new Error("No response received from Gemini.");
    }

    const parsedData = JSON.parse(responseText);
    res.json(parsedData);
  } catch (error: any) {
    console.error("Error in /api/refine-ui:", error);
    res.status(500).json({
      error: error.message || "Failed to refine UI component. Please check your Gemini API key.",
    });
  }
});

// Mount Vite middleware or static server
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(process.cwd(), "dist", "index.html"))
      ? path.join(process.cwd(), "dist")
      : process.cwd();
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
