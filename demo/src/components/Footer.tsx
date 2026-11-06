import { ArrowUpRightIcon, GitHubIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
          <div>
            <p className="footer-title">react-dotlottie-player</p>
            <p className="footer-sub">MIT © 2026 Muhammet Andić</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <a
            href="https://github.com/muhammetandic/react-dotlottie-player"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon width={16} height={16} />
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/@mhmmt/react-dotlottie-player"
            target="_blank"
            rel="noreferrer"
          >
            npm
            <ArrowUpRightIcon width={14} height={14} />
          </a>
          <a
            href="https://github.com/muhammetandic/react-dotlottie-player/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            License
          </a>
        </nav>
      </div>
    </footer>
  );
}
