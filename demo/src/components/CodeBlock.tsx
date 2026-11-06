import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import { useCopy } from "../hooks/useCopy";
import { CheckIcon, CopyIcon } from "./Icons";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("tsx", tsx);

interface CodeBlockProps {
  children: string;
  language?: string;
}

export function CodeBlock({ children, language = "tsx" }: CodeBlockProps) {
  const { copied, copy } = useCopy();

  return (
    <div className="code-block">
      <div className="code-block-head">
        <span className="code-lang">{language}</span>
        <button
          type="button"
          className="copy-btn"
          onClick={() => copy(children)}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <CheckIcon width={14} height={14} /> : <CopyIcon width={14} height={14} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1.1rem 1.25rem",
          background: "transparent",
          fontSize: "0.82rem",
          lineHeight: 1.75,
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-mono)",
            fontSize: "inherit",
          },
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
