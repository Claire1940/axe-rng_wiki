"use client";

import { useState, Suspense, lazy } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bug,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Gamepad2,
  Gift,
  Hammer,
  Map as MapIcon,
  RefreshCw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
// import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Unified module header: eyebrow pill (icon + label) + title + subtitle + intro
function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  intro,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  subtitle?: string;
  intro?: string;
}) {
  return (
    <div className="text-center mb-8 md:mb-12 scroll-reveal">
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 md:mb-5
                   bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
      >
        <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
        <span className="text-xs md:text-sm font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      {intro && (
        <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto mt-3 md:mt-4">
          {intro}
        </p>
      )}
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const m = t.modules as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axe-rng.wiki";

  // Accordion states
  const [beesExpanded, setBeesExpanded] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string>("");
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch {
      // Clipboard unavailable; ignore silently
    }
  };

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Axe RNG Wiki",
        description:
          "Complete Axe RNG Wiki covering Roblox codes, redeem steps, rare axes, bees, honey, upgrades, zones and rebirth tips for Chopsy Games' RNG tree-chopping simulator.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Axe RNG - Roblox RNG Lumberjack Simulator",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Axe RNG Wiki",
        alternateName: "Axe RNG",
        url: siteUrl,
        description:
          "Complete Axe RNG Wiki resource hub for Roblox codes, redeem steps, rare axes, bees, honey, upgrades, zones, and rebirth tips",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Axe RNG Wiki - Roblox RNG Lumberjack Simulator",
        },
        sameAs: [
          "https://www.roblox.com/games/121863161094252/Axe-RNG",
          "https://www.roblox.com/communities/896806231/Chopsy-Games",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Axe RNG",
        gamePlatform: ["Roblox"],
        applicationCategory: "Game",
        genre: ["Simulation", "RNG", "Casual", "Adventure"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 1,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://www.roblox.com/games/121863161094252/Axe-RNG",
        },
      },
      {
        "@type": "VideoObject",
        name: "Chopping INFINITE Trees in Roblox Axe RNG",
        description:
          "Axe RNG gameplay video showing the roll-axes, chop-trees, hatch-bees, collect-honey and rebirth-luck loop in Chopsy Games' Roblox RNG lumberjack simulator.",
        uploadDate: "2026-06-18",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/f3lWoOc2r3k",
        url: "https://www.youtube.com/watch?v=f3lWoOc2r3k",
      },
    ],
  };

  // Tool grid card -> section id mapping (8 cards, 8 modules)
  const toolSectionIds = [
    "codes",
    "official-info",
    "beginner-guide",
    "axe-tier-list",
    "skills-upgrades",
    "bees-honey",
    "rebirth-luck",
    "zones-progression",
  ];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 左侧广告容器 - Fixed 定位 */}
      {/* <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x300"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300}
        />
      </aside> */}

      {/* 右侧广告容器 - Fixed 定位 */}
      {/* <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}
      >
        <SidebarAd
          type="sidebar-160x600"
          adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600}
        />
      </aside> */}

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Gift className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/121863161094252/Axe-RNG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 区域 */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="f3lWoOc2r3k"
              title="Chopping INFINITE Trees in Roblox Axe RNG"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards (视频之后、最新更新之前) */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {t.tools.cards.map((card: any, index: number) => (
              <button
                key={index}
                onClick={() => scrollToSection(toolSectionIds[index])}
                className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                           bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                           transition-all duration-300 cursor-pointer text-left
                           hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                >
                  <DynamicIcon
                    name={card.icon}
                    className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                  />
                </div>
                <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {card.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Axe RNG Codes and Redeem Guide */}
      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            icon={Gift}
            eyebrow={m.axeRngCodes.eyebrow}
            title={m.axeRngCodes.title}
            subtitle={m.axeRngCodes.subtitle}
            intro={m.axeRngCodes.intro}
          />

          {/* Active codes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
            {m.axeRngCodes.activeCodes.map((c: any, i: number) => (
              <div
                key={i}
                className="p-4 md:p-5 bg-white/5 border border-border rounded-xl
                           hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors flex flex-col"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <code className="font-mono font-bold text-base md:text-lg text-[hsl(var(--nav-theme-light))] break-all">
                    {c.code}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(c.code)}
                    aria-label={`Copy code ${c.code}`}
                    className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-md
                               border border-border hover:bg-[hsl(var(--nav-theme)/0.15)] transition-colors"
                  >
                    {copiedCode === c.code ? (
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <p className="text-sm font-semibold mb-1.5">{c.reward}</p>
                <p className="text-xs text-muted-foreground mt-auto">{c.note}</p>
              </div>
            ))}
          </div>

          {/* Expired codes */}
          <div className="mb-8 p-4 md:p-5 rounded-xl border border-border bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <h3 className="font-bold text-sm md:text-base">Expired Codes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {m.axeRngCodes.expiredCodes.map((c: any, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-3 rounded-lg bg-white/[0.02] border border-border/60"
                >
                  <code className="font-mono text-sm text-muted-foreground line-through">
                    {c.code}
                  </code>
                  <span className="text-xs text-muted-foreground/70">
                    — {c.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Redeem steps + fixes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="p-5 md:p-6 bg-white/5 border border-border rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold text-base md:text-lg">How to Redeem</h3>
              </div>
              <ol className="space-y-3">
                {m.axeRngCodes.redeemSteps.map((step: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-5 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold text-base md:text-lg">
                  If a Code Doesn&apos;t Work
                </h3>
              </div>
              <ul className="space-y-2.5">
                {m.axeRngCodes.codeFixes.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Axe RNG Official Roblox Link and Game Info */}
      <section
        id="official-info"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            icon={Gamepad2}
            eyebrow={m.axeRngOfficialInfo.eyebrow}
            title={m.axeRngOfficialInfo.title}
            subtitle={m.axeRngOfficialInfo.subtitle}
            intro={m.axeRngOfficialInfo.intro}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {m.axeRngOfficialInfo.cards.map((card: any, i: number) => {
              const inner = (
                <div className="p-5 md:p-6 h-full flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))] mb-2">
                    {card.label}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                    {card.value}
                    {card.href && (
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.detail}</p>
                </div>
              );
              const wrapperCls =
                "rounded-xl border border-border bg-white/5 hover:border-[hsl(var(--nav-theme)/0.5)] hover:bg-[hsl(var(--nav-theme)/0.05)] transition-colors h-full";
              return card.href ? (
                <a
                  key={i}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={wrapperCls}
                >
                  {inner}
                </a>
              ) : (
                <div key={i} className={wrapperCls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 3: Axe RNG Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            icon={BookOpen}
            eyebrow={m.axeRngBeginnerGuide.eyebrow}
            title={m.axeRngBeginnerGuide.title}
            subtitle={m.axeRngBeginnerGuide.subtitle}
            intro={m.axeRngBeginnerGuide.intro}
          />

          <div className="space-y-3 md:space-y-4">
            {m.axeRngBeginnerGuide.steps.map((step: any, i: number) => (
              <div
                key={i}
                className="flex gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl
                           hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold mb-3">
                    {step.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-1">
                        Action
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.action}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-1">
                        Why It Matters
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.whyItMatters}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-yellow-400">
                        Common Mistake:{" "}
                      </span>
                      {step.beginnerMistake}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 第三模块之后 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 4: Axe RNG Axe Tier List and Roll Strategy */}
      <section
        id="axe-tier-list"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            icon={Hammer}
            eyebrow={m.axeRngAxeTierList.eyebrow}
            title={m.axeRngAxeTierList.title}
            subtitle={m.axeRngAxeTierList.subtitle}
            intro={m.axeRngAxeTierList.intro}
          />

          <div className="space-y-4 md:space-y-5">
            {m.axeRngAxeTierList.tiers.map((tier: any, i: number) => {
              const isStrategy = tier.tier === "Strategy";
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-white/[0.02] overflow-hidden"
                >
                  <div
                    className={`flex items-center gap-3 p-4 md:p-5 border-b border-[hsl(var(--nav-theme)/0.2)] ${isStrategy ? "bg-[hsl(var(--nav-theme)/0.15)]" : "bg-[hsl(var(--nav-theme)/0.08)]"}`}
                  >
                    <span
                      className={`flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-lg md:text-xl ${isStrategy ? "bg-[hsl(var(--nav-theme)/0.25)] text-[hsl(var(--nav-theme-light))]" : "bg-[hsl(var(--nav-theme))] text-white"}`}
                    >
                      {tier.tier}
                    </span>
                    <h3 className="font-bold text-base md:text-lg">
                      {tier.label}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 md:p-5">
                    {tier.entries.map((e: any, j: number) => (
                      <div
                        key={j}
                        className="p-4 bg-white/5 border border-border rounded-lg"
                      >
                        <h4 className="font-bold mb-2 text-[hsl(var(--nav-theme-light))]">
                          {e.name}
                        </h4>
                        <div className="space-y-1.5 text-sm">
                          <p>
                            <span className="text-muted-foreground/70">
                              Type:{" "}
                            </span>
                            <span className="text-muted-foreground">
                              {e.type}
                            </span>
                          </p>
                          <p>
                            <span className="text-muted-foreground/70">
                              Best For:{" "}
                            </span>
                            <span className="text-muted-foreground">
                              {e.bestFor}
                            </span>
                          </p>
                          <p>
                            <span className="text-muted-foreground/70">
                              Keep or Reroll:{" "}
                            </span>
                            <span className="text-muted-foreground">
                              {e.keepOrReroll}
                            </span>
                          </p>
                          <p className="text-muted-foreground/80 pt-1 border-t border-border/40 mt-2">
                            {e.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 5: Axe RNG Skill Upgrade Order */}
      <section
        id="skills-upgrades"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            icon={TrendingUp}
            eyebrow={m.axeRngSkillsUpgrades.eyebrow}
            title={m.axeRngSkillsUpgrades.title}
            subtitle={m.axeRngSkillsUpgrades.subtitle}
            intro={m.axeRngSkillsUpgrades.intro}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {m.axeRngSkillsUpgrades.steps.map((step: any, i: number) => (
              <div
                key={i}
                className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center text-sm font-bold text-[hsl(var(--nav-theme-light))]">
                    {i + 1}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] font-semibold text-[hsl(var(--nav-theme-light))]">
                    {step.priority}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{step.action}</p>
                <div className="flex items-start gap-2 pt-2 border-t border-border/40">
                  <TrendingUp className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground/80">
                    {step.whyItMatters}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 6: Axe RNG Bees and Honey Explained */}
      <section
        id="bees-honey"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            icon={Bug}
            eyebrow={m.axeRngBeesHoney.eyebrow}
            title={m.axeRngBeesHoney.title}
            subtitle={m.axeRngBeesHoney.subtitle}
            intro={m.axeRngBeesHoney.intro}
          />

          <div className="max-w-3xl mx-auto space-y-2">
            {m.axeRngBeesHoney.faqs.map((faq: any, index: number) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-white/5"
              >
                <button
                  onClick={() =>
                    setBeesExpanded(beesExpanded === index ? null : index)
                  }
                  className="w-full flex items-center justify-between gap-3 p-4 md:p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${beesExpanded === index ? "rotate-180 text-[hsl(var(--nav-theme-light))]" : "text-muted-foreground"}`}
                  />
                </button>
                {beesExpanded === index && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Axe RNG Rebirth Timing and Luck Bonuses */}
      <section id="rebirth-luck" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            icon={RefreshCw}
            eyebrow={m.axeRngRebirthLuck.eyebrow}
            title={m.axeRngRebirthLuck.title}
            subtitle={m.axeRngRebirthLuck.subtitle}
            intro={m.axeRngRebirthLuck.intro}
          />

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)]">
                  <th className="text-left p-3 md:p-4 font-semibold whitespace-nowrap">
                    Timing
                  </th>
                  <th className="text-left p-3 md:p-4 font-semibold">Action</th>
                  <th className="text-left p-3 md:p-4 font-semibold">
                    Benefit
                  </th>
                  <th className="text-left p-3 md:p-4 font-semibold">
                    Tradeoff
                  </th>
                </tr>
              </thead>
              <tbody>
                {m.axeRngRebirthLuck.rows.map((r: any, i: number) => (
                  <tr
                    key={i}
                    className="border-t border-border align-top hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-3 md:p-4 font-semibold whitespace-nowrap">
                      {r.timing}
                    </td>
                    <td className="p-3 md:p-4 text-muted-foreground">
                      {r.action}
                    </td>
                    <td className="p-3 md:p-4 text-[hsl(var(--nav-theme-light))] font-medium">
                      {r.benefit}
                    </td>
                    <td className="p-3 md:p-4 text-muted-foreground/80">
                      {r.tradeoff}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Module 8: Axe RNG Zone Progression Route */}
      <section
        id="zones-progression"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            icon={MapIcon}
            eyebrow={m.axeRngZonesProgression.eyebrow}
            title={m.axeRngZonesProgression.title}
            subtitle={m.axeRngZonesProgression.subtitle}
            intro={m.axeRngZonesProgression.intro}
          />

          <div className="space-y-3 md:space-y-4">
            {m.axeRngZonesProgression.rows.map((r: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-white/[0.02] overflow-hidden"
              >
                <div className="flex items-center gap-3 p-4 md:p-5 bg-[hsl(var(--nav-theme)/0.08)] border-b border-[hsl(var(--nav-theme)/0.2)]">
                  <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[hsl(var(--nav-theme))] text-white flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-base md:text-lg">
                    {r.zoneStage}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-1">
                      Main Goal
                    </p>
                    <p className="text-sm text-muted-foreground">{r.mainGoal}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-1">
                      Required Strength
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {r.requiredStrength}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-1">
                      Resource Focus
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {r.resourceFocus}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-1">
                      Recommended Preparation
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {r.recommendedPreparation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Section (移至模块后) */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer - 仅外部链接 */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.roblox.com/games/121863161094252/Axe-RNG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.robloxGame}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/communities/896806231/Chopsy-Games"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.robloxGroup}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=f3lWoOc2r3k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
