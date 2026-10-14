import React from 'react';
import { ABOUT, PROFILE } from '../data.js';

export default function About() {
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="wrap">
        <h2 id="about-title">I build the whole thing, from the screen to the database.</h2>
        {ABOUT.map((p) => (
          <p key={p} className="body">{p}</p>
        ))}
        {PROFILE.cv ? (
          <p>
            <a className="btn" href={PROFILE.cv} download>Download CV</a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
