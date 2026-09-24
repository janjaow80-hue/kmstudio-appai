export function generateStandaloneHtml(htmlContent: string, title: string = "Generated UI Component"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - Gemini UI Code</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
  <div class="min-h-screen py-8 px-4 flex flex-col justify-center items-center">
    <div class="w-full max-w-7xl mx-auto">
      ${htmlContent}
    </div>
  </div>
</body>
</html>`;
}

export function downloadHtmlFile(htmlContent: string, filename: string = "gemini-code-1788988029267.html") {
  const fullHtml = generateStandaloneHtml(htmlContent);
  const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
