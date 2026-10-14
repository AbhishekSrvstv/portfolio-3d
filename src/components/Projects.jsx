import React from 'react';
import { PROJECTS } from '../data.js';

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <path
        d="M5 3h8v8M13 3 3 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="sec" aria-labelledby="projects-title">
      <div className="wrap wide">
        <h2 id="projects-title">Things I have built</h2>
        <ul className="projects">
          {PROJECTS.map((p) => (
            <li key={p.title}>
              <a
                className="project"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title}: ${p.cta} (opens in a new tab)`}
              >
                <div className="p-main">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <ul className="tags" aria-label="Built with">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <span className="go">
                  {p.cta}
                  <ExternalIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
