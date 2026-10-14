// All portfolio content lives here. Edit this file to update the site.

export const PROFILE = {
  name: 'Abhishek Srivastava',
  role: 'Full Stack Developer',
  city: 'Lucknow, India',
  email: 'Abhisrivastav08@gmail.com',
  github: 'https://github.com/AbhishekSrvstv',
  linkedin: 'https://www.linkedin.com/in/abhisrvstv1632/',
  // The CV PDF lives in the /public folder. The "Download CV" button shows when this is set.
  cv: '/Abhishek-Srivastava-CV.pdf',
};

export const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const ABOUT = [
  'I am a full stack developer in Lucknow. At Websofy Software Pvt. Ltd. I build React frontends, REST APIs and the MySQL and MongoDB databases behind them.',
  'I finished my B.Tech in Information Technology at ITM Lucknow (AKTU) in 2026 and did a three-month full stack internship at Scotek. I like owning a feature from the screen to the database.',
];

export const SKILLS = [
  {
    group: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express.js', 'PHP', 'Laravel', 'REST APIs', 'MVC'],
  },
  {
    group: 'Databases',
    items: ['MongoDB', 'MySQL'],
  },
  {
    group: 'Tools and basics',
    items: ['Git', 'GitHub', 'Vercel', 'VS Code', 'OOP', 'C', 'Python (basic)'],
  },
];

export const EXPERIENCE = [
  {
    when: 'Jan 2026 to now',
    title: 'Full Stack Developer',
    place: 'Websofy Software Pvt. Ltd.',
    points: [
      'Build web application features across the frontend and backend with HTML, CSS, JavaScript, React, Node.js and MySQL.',
      'Turn business requirements into working features, with usability, performance and scalability in mind.',
      'Build and connect REST APIs so data moves cleanly between systems.',
    ],
  },
  {
    when: '3 months',
    title: 'Full Stack Intern Trainee',
    place: 'Scotek Private Limited',
    points: ['Hands-on training in frontend, backend and database development.'],
  },
  {
    when: 'Mar 2023 to Mar 2026',
    title: 'B.Tech, Information Technology',
    place: 'Institute of Technology & Management, Lucknow (AKTU)',
    points: [],
  },
];

export const PROJECTS = [
  {
    title: 'TripNest Tours & Travels',
    text: 'A travel site with destinations, packages, hotels and testimonials served from a Laravel API, plus a booking popup and a spam-protected contact form.',
    tags: ['React', 'Laravel', 'MySQL'],
    href: 'https://github.com/AbhishekSrvstv',
    cta: 'On GitHub',
  },
  {
    title: 'Websofy Website',
    text: 'A responsive multi-page business website (Home, About Us, Services), deployed on Vercel.',
    tags: ['React', 'Vite'],
    href: 'https://websofy.vercel.app',
    cta: 'Live site',
  },
  {
    title: 'Smart Library System',
    text: 'Tracks book inventory and user transactions, backed by a database, with an interface that is easy to use.',
    tags: ['Database app'],
    href: 'https://library-psi-umber.vercel.app/',
    cta: 'Live site',
  },
  {
    title: 'Headphone Product Showcase',
    text: 'A responsive product showcase built from reusable React components.',
    tags: ['React', 'Vite'],
    href: 'https://headphone-bice.vercel.app/',
    cta: 'Live site',
  },
  {
    title: 'Fruit Juice Website',
    text: 'A responsive website with an interactive interface, tuned for performance.',
    tags: ['React', 'Vite', 'Tailwind CSS'],
    href: 'https://fruit-juice-beta.vercel.app/',
    cta: 'Live site',
  },
  {
    title: 'Working Calculator',
    text: 'A calculator for basic arithmetic with a clean, simple interface.',
    tags: ['HTML', 'CSS'],
    href: 'https://calculator-puce-psi.vercel.app/',
    cta: 'Live site',
  },
];