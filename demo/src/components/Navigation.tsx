import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="nav-brand">
          <span className="nav-org">@mhmmt</span>/<span className="nav-package">react-dotlottie-player</span>
        </div>
        
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? "hamburger-line active" : "hamburger-line"}></span>
          <span className={isOpen ? "hamburger-line active" : "hamburger-line"}></span>
          <span className={isOpen ? "hamburger-line active" : "hamburger-line"}></span>
        </button>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#installation" onClick={() => setIsOpen(false)}>Installation</a>
          <a href="#usage" onClick={() => setIsOpen(false)}>Usage</a>
          <a href="#demos" onClick={() => setIsOpen(false)}>Demos</a>
          <a href="#props" onClick={() => setIsOpen(false)}>Props</a>
        </div>
      </div>
    </nav>
  );
}
