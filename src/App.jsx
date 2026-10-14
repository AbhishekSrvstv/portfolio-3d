import React, { Suspense, lazy, useEffect, useState } from 'react';
import { SECTIONS } from './data.js';
import { view } from './state.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

// three.js is loaded on its own so the text can paint first.
const Scene = lazy(() => import('./scene/Scene.jsx'));

const LAST = SECTIONS.length - 1;

export default function App() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    let tops = [];
    let maxScroll = 0;
    let current = 'top';

    const measure = () => {
      tops = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    };

    // Turns the scroll position into "how far along the corridor are we".
    const update = () => {
      const y = window.scrollY;
      let idx;
      if (y >= tops[LAST]) {
        const span = Math.max(1, maxScroll - tops[LAST]);
        idx = LAST + 0.85 * Math.min(1, (y - tops[LAST]) / span);
      } else {
        let i = 0;
        while (i < LAST - 1 && y >= tops[i + 1]) i++;
        const seg = Math.max(1, tops[i + 1] - tops[i]);
        idx = i + Math.min(1, Math.max(0, (y - tops[i]) / seg));
      }
      view.idx = idx;

      const id = SECTIONS[Math.min(LAST, Math.round(idx))].id;
      if (id !== current) {
        current = id;
        setActive(id);
      }
    };

    const onPointer = (e) => {
      view.px = (e.clientX / window.innerWidth) * 2 - 1;
      view.py = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(document.body);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      window.removeEventListener('pointermove', onPointer);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Nav active={active} />
      <main className="page">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
