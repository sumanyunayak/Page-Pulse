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

const iconMap = {
  status: CheckCircle,
  response_time: Clock,
  title: Heading,
  meta_description: FileText,
  h1_count: Hash,
  missing_alt_images: ImageOff,
  word_count: BookOpen,
  canonical: Link,
  open_graph_title: Share2,
  internal_links: ArrowLeftRight,
  external_links: ExternalLink,
};

const labels = {
  status: "HTTP Status",
  response_time: "Response Time",
  title: "Page Title",
  meta_description: "Meta Description",
  h1_count: "H1 Count",
  missing_alt_images: "Missing Alt Images",
  word_count: "Word Count",
  canonical: "Canonical",
  open_graph_title: "Open Graph Title",
  internal_links: "Internal Links",
  external_links: "External Links",
};

export default function MetricCard({ field, value, size = "small" }) {
  const Icon = iconMap[field] || CheckCircle;
  const label = labels[field] || field;
  const isSuccess = field === "status" && value >= 200 && value < 300;

  let displayValue = value;
  if (field === "response_time") displayValue = `${value} ms`;
  if (field === "meta_description" && value === "No Meta Description") {
    displayValue = value;
  }
  if (field === "canonical" && value === "Missing") displayValue = value;

  const clampClass =
    field === "title" ? "metric-value--clamp-2" :
    field === "meta_description" ? "metric-value--clamp-4" : "";

  const sizeClass =
    size === "large" ? "metric-card--large" :
    size === "medium" ? "metric-card--medium" : "";

  const iconSize =
    size === "large" ? 22 :
    size === "medium" ? 21 : 20;

  return (
    <div className={`metric-card ${sizeClass}`}>
      <div className={`metric-icon ${isSuccess ? "success" : ""}`}>
        <Icon size={iconSize} />
      </div>
      <div className="metric-label">{label}</div>
      <div className={`metric-value ${clampClass}`}>{displayValue}</div>
    </div>
  );
}