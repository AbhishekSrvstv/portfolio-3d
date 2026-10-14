// Tiny shared store between the page (DOM) and the 3D scene.
// idx    = how far along the arch corridor we are (0 = first section, 5 = last)
// px/py  = pointer position, -1..1, used for a small camera parallax
export const view = { idx: 0, px: 0, py: 0 };

export const reducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
