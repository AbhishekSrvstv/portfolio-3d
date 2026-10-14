import React from 'react';
import { PROFILE } from '../data.js';

export default function Hero() {
  return (
    <section id="top" className="sec hero" aria-labelledby="hero-title">
      <div className="wrap">
        <p className="status">
          <span className="dot" aria-hidden="true" />
          Open to new opportunities
        </p>
        <h1 id="hero-title" aria-label={PROFILE.name}>
          <span className="line" aria-hidden="true"><span>Abhishek</span></span>
          <span className="line" aria-hidden="true"><span>Srivastava</span></span>
        </h1>
        <p className="lede">
          Full stack developer in Lucknow. I build web apps with React and Node.js, and backends
          with Laravel.
        </p>
        <div className="cta">
          <a className="btn primary" href="#projects">See my projects</a>
          <a className="btn" href="#contact">Get in touch</a>
        </div>
      </div>
      <p className="hint">Scroll to walk through the arches</p>
    </section>
  );
}
