# React Portfolio Redesign

## Goal

Convert Tayyeb Ullah's static portfolio into a responsive React single-page portfolio that presents his AI/ML experience, CV-backed skills, and project work with accessible, motion-rich interactions.

## Scope

- Replace the static `index.html` and inline JavaScript with a React application built using Vite.
- Preserve the existing dark blue, AI-focused visual direction while improving structure, responsive navigation, and accessibility.
- Add the CV professional summary to the About section.
- Present CV skills in reusable categories: languages; AI/ML; frameworks; generative AI; frontend; deploy/cloud; databases; tools; and spoken languages.
- Display seven featured project cards: the first six projects from the CV plus the existing Multi-Tool Agent & Multi-Agent Platform project.
- Use viewport-triggered reveal animations for sections, staggered reveals for cards/timeline items, hover motion on cards and skill tags, and a reduced-motion fallback.
- Add direct contact links: `mailto:ullahtayyeb19@gmail.com` and a WhatsApp button/icon linking to `https://wa.me/923179818016`.

## Architecture

- `src/main.jsx` mounts the React application.
- `src/App.jsx` owns page layout and interaction state for the mobile menu and sticky header.
- `src/data/portfolio.js` provides project, skill, experience, and contact data.
- Reusable `Section`, `Reveal`, `ProjectCard`, `SkillCategory`, and `ContactLink` components keep presentation separated from content.
- CSS provides design tokens, responsive layout, transitions, animation keyframes, and `prefers-reduced-motion` safeguards. No animation library is required.

## Content

Projects will be: Pashto Mid-Scale Language Model (FYP), IntelliHire, Enterprise RAG System with RBAC & PII Guardrails, Multi-Modal Disinformation & Verification System, Multi-Tool Agentic AI System, Market Research Agent with Live Web Search, and Multi-Tool Agent & Multi-Agent Platform.

The About summary and skill names will match the supplied CV, with concise project card descriptions derived from the CV bullets.

## User Interactions

- Navigation anchors smoothly scroll to page sections; the mobile navigation opens and closes reliably.
- The WhatsApp contact control opens WhatsApp’s direct chat URL in a new safe tab.
- Email controls use `mailto:` for the supplied Gmail address.
- The form remains a visual contact form and reports a clear in-page message on submit because no mail delivery backend is in scope.

## Testing and Verification

- Component tests will verify project data rendering, contact URLs, mobile navigation behavior, and reduced-motion-friendly markup.
- Production build will be run to catch compile errors.
- The generated app will be checked at desktop and mobile viewport sizes.

## Out of Scope

- A live contact form backend, analytics, CMS, project deployment, and replacing missing project images with generated assets.
