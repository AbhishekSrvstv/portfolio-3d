import React from 'react';
import { EXPERIENCE } from '../data.js';

export default function Experience() {
  return (
    <section id="experience" className="sec" aria-labelledby="exp-title">
      <div className="wrap wide">
        <h2 id="exp-title">Where I have worked and studied</h2>
        <ol className="timeline">
          {EXPERIENCE.map((e) => (
            <li key={e.title + e.when} className="t-item">
              <p className="t-when">{e.when}</p>
              <div className="t-body">
                <h3>{e.title}</h3>
                <p className="t-place">{e.place}</p>
                {e.points.length > 0 ? (
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
