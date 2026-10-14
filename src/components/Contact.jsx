import React from 'react';
import { PROFILE } from '../data.js';

export default function Contact() {
  return (
    <section id="contact" className="sec contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title">Have a role or a project in mind? Email me.</h2>
        <p>
          <a className="mail" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        </p>
        <p className="body">
          You can also find my code on GitHub and my work history on LinkedIn.
        </p>
        <div className="cta">
          <a className="btn primary" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <p className="foot">
          {PROFILE.city}. Built with React, Vite and three.js.
        </p>
      </div>
    </section>
  );
}
