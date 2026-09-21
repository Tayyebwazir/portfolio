# React Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, animated React portfolio presenting Tayyeb Ullah's CV-backed profile, skills, projects, and direct contacts.

**Architecture:** A Vite React single-page app will keep content in a typed-by-convention data module and map it into focused presentational components. A reusable `Reveal` component uses `IntersectionObserver` to add animation classes without a dependency, while CSS owns visual motion and a reduced-motion fallback.

**Tech Stack:** React, Vite, Vitest, React Testing Library, CSS, Font Awesome CDN.

**Spec:** `docs/superpowers/specs/2026-09-19-react-portfolio-design.md`

## Global Constraints

- Keep the dark, AI-focused visual direction and make every layout work at mobile and desktop widths.
- Include exactly seven featured projects: the six CV projects and Multi-Tool Agent & Multi-Agent Platform.
- Use `mailto:ullahtayyeb19@gmail.com` and `https://wa.me/923179818016` for direct contact controls.
- Implement smooth, viewport-triggered animation with a `prefers-reduced-motion` fallback; do not add an animation dependency.
- Keep a visual-only contact form and show an in-page submission message instead of claiming to send mail.

## Review Focus

- Mobile navigation is closed initially and closes after choosing an internal navigation link.
- WhatsApp opens precisely `https://wa.me/923179818016` and email uses the specified Gmail address.
- The rendered project grid contains seven cards, including all six CV project names.
- `IntersectionObserver` absence does not hide portfolio content.
- Users with reduced motion see all content without delayed, looping, or transform-based effects.

---

### Task 1: Scaffold the React application and test environment

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Create: `src/test/setup.js`
- Create: `src/App.test.jsx`

**Interfaces:**
- Produces: `App`, the default component exported from `src/App.jsx`.

- [ ] **Step 1: Write the failing smoke test**

```jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tayyeb Ullah portfolio heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Tayyeb Ullah/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL because the Vite/React application and `App` module do not yet exist.

- [ ] **Step 3: Add Vite, React, Vitest, and the smallest mountable App implementation**

```jsx
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);

