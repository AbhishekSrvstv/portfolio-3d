import React, { useState } from 'react';
import { SECTIONS } from '../data.js';

function ArchIcon() {
  return (
    <svg className="brand-icon" viewBox="0 0 64 64" width="26" height="26" aria-hidden="true">
      <path
        d="M16 54V30C16 20 26 14 32 8c6 6 16 12 16 22v24h-8V31c0-6-4-10-8-14-4 4-8 8-8 14v23z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const links = SECTIONS.filter((s) => s.id !== 'top');

  return (
    <header className="nav">
      <a className="brand" href="#top" onClick={() => setOpen(false)}>
        <ArchIcon />
        <span>Abhishek</span>
      </a>
      <button
        className="menu-btn"
        type="button"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="nav-links" className={'links' + (open ? ' open' : '')} aria-label="Main">
        {links.map((l) => (
          <a
            key={l.id}
            href={'#' + l.id}
            className={active === l.id ? 'active' : ''}
            aria-current={active === l.id ? 'true' : undefined}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
