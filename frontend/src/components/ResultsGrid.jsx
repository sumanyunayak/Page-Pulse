import MetricCard from "./MetricCard";

import {
  CheckCircle,
  Clock,
  Heading,
  FileText,
  Hash,
  ImageOff,
  BookOpen,
  Link,
  Share2,
  ArrowLeftRight,
  ExternalLink,
} from "lucide-react";

// ==========================================
// RESULTS DATA — Magic UI Bento Grid Ready
// ==========================================
// This array is the single source of truth for every result card.
//
// Each entry contains:
//   field     — API response key
//   icon      — Lucide icon component
//   label     — Human-readable label
//   size      — Fallback CSS grid size (large / medium / small / full)
//   className — Magic UI BentoGrid column span class
//
// ── Magic UI Integration ──
// To switch to Magic UI, replace the fallback <div className="results-grid">
// below with <BentoGrid> and map resultsData to <BentoCard>:
//
//   <BentoGrid>
//     {resultsData.map((item) => (
//       <BentoCard
//         key={item.field}
//         Icon={item.icon}
//         name={item.label}
//         description={formatValue(item.field, data[item.field])}
//         className={item.className}
//         background={<div />}
//       />
//     ))}
//   </BentoGrid>
//
// No other file changes required.
// ==========================================

const resultsData = [
  { field: "title",              icon: Heading,         label: "Page Title",          size: "large",  className: "col-span-3 lg:col-span-2" },
  { field: "status",             icon: CheckCircle,      label: "HTTP Status",         size: "small",  className: "col-span-3 lg:col-span-1" },
  { field: "meta_description",   icon: FileText,         label: "Meta Description",    size: "large",  className: "col-span-3 lg:col-span-2" },
  { field: "h1_count",           icon: Hash,             label: "H1 Count",            size: "small",  className: "col-span-3 lg:col-span-1" },
  { field: "response_time",      icon: Clock,            label: "Response Time",       size: "medium", className: "col-span-3 lg:col-span-1" },
  { field: "word_count",         icon: BookOpen,         label: "Word Count",          size: "medium", className: "col-span-3 lg:col-span-1" },
  { field: "missing_alt_images", icon: ImageOff,         label: "Missing Alt Images",  size: "small",  className: "col-span-3 lg:col-span-1" },
  { field: "canonical",          icon: Link,             label: "Canonical",           size: "small",  className: "col-span-3 lg:col-span-1" },
  { field: "open_graph_title",   icon: Share2,           label: "Open Graph Title",    size: "small",  className: "col-span-3 lg:col-span-1" },
  { field: "internal_links",     icon: ArrowLeftRight,   label: "Internal Links",      size: "small",  className: "col-span-3 lg:col-span-1" },
  { field: "external_links",     icon: ExternalLink,     label: "External Links",      size: "full",   className: "col-span-3 lg:col-span-3" },
];

/** Format a raw API value for display inside a Magic UI BentoCard. */
// eslint-disable-next-line no-unused-vars
function formatValue(field, value) {
  if (field === "response_time") return `${value} ms`;
  if (field === "status" && value >= 200 && value < 300) return `${value} OK`;
  return String(value ?? "");
}

const spanClass = {
  large: "grid-item--large",
  medium: "",
  small: "",
  full: "grid-item--full",
};

/*
  ==========================================
  MAGIC UI BLUR REVEAL START
  ==========================================

  Once the Magic UI BlurFade component is installed,
  wrap the results section with it:

    import { BlurFade } from "@/registry/magicui/blur-fade"

    <BlurFade delay={0.25} inView>
      <div className="results-section">
        ...
      </div>
    </BlurFade>

  Then wrap each card individually for staggered blur:

    <BlurFade key={item.field} delay={0.25 + i * 0.07} inView>
      <div className="grid-item ...">
        <MetricCard ... />
      </div>
    </BlurFade>

  Remove the inline animationDelay style when using BlurFade.
  ==========================================
  MAGIC UI BLUR REVEAL END
  ==========================================
*/

export default function ResultsGrid({ data, onReset }) {
  return (
    <div className="results-section">
      <div className="results-header">
        <h2 className="results-title">Analysis Results</h2>
        <button className="btn-outline" onClick={onReset}>
          New Analysis
        </button>
      </div>

      {/*
        ==========================================
        PASTE MAGIC UI BENTO GRID HERE
        ==========================================

        <BentoGrid>
          {resultsData.map((item) => (
            <BentoCard
              key={item.field}
              Icon={item.icon}
              name={item.label}
              description={formatValue(item.field, data[item.field])}
              className={item.className}
              background={<div />}
            />
          ))}
        </BentoGrid>

        ==========================================
        END MAGIC UI CODE
        ==========================================
      */}

      {/* Fallback CSS Grid — works without Magic UI */}
      <div className="results-grid">
        {resultsData.map((item, i) => (
          <div
            className={`grid-item ${spanClass[item.size] || ""}`}
            key={item.field}
            style={{ animationDelay: `${0.55 + i * 0.07}s` }}
          >
            <MetricCard field={item.field} value={data[item.field]} size={item.size} />
          </div>
        ))}
      </div>
    </div>
  );
}
