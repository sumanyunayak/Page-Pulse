import { GitBranch } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-divider" />
      <p className="footer-text">
        Built for the{" "}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Digital Heroes Software Development Internship Task
        </a>
      </p>
      <p className="footer-tech">React &middot; Django REST Framework &middot; Render</p>
      <a
        href="https://github.com/sumanyunayak/Page-Pulse"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
        aria-label="View source code on GitHub"
      >
        <GitBranch size={18} />
        GitHub Repository
      </a>
    </footer>
  );
}