// src/App.jsx
export default function App() {
  return <main><h1>Tayyeb Ullah</h1></main>;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- --run src/App.test.jsx`

Expected: PASS.

### Task 2: Model CV content and render skills and projects

**Files:**
- Create: `src/data/portfolio.js`
- Create: `src/components/ProjectCard.jsx`
- Create: `src/components/SkillCategory.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: `App` from Task 1.
- Produces: named `projects` and `skillGroups` arrays, `ProjectCard({ project })`, and `SkillCategory({ group })`.

- [ ] **Step 1: Write failing content tests**

```jsx
test('renders seven featured CV-backed projects', () => {
  render(<App />);
  expect(screen.getAllByTestId('project-card')).toHaveLength(7);
  expect(screen.getByRole('heading', { name: /Pashto Mid-Scale Language Model/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /IntelliHire/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Multi-Tool Agent & Multi-Agent Platform/i })).toBeInTheDocument();
});

test('renders CV skills including LangGraph and Kubernetes', () => {
  render(<App />);
  expect(screen.getByText('LangGraph')).toBeInTheDocument();
  expect(screen.getByText('Kubernetes')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the content tests to verify they fail**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL because the projects and expanded CV skills are not rendered.

- [ ] **Step 3: Add CV data and map it into accessible cards**

```jsx
export const projects = [
  { title: 'Pashto Mid-Scale Language Model (FYP)', tags: ['Python', 'PyTorch', 'HuggingFace', 'QLoRA'], description: 'Fine-tuned conversational Pashto model built on Qwen2.5-7B and roughly 40,000 QA samples.' },
  { title: 'IntelliHire', tags: ['Streamlit', 'Claude', 'Python', 'PDF/DOCX'], description: 'AI recruitment system for job descriptions, resume scoring, shortlisting, interviews, and HR reports.' },
  { title: 'Enterprise RAG System with RBAC & PII Guardrails', tags: ['LangChain', 'Qdrant', 'FastAPI', 'Presidio'], description: 'Production RAG with role-based access, PII detection, monitoring, and a Streamlit frontend.' },
  { title: 'Multi-Modal Disinformation & Verification System', tags: ['NLP', 'Computer Vision', 'PyTorch', 'FastAPI'], description: 'Verifies potential fake news with combined text and image analysis.' },
  { title: 'Multi-Tool Agentic AI System', tags: ['LangChain', 'LangGraph', 'FastAPI', 'Groq'], description: 'Modular tool-using agent for autonomous task execution and decision-making.' },
  { title: 'Market Research Agent with Live Web Search', tags: ['LangChain', 'Groq', 'FastAPI', 'Streamlit'], description: 'Research assistant that collects, analyzes, and summarizes current market intelligence.' },
  { title: 'Multi-Tool Agent & Multi-Agent Platform', tags: ['Agentic AI', 'LangChain', 'LangGraph', 'FastAPI'], description: 'Existing platform that coordinates multiple specialized agents and tools for complex workflows.' },
];

export function ProjectCard({ project }) {
  return <article className="project-card" data-testid="project-card"><h3>{project.title}</h3><p>{project.description}</p>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</article>;
}
```

- [ ] **Step 4: Run the content tests to verify they pass**

Run: `npm test -- --run src/App.test.jsx`

Expected: PASS with all seven projects and CV skill entries.

### Task 3: Add navigation, direct contacts, and form feedback

**Files:**
- Create: `src/components/ContactLink.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: the page sections generated in Task 2.
- Produces: `ContactLink({ href, label, iconClass, newTab })` and an accessible menu toggle.

- [ ] **Step 1: Write failing interaction tests**

```jsx
import userEvent from '@testing-library/user-event';

test('uses the requested WhatsApp and email links', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /WhatsApp/i })).toHaveAttribute('href', 'https://wa.me/923179818016');
  expect(screen.getByRole('link', { name: /Email/i })).toHaveAttribute('href', 'mailto:ullahtayyeb19@gmail.com');
});

test('opens and closes mobile navigation after selecting a link', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /open navigation/i }));
  await user.click(screen.getByRole('link', { name: 'Projects' }));
  expect(screen.getByRole('button', { name: /open navigation/i })).toHaveAttribute('aria-expanded', 'false');
});
```

- [ ] **Step 2: Run the interaction tests to verify they fail**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL because the controls do not exist yet.

- [ ] **Step 3: Implement links, menu state, and client-only form feedback**

```jsx
const [menuOpen, setMenuOpen] = useState(false);
const [formNotice, setFormNotice] = useState('');

<button aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
<a href="#portfolio" onClick={() => setMenuOpen(false)}>Projects</a>
<a aria-label="WhatsApp" href="https://wa.me/923179818016" target="_blank" rel="noreferrer">WhatsApp</a>
<a aria-label="Email" href="mailto:ullahtayyeb19@gmail.com">Email</a>
<form onSubmit={(event) => { event.preventDefault(); setFormNotice('Thanks — please use WhatsApp or email to contact Tayyeb directly.'); }} />
```

- [ ] **Step 4: Run interaction tests to verify they pass**

Run: `npm test -- --run src/App.test.jsx`

Expected: PASS.

### Task 4: Implement reveal motion and responsive visual design

**Files:**
- Create: `src/components/Reveal.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/ProjectCard.jsx`
- Modify: `src/styles.css`
- Modify: `src/test/setup.js`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: React children passed by page sections, project cards, and skill categories.
- Produces: `Reveal({ children, delay = 0, className = '' })`, which sets visible state after intersection or immediately when observer support is unavailable.

- [ ] **Step 1: Write failing motion-resilience tests**

```jsx
test('keeps revealed content available when IntersectionObserver is unavailable', () => {
  const savedObserver = global.IntersectionObserver;
  global.IntersectionObserver = undefined;
  render(<App />);
  expect(screen.getByText('Technical Skills').closest('.reveal')).toHaveClass('is-visible');
  global.IntersectionObserver = savedObserver;
});

test('adds a per-project animation delay', () => {
  render(<App />);
  expect(screen.getAllByTestId('project-card')[1].style.getPropertyValue('--delay')).not.toBe('');
});
```

- [ ] **Step 2: Run the motion tests to verify they fail**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL because no Reveal component or project animation delay exists.

- [ ] **Step 3: Implement `Reveal` and the complete responsive CSS system**

```jsx
export default function Reveal({ children, delay = 0, className = '' }) {
  const [visible, setVisible] = useState(typeof IntersectionObserver === 'undefined');
  const ref = useRef(null);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.15 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</div>;
}
```

```css
.reveal { opacity: 0; transform: translateY(1.25rem); transition: opacity .6s ease var(--delay), transform .6s ease var(--delay); }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; } .reveal { opacity: 1; transform: none; } }
```

- [ ] **Step 4: Run motion tests to verify they pass**

Run: `npm test -- --run src/App.test.jsx`

Expected: PASS.

### Task 5: Verify the delivered portfolio

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: all completed React modules.
- Produces: setup and production-build instructions.

- [ ] **Step 1: Write the failing build verification command into the delivery checklist**

```markdown
## Verification

Run `npm test -- --run` and `npm run build` before deployment.
```

- [ ] **Step 2: Run the full test suite and production build**

Run: `npm test -- --run; npm run build`

Expected: All tests PASS and Vite produces `dist/` without errors.

- [ ] **Step 3: Check responsive rendering manually**

Run: `npm run dev -- --host 127.0.0.1`

Expected: The navigation, project grid, contacts, and animations remain usable at 375px and 1440px widths.

- [ ] **Step 4: Update README with start and build commands**

```markdown
# Tayyeb Ullah Portfolio

Install dependencies with `npm install`, start development with `npm run dev`, run checks with `npm test -- --run`, and create a deployable build with `npm run build`.
```
