import { useState } from "react";
import { ArrowUpRightIcon, GitHubIcon } from "./Icons";

const links = [
  { href: "#features", label: "Features" },
  { href: "#installation", label: "Installation" },
  { href: "#usage", label: "Usage" },
  { href: "#demos", label: "Demos" },
  { href: "#props", label: "Props" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <nav className="nav">
      <div className="nav-content">
        <a className="nav-brand" href="#top" onClick={close} aria-label="React DotLottie Player home">
          <span className="brand-mark" aria-hidden>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-scope">@mhmmt/</span>react-dotlottie-player
          </span>
        </a>

        <button
          type="button"
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div id="primary-navigation" className={`nav-links ${isOpen ? "open" : ""}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <a
            className="nav-mobile-cta"
            href="https://github.com/muhammetandic/react-dotlottie-player"
            target="_blank"
            rel="noreferrer"
            onClick={close}
          >
            <GitHubIcon width={16} height={16} />
            GitHub
          </a>
        </div>

        <div className="nav-actions">
          <a
            className="icon-link"
            href="https://github.com/muhammetandic/react-dotlottie-player"
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
          >
            <GitHubIcon width={18} height={18} />
          </a>
          <a
            className="btn btn-ghost btn-sm"
            href="https://www.npmjs.com/package/@mhmmt/react-dotlottie-player"
            target="_blank"
            rel="noreferrer"
          >
            npm
            <ArrowUpRightIcon width={14} height={14} />
          </a>
        </div>
      </div>
    </nav>
  );
}
