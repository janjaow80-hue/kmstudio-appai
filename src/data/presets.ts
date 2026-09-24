import { PromptPreset } from "../types";

export const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: "pricing-matrix",
    title: "SaaS Pricing Matrix with Annual Toggle",
    category: "pricing",
    styleArchetype: "modern",
    description: "3-tier pricing cards with featured popular badge, dynamic billing switcher, and feature checkmarks.",
    prompt: "A high-converting 3-tier SaaS pricing table with Starter, Pro, and Enterprise tiers. Include an interactive Monthly/Annual toggle with a 'Save 20%' badge, detailed feature checkmarks, and a highlight on the middle tier.",
    defaultData: {
      title: "Dynamic 3-Tier SaaS Pricing Table",
      summary: "Modern pricing grid featuring an interactive billing period switcher, popular tier spotlight, and responsive multi-column stacking.",
      tags: ["Pricing", "SaaS", "Interactive Toggle", "Responsive Grid"],
      responsiveHighlights: [
        "Stacks cleanly into 1 column on mobile screens (<640px) with generous touch targets",
        "Expands to 3 balanced columns on desktop (>=1024px)",
        "Highlighted Pro card features an elevated border and subtle upward scale effect",
        "Feature list aligns consistently with subtle dividers",
      ],
      suggestedRefinements: [
        "Add a 14-day free trial guarantee ribbon at the bottom",
        "Include an enterprise FAQ accordion section below the cards",
        "Switch the primary color palette to deep emerald green",
        "Add tooltips for advanced enterprise compliance features",
      ],
      html: `<div class="max-w-6xl mx-auto px-4 py-16 font-sans text-slate-800">
  <!-- Header -->
  <div class="text-center max-w-2xl mx-auto mb-12">
    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
      <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
      Flexible Plans for Teams of All Sizes
    </span>
    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
      Simple, predictable pricing. No hidden fees.
    </h2>
    <p class="text-slate-600 text-base sm:text-lg">
      Start building with full features today. Upgrade or downgrade anytime as your company scales.
    </p>

    <!-- Billing Toggle -->
    <div class="mt-8 inline-flex items-center gap-3 p-1.5 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
      <button id="monthlyBtn" onclick="toggleBilling('monthly')" class="px-4 py-1.5 text-sm font-semibold rounded-lg transition-all bg-white text-slate-900 shadow-sm">
        Monthly
      </button>
      <button id="annualBtn" onclick="toggleBilling('annual')" class="px-4 py-1.5 text-sm font-semibold rounded-lg transition-all text-slate-600 hover:text-slate-900">
        Annual
      </button>
      <span class="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md">Save 20%</span>
    </div>
  </div>

  <!-- Cards Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
    <!-- Starter Tier -->
    <div class="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div class="flex justify-between items-baseline mb-4">
          <h3 class="text-lg font-bold text-slate-900">Starter</h3>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">For Individuals</span>
        </div>
        <p class="text-sm text-slate-500 mb-6">Essential tools to launch your prototype and test ideas.</p>
        <div class="flex items-baseline gap-1 mb-6">
          <span class="text-4xl font-extrabold text-slate-900 price-val" data-monthly="$19" data-annual="$15">$19</span>
          <span class="text-sm text-slate-500 font-medium">/ user / month</span>
        </div>
        <ul class="space-y-3.5 text-sm text-slate-600 border-t border-slate-100 pt-6">
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Up to 3 team members</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>10,000 monthly active requests</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Community forum support</span>
          </li>
          <li class="flex items-center gap-3 text-slate-400 line-through">
            <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            <span>Custom domain SSO</span>
          </li>
        </ul>
      </div>
      <button class="mt-8 w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
        Start 14-Day Trial
      </button>
    </div>

    <!-- Pro Tier (Highlighted) -->
    <div class="relative rounded-2xl border-2 border-indigo-600 bg-white p-8 flex flex-col justify-between shadow-xl ring-4 ring-indigo-50">
      <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
        Most Popular
      </div>
      <div>
        <div class="flex justify-between items-baseline mb-4">
          <h3 class="text-lg font-bold text-slate-900">Growth Pro</h3>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-700">Scaling Teams</span>
        </div>
        <p class="text-sm text-slate-500 mb-6">Full feature toolkit with advanced automation & real-time telemetry.</p>
        <div class="flex items-baseline gap-1 mb-6">
          <span class="text-4xl font-extrabold text-slate-900 price-val" data-monthly="$49" data-annual="$39">$49</span>
          <span class="text-sm text-slate-500 font-medium">/ user / month</span>
        </div>
        <ul class="space-y-3.5 text-sm text-slate-600 border-t border-slate-100 pt-6">
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span class="font-medium text-slate-900">Up to 25 team members</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Unlimited workflow automation</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Prioritized 24/7 Slack & Email support</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Audit logs & custom data export</span>
          </li>
        </ul>
      </div>
      <button class="mt-8 w-full py-3 px-4 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
        Upgrade to Pro Now
      </button>
    </div>

    <!-- Enterprise Tier -->
    <div class="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div class="flex justify-between items-baseline mb-4">
          <h3 class="text-lg font-bold text-slate-900">Enterprise</h3>
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">Dedicated Security</span>
        </div>
        <p class="text-sm text-slate-500 mb-6">Custom deployment, multi-region compliance, and dedicated SLA.</p>
        <div class="flex items-baseline gap-1 mb-6">
          <span class="text-4xl font-extrabold text-slate-900 price-val" data-monthly="$149" data-annual="$119">$149</span>
          <span class="text-sm text-slate-500 font-medium">/ user / month</span>
        </div>
        <ul class="space-y-3.5 text-sm text-slate-600 border-t border-slate-100 pt-6">
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Unlimited team seats & projects</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>SOC2 Type II & HIPAA compliance</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>99.99% uptime SLA guarantee</span>
          </li>
          <li class="flex items-center gap-3">
            <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
            <span>Dedicated technical account manager</span>
          </li>
        </ul>
      </div>
      <button class="mt-8 w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
        Contact Sales Team
      </button>
    </div>
  </div>
</div>

<script>
  function toggleBilling(period) {
    const monthlyBtn = document.getElementById('monthlyBtn');
    const annualBtn = document.getElementById('annualBtn');
    const priceElements = document.querySelectorAll('.price-val');

    if (period === 'annual') {
      annualBtn.className = 'px-4 py-1.5 text-sm font-semibold rounded-lg transition-all bg-white text-slate-900 shadow-sm';
      monthlyBtn.className = 'px-4 py-1.5 text-sm font-semibold rounded-lg transition-all text-slate-600 hover:text-slate-900';
      priceElements.forEach(el => el.textContent = el.getAttribute('data-annual'));
    } else {
      monthlyBtn.className = 'px-4 py-1.5 text-sm font-semibold rounded-lg transition-all bg-white text-slate-900 shadow-sm';
      annualBtn.className = 'px-4 py-1.5 text-sm font-semibold rounded-lg transition-all text-slate-600 hover:text-slate-900';
      priceElements.forEach(el => el.textContent = el.getAttribute('data-monthly'));
    }
  }
</script>`,
      reactCode: `import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: 'Starter',
      price: isAnnual ? 15 : 19,
      subtitle: 'For Individuals',
      description: 'Essential tools to launch your prototype and test ideas.',
      features: ['Up to 3 team members', '10,000 monthly active requests', 'Community forum support'],
      excluded: ['Custom domain SSO'],
      popular: false,
      cta: 'Start 14-Day Trial',
    },
    {
      name: 'Growth Pro',
      price: isAnnual ? 39 : 49,
      subtitle: 'Scaling Teams',
      description: 'Full feature toolkit with advanced automation & real-time telemetry.',
      features: ['Up to 25 team members', 'Unlimited workflow automation', 'Prioritized 24/7 Slack & Email support', 'Audit logs & custom data export'],
      excluded: [],
      popular: true,
      cta: 'Upgrade to Pro Now',
    },
    {
      name: 'Enterprise',
      price: isAnnual ? 119 : 149,
      subtitle: 'Dedicated Security',
      description: 'Custom deployment, multi-region compliance, and dedicated SLA.',
      features: ['Unlimited team seats & projects', 'SOC2 Type II & HIPAA compliance', '99.99% uptime SLA guarantee', 'Dedicated account manager'],
      excluded: [],
      popular: false,
      cta: 'Contact Sales Team',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 font-sans text-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          Flexible Plans for Teams of All Sizes
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Simple, predictable pricing. No hidden fees.
        </h2>
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setIsAnnual(false)}
            className={\`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all \${!isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}\`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={\`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all \${isAnnual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}\`}
          >
            Annual
          </button>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md">Save 20%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={\`rounded-2xl p-8 flex flex-col justify-between \${
              tier.popular
                ? 'relative border-2 border-indigo-600 bg-white shadow-xl ring-4 ring-indigo-50'
                : 'border border-slate-200 bg-white shadow-sm'
            }\`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <div>
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">{tier.subtitle}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-slate-900">\${tier.price}</span>
                <span className="text-sm text-slate-500 font-medium">/ user / month</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-600 border-t border-slate-100 pt-6">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={\`mt-8 w-full py-3 px-4 rounded-xl text-sm font-semibold transition-colors \${
                tier.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md' : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
              }\`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}`,
    },
  },
  {
    id: "saas-hero",
    title: "Modern SaaS Hero with Live Metrics & Preview",
    category: "hero",
    styleArchetype: "modern",
    description: "High impact hero with announcement pill, dual call-to-actions, customer proof logos, and floating interactive dashboard cards.",
    prompt: "A modern, high-conversion SaaS hero section with an announcement badge, bold headline with highlighted keywords, dual CTAs (free trial & watch demo), social proof customer avatar stack with star rating, and a floating interactive dashboard preview mock.",
    defaultData: {
      title: "Hero Section with Floating Telemetry Mockup",
      summary: "High-impact hero section showcasing an announcement badge, clear dual call-to-action buttons, trust indicators, and a responsive preview card.",
      tags: ["Hero", "Modern SaaS", "Social Proof", "Responsive"],
      responsiveHighlights: [
        "Balanced 2-column split layout on desktop (>=1024px)",
        "Mobile view collapses cleanly into a vertical content-first flow with full-width primary CTA",
        "Floating metric chips reposition smoothly across viewports without horizontal scroll",
      ],
      suggestedRefinements: [
        "Add a background subtle mesh gradient or radial glow",
        "Include an interactive video modal trigger for the demo button",
        "Add logo cloud of Fortune 500 customers underneath",
      ],
      html: `<section class="relative overflow-hidden bg-white text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
      <!-- Left Column: Content -->
      <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
          <span class="flex h-2 w-2 rounded-full bg-indigo-600"></span>
          <span>Version 3.2 Released</span>
          <span class="text-indigo-400">|</span>
          <span class="hover:underline cursor-pointer">Explore new features &rarr;</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Ship intelligent workflows <span class="text-indigo-600 underline decoration-indigo-200 decoration-wavy decoration-2">10x faster</span> without friction
        </h1>

        <p class="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          The all-in-one developer automation platform that turns high-level specs into tested, deployed microservices with zero configuration.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
          <button class="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5">
            Start Building Free
          </button>
          <button class="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-base flex items-center justify-center gap-2 transition-colors">
            <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>
            Watch 2-Min Tour
          </button>
        </div>

        <!-- Social Proof -->
        <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
          <div class="flex -space-x-2 overflow-hidden">
            <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar">
            <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar">
            <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" alt="Avatar">
            <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Avatar">
          </div>
          <div class="text-center sm:text-left">
            <div class="flex items-center gap-1 text-amber-500 justify-center sm:justify-start">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              <span class="font-bold text-slate-900 ml-1">4.9/5</span>
            </div>
            <p>Loved by 12,000+ engineering teams worldwide</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive UI Mockup Card -->
      <div class="lg:col-span-5 relative">
        <div class="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
          <!-- Window Bar -->
          <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-full bg-rose-400"></span>
              <span class="w-3 h-3 rounded-full bg-amber-400"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            </div>
            <span class="text-xs font-mono text-slate-400">app.pipeline.live</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">Healthy</span>
          </div>

          <!-- Mock Metric Grid -->
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-xs text-slate-500 font-medium">Throughput</span>
              <p class="text-2xl font-extrabold text-slate-900 mt-1">48.2k <span class="text-xs text-emerald-600 font-semibold">+18%</span></p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-xs text-slate-500 font-medium">Latency P99</span>
              <p class="text-2xl font-extrabold text-slate-900 mt-1">14ms <span class="text-xs text-emerald-600 font-semibold">-4ms</span></p>
            </div>
          </div>

          <!-- Mock Activity Chart / Feed -->
          <div class="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 mb-3">
            <div class="flex justify-between items-center text-xs font-semibold text-indigo-900 mb-2">
              <span>Active Deployment</span>
              <span class="text-indigo-600">Region: us-east</span>
            </div>
            <div class="w-full bg-indigo-200 h-2 rounded-full overflow-hidden">
              <div class="bg-indigo-600 h-full w-4/5 rounded-full"></div>
            </div>
          </div>

          <!-- Bottom Status Pill -->
          <div class="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>Last sync: 2 seconds ago</span>
            <span class="font-medium text-indigo-600 hover:underline cursor-pointer">View full telemetry &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
      reactCode: `import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600" />
              <span>Version 3.2 Released</span>
              <span className="text-indigo-400">|</span>
              <span className="hover:underline cursor-pointer">Explore new features &rarr;</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Ship intelligent workflows <span className="text-indigo-600 underline decoration-indigo-200">10x faster</span> without friction
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The all-in-one developer automation platform that turns high-level specs into tested, deployed microservices with zero configuration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-200 transition-all">
                Start Building Free
              </button>
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-base flex items-center justify-center gap-2 transition-colors">
                <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                Watch 2-Min Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,
    },
  },
  {
    id: "bento-features",
    title: "Bento-Grid Feature Matrix with Interactive Cards",
    category: "features",
    styleArchetype: "modern",
    description: "Modern Bento grid layout with asymmetric spans, code preview snippet, security badge, and responsive flow.",
    prompt: "An elegant Bento grid feature section with 4 asymmetric feature cards: AI Automation with animated pulse, Real-Time Edge sync with miniature code block, Enterprise Security with compliance icons, and Team Collaboration with interactive avatars.",
    defaultData: {
      title: "Asymmetric Bento Grid Feature Matrix",
      summary: "Modern grid architecture utilizing col-span-2 and row-span layouts for visual variety and high engagement.",
      tags: ["Features", "Bento Grid", "Asymmetric Layout", "Micro-Interactions"],
      responsiveHighlights: [
        "1-column flow on mobile viewports",
        "2-column organized grid on tablet viewports",
        "3-column asymmetric bento layout on desktop viewports",
      ],
      suggestedRefinements: [
        "Add interactive copy button to the embedded code block",
        "Incorporate dark-mode support with zinc-900 background cards",
        "Add subtle hover glow borders to each card",
      ],
      html: `<section class="py-16 px-4 max-w-6xl mx-auto font-sans text-slate-900">
  <div class="text-center max-w-2xl mx-auto mb-12">
    <h2 class="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Capabilities & Features</h2>
    <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Engineered for speed, built for scale</h3>
    <p class="text-slate-500 mt-3 text-base sm:text-lg">Every module has been architected to handle mission-critical workloads effortlessly.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Card 1: Large Span AI Assistant -->
    <div class="md:col-span-2 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-5 shadow-sm">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h4 class="text-xl font-bold text-slate-900 mb-2">Autonomous Agent Orchestration</h4>
        <p class="text-slate-600 text-sm leading-relaxed max-w-xl">
          Multi-agent coordination handles complex background workflows, automatically resolving dependencies, retry mechanisms, and schema migrations.
        </p>
      </div>
      <div class="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
        <span class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">Sub-50ms Latency</span>
        <span class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">Dynamic Tool Use</span>
        <span class="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">Vector Search</span>
      </div>
    </div>

    <!-- Card 2: Security -->
    <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-sm">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <h4 class="text-xl font-bold text-slate-900 mb-2">Zero-Trust Isolation</h4>
        <p class="text-slate-600 text-sm leading-relaxed">
          Full encryption at rest and in transit with automated RBAC access tiers and audit log compliance.
        </p>
      </div>
      <div class="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
        <span>✓ SOC2 Type II Certified</span>
      </div>
    </div>

    <!-- Card 3: Code Snippet -->
    <div class="rounded-2xl border border-slate-200 bg-slate-900 text-white p-8 shadow-sm flex flex-col justify-between font-mono">
      <div>
        <div class="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
          <span>pipeline.config.ts</span>
          <span class="text-emerald-400">TypeScript</span>
        </div>
        <pre class="text-xs text-slate-300 leading-relaxed overflow-x-auto"><code>const agent = new Pipeline({
  model: 'gemini-3.8-flash',
  memory: 'distributed',
  sandbox: true,
});

await agent.deploy();</code></pre>
      </div>
      <div class="mt-6 text-xs text-slate-400 font-sans flex items-center justify-between pt-4 border-t border-slate-800">
        <span>Ready for Docker & Edge</span>
        <span class="text-indigo-400 font-semibold cursor-pointer">Docs &rarr;</span>
      </div>
    </div>

    <!-- Card 4: Real-time Analytics (Span 2) -->
    <div class="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h4 class="text-xl font-bold text-slate-900 mb-1">Global Telemetry Stream</h4>
          <p class="text-slate-500 text-sm">Real-time trace logs distributed across 35 edge regions.</p>
        </div>
        <span class="self-start sm:self-auto px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
          99.99% Uptime
        </span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
        <div class="p-3 bg-slate-50 rounded-xl">
          <span class="text-xs text-slate-500">P95 Response</span>
          <p class="text-lg font-bold text-slate-900">22ms</p>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl">
          <span class="text-xs text-slate-500">Edge Points</span>
          <p class="text-lg font-bold text-slate-900">350+</p>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl">
          <span class="text-xs text-slate-500">Daily Events</span>
          <p class="text-lg font-bold text-slate-900">1.4B</p>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl">
          <span class="text-xs text-slate-500">Auto-Heal</span>
          <p class="text-lg font-bold text-emerald-600">Active</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
      reactCode: `import React from 'react';
import { Zap, Shield, Terminal, Activity } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto font-sans text-slate-900">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Capabilities & Features</h2>
        <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Engineered for speed, built for scale</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bento items with Lucide icons */}
      </div>
    </section>
  );
}`,
    },
  },
  {
    id: "ecommerce-card",
    title: "Interactive E-Commerce Product Showcase",
    category: "card",
    styleArchetype: "modern",
    description: "Product card with image thumbnail switcher, color swatch picker, size selection pills, and instant add-to-cart state.",
    prompt: "An interactive e-commerce product detail card with image preview, thumbnail gallery, dynamic color swatch selector, size selector buttons, stock alert badge, star ratings, and an add-to-cart button with micro-interaction state.",
    defaultData: {
      title: "Interactive E-Commerce Product Card",
      summary: "Clean, responsive product showcase featuring interactive color swatches, size selectors, and instant cart state.",
      tags: ["E-Commerce", "Product Card", "Interactive Swatches", "Mobile Friendly"],
      responsiveHighlights: [
        "Horizontal card layout on desktop, clean vertical card on mobile",
        "Thumbnails wrap neatly without breaking layout",
        "Large tap targets designed for touch screens",
      ],
      suggestedRefinements: [
        "Add an interactive quantity counter (+ / -)",
        "Include customer review count and verified buyer badge",
        "Add a wishlist heart toggle button in the top corner",
      ],
      html: `<div class="max-w-4xl mx-auto p-4 sm:p-6 font-sans">
  <div class="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
    <!-- Left: Image Preview & Gallery -->
    <div class="p-6 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
      <div class="relative rounded-2xl overflow-hidden bg-white aspect-square flex items-center justify-center p-4 border border-slate-200 shadow-inner">
        <img id="mainProductImg" class="object-cover w-full h-full rounded-xl transition-all duration-300" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80" alt="Nike Sport Shoe">
        <span class="absolute top-3 left-3 bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          Sale 25% Off
        </span>
      </div>

      <!-- Thumbnail Row -->
      <div class="flex gap-3 mt-4 justify-center">
        <button onclick="changeImg('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', this)" class="w-14 h-14 rounded-xl border-2 border-indigo-600 p-1 bg-white overflow-hidden shadow-sm">
          <img class="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80">
        </button>
        <button onclick="changeImg('https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80', this)" class="w-14 h-14 rounded-xl border-2 border-transparent hover:border-slate-300 p-1 bg-white overflow-hidden shadow-sm">
          <img class="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&auto=format&fit=crop&q=80">
        </button>
        <button onclick="changeImg('https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&auto=format&fit=crop&q=80', this)" class="w-14 h-14 rounded-xl border-2 border-transparent hover:border-slate-300 p-1 bg-white overflow-hidden shadow-sm">
          <img class="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=150&auto=format&fit=crop&q=80">
        </button>
      </div>
    </div>

    <!-- Right: Product Details & Purchase Form -->
    <div class="p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs font-bold uppercase tracking-widest text-indigo-600">Performance Series</span>
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">In Stock (14 left)</span>
        </div>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">AeroPulse Pro Runner</h3>
        
        <!-- Ratings -->
        <div class="flex items-center gap-2 mb-4">
          <div class="flex text-amber-400 text-sm">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <span class="text-xs font-bold text-slate-700">4.8</span>
          <span class="text-xs text-slate-400">(1,248 reviews)</span>
        </div>

        <!-- Price -->
        <div class="flex items-baseline gap-3 mb-6">
          <span class="text-3xl font-extrabold text-slate-900">$149.00</span>
          <span class="text-base text-slate-400 line-through font-medium">$199.00</span>
        </div>

        <!-- Color Swatches -->
        <div class="mb-6">
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Color: <span id="colorLabel" class="text-slate-900 font-extrabold">Crimson Red</span></label>
          <div class="flex gap-2.5">
            <button onclick="selectColor('Crimson Red', this)" class="w-8 h-8 rounded-full bg-rose-600 ring-2 ring-offset-2 ring-indigo-600 transition-all"></button>
            <button onclick="selectColor('Midnight Black', this)" class="w-8 h-8 rounded-full bg-slate-900 ring-2 ring-offset-2 ring-transparent hover:ring-slate-300 transition-all"></button>
            <button onclick="selectColor('Cobalt Blue', this)" class="w-8 h-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-transparent hover:ring-slate-300 transition-all"></button>
          </div>
        </div>

        <!-- Size Selector -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-600">Select Size (US)</label>
            <span class="text-xs text-indigo-600 font-medium hover:underline cursor-pointer">Size Guide</span>
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button onclick="selectSize(this)" class="py-2.5 rounded-xl border border-slate-200 text-sm font-semibold hover:border-slate-400">8.0</button>
            <button onclick="selectSize(this)" class="py-2.5 rounded-xl border-2 border-indigo-600 bg-indigo-50/50 text-indigo-700 text-sm font-bold shadow-sm">9.0</button>
            <button onclick="selectSize(this)" class="py-2.5 rounded-xl border border-slate-200 text-sm font-semibold hover:border-slate-400">10.0</button>
            <button onclick="selectSize(this)" class="py-2.5 rounded-xl border border-slate-200 text-sm font-semibold hover:border-slate-400">11.0</button>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="pt-4 border-t border-slate-100 flex gap-3">
        <button id="cartBtn" onclick="addToCart(this)" class="flex-1 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          <span>Add to Bag</span>
        </button>
        <button class="p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
      </div>
    </div>
  </div>
