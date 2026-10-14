import React from 'react';
import { SKILLS } from '../data.js';

export default function Skills() {
  return (
    <section id="skills" className="sec" aria-labelledby="skills-title">
      <div className="wrap wide">
        <h2 id="skills-title">What I work with</h2>
        <div className="skill-grid">
          {SKILLS.map((g) => (
            <div key={g.group} className="skill-group">
              <h3>{g.group}</h3>
              <ul className="pills">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
