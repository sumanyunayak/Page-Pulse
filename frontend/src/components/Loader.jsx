import { useState, useEffect } from "react";

const messages = [
  "Checking website availability...",
  "Fetching HTML document...",
  "Extracting metadata...",
  "Scanning headings...",
  "Checking accessibility...",
  "Analyzing SEO signals...",
  "Counting internal links...",
  "Generating report...",
];

export default function Loader({ revealing }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`loader ${revealing ? "loader--exiting" : ""}`}>
      <div className="loader-ring" />
      <div className="loader-status">
        <p className="loader-message" key={index}>
          {messages[index]}
        </p>
      </div>
      <div className="loader-progress">
        <div className="loader-progress-bar" />
      </div>
    </div>
  );
}
