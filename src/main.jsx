import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './motion.css';
import './upgrades.css';
import './theme.css';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);

// Keep the CV action next to GitHub, LinkedIn, and email in the hero controls.
setTimeout(() => {
  const cvButton = document.querySelector('.cv-download');
  const socialRow = document.querySelector('.socials');
  if (cvButton && socialRow) socialRow.append(cvButton);
  const ragButton = document.querySelector('.rag-assistant');
  const actionRow = document.querySelector('.actions');
  if (ragButton && actionRow) actionRow.append(ragButton);
  const contactForm = document.querySelector('.contact-panel form');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = new FormData(contactForm);
    const subject = `Portfolio contact from ${values.get('name') || 'a visitor'}`;
    const body = `Name: ${values.get('name') || ''}\nEmail: ${values.get('email') || ''}\n\n${values.get('message') || ''}`;
    window.location.href = `mailto:ullahtayyeb19@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, true);
  const assistantShell = document.querySelector('.assistant-shell');
  ragButton?.addEventListener('click', (event) => {
    event.preventDefault();
    if (!assistantShell) return;
    document.body.classList.add('assistant-mode');
  });
}, 150);
