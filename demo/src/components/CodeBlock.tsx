import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import dark from "react-syntax-highlighter/dist/esm/styles/prism/dark";

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper">
      <SyntaxHighlighter
        language={language}
        style={dark}
        customStyle={{
          margin: 0,
          borderRadius: "8px",
          fontSize: "0.75rem",
          background: "var(--bg-alt)",
        }}
      >
        {children}
      </SyntaxHighlighter>
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
