export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageGradient: string;
  github: string;
  live: string;
}

export interface Tech {
  name: string;
  description: string;
  level: number;
  icon: string;
  color: string;
}

export const profile = {
  name: 'Hamza Boudi',
  role: 'Software Engineer',
  tagline: 'I build modern web apps — fast, scalable & beautiful.',
  bio: [
    'I’m Hamza Boudi, a Software Engineer focused on building modern web applications with JavaScript and TypeScript.',
    'I work across the full stack — from React interfaces with Tailwind to Node + Express APIs backed by MongoDB and PostgreSQL. I care about clean architecture, performance, and shipping products people love to use.',
  ],
  stats: [
    { value: 15, suffix: '+', label: 'Projects built' },
    { value: 6, suffix: '', label: 'Core technologies' },
    { value: 100, suffix: '%', label: 'Commitment' },
  ],
  // TODO: replace with your real links
  resume: '/Hamza-Boudi-CV.pdf',
  whatsapp: 'https://wa.me/10000000000?text=Hi%20Hamza%2C%20I%20saw%20your%20portfolio!',
  socials: {
    facebook: 'https://facebook.com/hamzaboudi',
    github: 'https://github.com/hamzaboudissaben-star',
    linkedin: 'https://linkedin.com/in/hamzaboudi',
    instagram: 'https://instagram.com/hamzaboudi',
    email: 'mailto:hello@hamzaboudi.dev',
    phone: 'tel:+10000000000',
    phoneDisplay: '+1 00 000 0000',
  },
};

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'MERN E-Commerce Platform',
    description: 'Full-stack shop with cart, auth, Stripe payments and admin dashboard.',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
    imageGradient: 'from-cyan-500 via-blue-600 to-violet-600',
    github: '#',
    live: '#',
  },
  {
    id: 'p2',
    title: 'Realtime Chat App',
    description: 'Socket-powered chat with rooms, typing indicators and file sharing.',
    tags: ['React', 'Node', 'Express', 'MongoDB'],
    imageGradient: 'from-fuchsia-500 via-purple-600 to-indigo-600',
    github: '#',
    live: '#',
  },
  {
    id: 'p3',
    title: 'SaaS Analytics Dashboard',
    description: 'PostgreSQL + Prisma analytics with charts, filters and exports.',
    tags: ['PostgreSQL', 'Express', 'React', 'Tailwind'],
    imageGradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    github: '#',
    live: '#',
  },
  {
    id: 'p4',
    title: 'Task Manager API + UI',
    description: 'Kanban board with drag & drop, JWT auth and team workspaces.',
    tags: ['Node', 'MongoDB', 'React', 'Tailwind'],
    imageGradient: 'from-amber-500 via-orange-600 to-rose-600',
    github: '#',
    live: '#',
  },
  {
    id: 'p5',
    title: 'Blog + CMS Engine',
    description: 'Markdown blog with headless CMS, SEO and image optimization.',
    tags: ['PostgreSQL', 'Node', 'React', 'Express'],
    imageGradient: 'from-sky-500 via-indigo-600 to-violet-700',
    github: '#',
    live: '#',
  },
  {
    id: 'p6',
    title: 'Portfolio Starter Kit',
    description: 'This Stitch-modern GSAP portfolio template — dark/light, animated.',
    tags: ['React', 'Tailwind', 'GSAP', 'Vite'],
    imageGradient: 'from-violet-500 via-purple-600 to-fuchsia-600',
    github: '#',
    live: '#',
  },
];

export const techStack: Tech[] = [
  { name: 'MongoDB', description: 'Flexible NoSQL docs, aggregation & Atlas.', level: 90, icon: '🍃', color: 'from-green-500 to-emerald-600' },
  { name: 'Express', description: 'REST APIs, middleware, auth & validation.', level: 92, icon: '⚡', color: 'from-neutral-500 to-neutral-700' },
  { name: 'React', description: 'SPA, hooks, GSAP animations & Tailwind UI.', level: 95, icon: '⚛️', color: 'from-cyan-500 to-blue-600' },
  { name: 'Node.js', description: 'Scalable servers, sockets & background jobs.', level: 90, icon: '🟢', color: 'from-lime-500 to-green-600' },
  { name: 'PostgreSQL', description: 'Relational modeling, joins & Prisma ORM.', level: 85, icon: '🐘', color: 'from-sky-500 to-indigo-600' },
  { name: 'Tailwind', description: 'Stitch-modern design systems, dark mode.', level: 96, icon: '🎨', color: 'from-teal-400 to-cyan-600' },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Journey', href: '#experience' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export interface Experience {
  period: string;
  role: string;
  place: string;
  desc: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  gradient: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Hamza shipped our dashboard ahead of schedule — clean API, fast UI, zero drama.',
    name: 'Client A',
    role: 'SaaS Founder',
    initials: 'CA',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    quote: 'Great MERN work. Auth, PostgreSQL modeling and Tailwind polish were top notch.',
    name: 'Client B',
    role: 'Product Manager',
    initials: 'CB',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
  {
    quote: 'Communication was clear and the GSAP animations made our site feel alive.',
    name: 'Client C',
    role: 'Startup CTO',
    initials: 'CC',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    quote: 'Reliable, fast and detail-oriented. Our store conversion went up after the rebuild.',
    name: 'Client D',
    role: 'E-commerce Owner',
    initials: 'CD',
    gradient: 'from-amber-500 to-rose-600',
  },
];

export const experience: Experience[] = [
  {
    period: '2024 — Now',
    role: 'Full-Stack Software Engineer',
    place: 'Freelance / Remote',
    desc: 'Building modern MERN + PostgreSQL web apps for clients — auth, dashboards, payments and GSAP interfaces.',
    tags: ['React', 'Node', 'PostgreSQL'],
  },
  {
    period: '2023 — 2024',
    role: 'MERN Developer',
    place: 'SaaS Projects',
    desc: 'Shipped analytics dashboards, REST APIs with Express, Prisma + PostgreSQL modeling and Tailwind design systems.',
    tags: ['Express', 'PostgreSQL', 'Tailwind'],
  },
  {
    period: '2022 — 2023',
    role: 'Frontend Developer',
    place: 'Web Studio',
    desc: 'Built responsive React interfaces, reusable components, animations with GSAP and performance optimization.',
    tags: ['React', 'GSAP', 'TypeScript'],
  },
  {
    period: '2021 — 2022',
    role: 'Started Coding Journey',
    place: 'Self-taught',
    desc: 'JavaScript foundations, MongoDB + Node APIs, first full-stack projects and open-source contributions.',
    tags: ['JavaScript', 'MongoDB', 'Node'],
  },
];
