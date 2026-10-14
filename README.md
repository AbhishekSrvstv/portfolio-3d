# Abhishek Srivastava, 3D portfolio

React + Vite + three.js (react-three-fiber). The background is a corridor of Awadhi-style
arches. Scrolling walks the camera through them, one arch between each section.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # test the production build
```

Needs Node 18 or newer.

## Edit your content

Everything (name, email, links, skills, experience, projects) is in `src/data.js`.

- **CV button:** put your PDF in `public/` and set `cv` in `src/data.js`
  (for example `'/Abhishek-Srivastava-CV.pdf'`). The button only shows when it is set.
- **Email:** check `email` in `src/data.js` is the one you want public.
- **Add a project:** add an object to `PROJECTS` in the same file.
- **Colours:** change the CSS variables at the top of `src/styles.css`. The scene colours
  are the constants at the top of `src/scene/Scene.jsx`.

## Deploy on Vercel (free)

1. Push this folder to a GitHub repo.
2. On Vercel: Add New, Project, import the repo.
3. Framework preset: Vite. Build command `npm run build`, output directory `dist`. Deploy.

## Structure

```
src/
  data.js            all content
  state.js           scroll position shared with the 3D scene
  App.jsx            page + scroll mapping
  scene/Scene.jsx    arches, floor, dust, camera rig
  components/        Nav, Hero, About, Skills, Experience, Projects, Contact
  styles.css         all styling
```

## Notes

- If the browser has no WebGL, the page still works with a plain gradient background.
- `prefers-reduced-motion` is respected: no intro glide, no camera parallax, no flicker.
- On phones the arches sit behind the text, and fewer dust particles are drawn.