</div>

<script>
  function changeImg(src, btn) {
    document.getElementById('mainProductImg').src = src;
    btn.parentElement.querySelectorAll('button').forEach(b => b.className = 'w-14 h-14 rounded-xl border-2 border-transparent hover:border-slate-300 p-1 bg-white overflow-hidden shadow-sm');
    btn.className = 'w-14 h-14 rounded-xl border-2 border-indigo-600 p-1 bg-white overflow-hidden shadow-sm';
  }
  function selectColor(colorName, btn) {
    document.getElementById('colorLabel').textContent = colorName;
    btn.parentElement.querySelectorAll('button').forEach(b => b.classList.replace('ring-indigo-600', 'ring-transparent'));
    btn.classList.replace('ring-transparent', 'ring-indigo-600');
  }
  function selectSize(btn) {
    btn.parentElement.querySelectorAll('button').forEach(b => {
      b.className = 'py-2.5 rounded-xl border border-slate-200 text-sm font-semibold hover:border-slate-400';
    });
    btn.className = 'py-2.5 rounded-xl border-2 border-indigo-600 bg-indigo-50/50 text-indigo-700 text-sm font-bold shadow-sm';
  }
  function addToCart(btn) {
    btn.innerHTML = '<span>✓ Added to Bag!</span>';
    btn.classList.replace('bg-indigo-600', 'bg-emerald-600');
    setTimeout(() => {
      btn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg><span>Add to Bag</span>';
      btn.classList.replace('bg-emerald-600', 'bg-indigo-600');
    }, 2000);
  }
