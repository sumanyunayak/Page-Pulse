import { Globe } from "lucide-react";

const features = [
  { label: "Fast", icon: "⚡" },
  { label: "SEO Metrics", icon: "📈" },
  { label: "Live Analysis", icon: "🌐" },
];

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Globe size={36} />
      </div>
      <h2 className="empty-state-title">Analyze any webpage instantly</h2>
      <p className="empty-state-subtitle">
        Enter a URL to generate an SEO overview including metadata, headings,
        links, accessibility and performance indicators.
      </p>
      <div className="empty-state-chips">
        {features.map((f) => (
          <span key={f.label} className="empty-state-chip">
            {f.icon} {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}