</script>`,
      reactCode: `import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Check } from 'lucide-react';

export default function ProductCard() {
  const [selectedSize, setSelectedSize] = useState('9.0');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans">
      {/* Product container */}
    </div>
  );
}`,
    },
  },
  {
    id: "analytics-kpi",
    title: "Executive KPI & Analytics Dashboard",
    category: "dashboard",
    styleArchetype: "modern",
    description: "Executive metrics grid with positive/negative trend pills, mini sparkline bars, and recent activity table.",
    prompt: "An executive KPI summary dashboard with 4 metric cards (ARR, Active Users, Churn Rate, Average Order Value), trend indicators with sparkline bars, period range selector (7D, 30D, 90D), and a responsive recent transactions data table.",
    defaultData: {
      title: "Executive KPI & Analytics Grid",
      summary: "High density metric dashboard designed for executive visibility with responsive tables and status indicators.",
      tags: ["Dashboard", "Analytics", "KPI", "Data Table"],
      responsiveHighlights: [
        "1-column cards on mobile (<640px)",
        "2-column cards on tablet (>=640px)",
        "4-column compact cards on desktop (>=1024px)",
        "Horizontal scrolling container for table prevents viewport blowouts on small screens",
      ],
      suggestedRefinements: [
        "Add interactive filter dropdowns for regions",
        "Add CSV export button in the table header",
        "Switch to dark mode theme with slate-950 cards",
      ],
      html: `<div class="max-w-6xl mx-auto p-4 sm:p-6 font-sans text-slate-800">
  <!-- Top Bar -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Executive Telemetry</h2>
      <p class="text-sm text-slate-500 mt-1">Real-time revenue attribution and operational health.</p>
    </div>
    <div class="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 self-start sm:self-auto text-xs font-semibold">
      <button class="px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-900">7 Days</button>
      <button class="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900">30 Days</button>
      <button class="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900">Quarter</button>
    </div>
  </div>

  <!-- 4 KPI Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
    <!-- Card 1 -->
    <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly Recurring</span>
        <span class="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          +14.2% ↑
        </span>
      </div>
      <p class="text-3xl font-extrabold text-slate-900 mb-2">$84,320</p>
      <div class="flex items-center gap-1.5">
        <div class="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div class="bg-indigo-600 h-full w-4/5 rounded-full"></div>
        </div>
        <span class="text-[11px] text-slate-400 font-medium">84% of target</span>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Accounts</span>
        <span class="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          +8.5% ↑
        </span>
      </div>
      <p class="text-3xl font-extrabold text-slate-900 mb-2">12,480</p>
      <div class="flex items-center gap-1.5">
        <div class="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div class="bg-emerald-500 h-full w-2/3 rounded-full"></div>
        </div>
        <span class="text-[11px] text-slate-400 font-medium">210 new today</span>
      </div>
    </div>

    <!-- Card 3 -->
    <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Net Churn Rate</span>
        <span class="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          -0.4% ↓
        </span>
      </div>
      <p class="text-3xl font-extrabold text-slate-900 mb-2">1.2%</p>
      <div class="flex items-center gap-1.5">
        <div class="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div class="bg-indigo-500 h-full w-1/4 rounded-full"></div>
        </div>
        <span class="text-[11px] text-slate-400 font-medium">Industry low</span>
      </div>
    </div>

    <!-- Card 4 -->
    <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex justify-between items-start mb-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Order Value</span>
        <span class="inline-flex items-center text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
          +$18 ↑
        </span>
      </div>
      <p class="text-3xl font-extrabold text-slate-900 mb-2">$312</p>
      <div class="flex items-center gap-1.5">
        <div class="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div class="bg-indigo-600 h-full w-3/4 rounded-full"></div>
        </div>
        <span class="text-[11px] text-slate-400 font-medium">Up from $294</span>
      </div>
    </div>
  </div>

  <!-- Recent Transactions Table -->
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
      <h3 class="font-bold text-slate-900 text-base">Recent Enterprise Subscriptions</h3>
      <button class="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View All Invoices &rarr;</button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-600">
        <thead class="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
          <tr>
            <th class="px-6 py-3.5">Customer / Entity</th>
            <th class="px-6 py-3.5">Plan Tier</th>
            <th class="px-6 py-3.5">Amount</th>
            <th class="px-6 py-3.5">Status</th>
            <th class="px-6 py-3.5 text-right">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr class="hover:bg-slate-50/70 transition-colors">
            <td class="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">AC</span>
              Acme Global Corp
            </td>
            <td class="px-6 py-4"><span class="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium text-xs">Enterprise Annual</span></td>
            <td class="px-6 py-4 font-bold text-slate-900">$18,400</td>
            <td class="px-6 py-4"><span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">● Settled</span></td>
            <td class="px-6 py-4 text-right text-xs text-slate-400">Today, 2:15 PM</td>
          </tr>
          <tr class="hover:bg-slate-50/70 transition-colors">
            <td class="px-6 py-4 font-semibold text-slate-900 flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">NX</span>
              Nexus Robotics Lab
            </td>
            <td class="px-6 py-4"><span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-xs">Team Pro</span></td>
            <td class="px-6 py-4 font-bold text-slate-900">$4,800</td>
            <td class="px-6 py-4"><span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">● Settled</span></td>
            <td class="px-6 py-4 text-right text-xs text-slate-400">Yesterday</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
      reactCode: `import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 font-sans text-slate-800">
      {/* Analytics KPI Components */}
    </div>
  );
}`,
    },
  },
];
