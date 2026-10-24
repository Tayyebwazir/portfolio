import { useEffect, useState } from 'react';
import { experience, projects, skills } from './data/portfolio';
import ProjectCard from './components/ProjectCard';
import Reveal from './components/Reveal';
import SkillCategory from './components/SkillCategory';
import TechnologyStack from './components/TechnologyStack';
import SkillMarquee from './components/SkillMarquee';

const nav = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['experience', 'Experience'], ['projects', 'Projects'], ['contact', 'Contact']];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <>
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-wrap">
        <a className="logo" href="#home" onClick={closeMenu}>TU<span>.</span></a>
        <button className="menu-button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} /></button>
        <nav className={menuOpen ? 'open' : ''}>{nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}</nav>
      </div>
    </header>
    <main>
      <section id="home" className="hero">
        <div className="container hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow"><i className="fa-solid fa-sparkles" /> AI / ML Engineer</p>
            <h1>Tayyeb <span>Ullah</span></h1>
            <h2>Building intelligent systems for real-world impact.</h2>
            <p className="lede">AI Engineer specializing in production-grade LLM applications, RAG pipelines, and multi-agent orchestration.</p>
            <div className="actions"><a className="button primary" href="#projects">View projects <i className="fa-solid fa-arrow-right" /></a><a className="button ghost" href="#contact">Let's talk</a></div>
            <div className="socials"><a aria-label="GitHub" href="https://github.com/Tayyebwazir" target="_blank" rel="noreferrer"><i className="fa-brands fa-github" /></a><a aria-label="LinkedIn" href="https://linkedin.com/in/tayyeb-ullah" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in" /></a><a aria-label="Email" href="mailto:ullahtayyeb19@gmail.com"><i className="fa-solid fa-envelope" /></a></div>
          </Reveal>
          <Reveal delay={130} className="portrait-wrap"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><img src="/tayyeb pic (2) (2).png" alt="Tayyeb Ullah" /><div className="float-card"><i className="fa-solid fa-brain" /> RAG & Agents</div></Reveal>
        </div>
      </section>
      <section id="about" className="section">
        <div className="container narrow"><Reveal>
          <p className="section-kicker">ABOUT</p><h2 className="section-title">Engineering AI that is useful, responsible, and ready to ship.</h2>
          <div className="about-card">
            <p>Results-driven AI Engineer with hands-on expertise across Machine Learning, Deep Learning, NLP, and Agentic AI systems. I design and deploy scalable LLM applications, including fine-tuned models, Retrieval-Augmented Generation pipelines, and multi-agent frameworks.</p>
            <p>With LangChain, LangGraph, HuggingFace, FastAPI, MLOps, and cloud deployment experience, I translate complex research into practical automation that creates measurable business value.</p>
            <div className="education"><p className="education-label">EDUCATION</p><h3>BS Computer Software Engineering</h3><p>University of Engineering and Technology Mardan</p></div>
            <div className="contact-row"><a href="mailto:ullahtayyeb19@gmail.com"><i className="fa-solid fa-envelope" /> ullahtayyeb19@gmail.com</a><a href="https://wa.me/923179818016" target="_blank" rel="noreferrer" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp" /> +92 317 9818016</a><span><i className="fa-solid fa-location-dot" /> KPK, Pakistan</span></div>
          </div>
        </Reveal></div>
      </section>
      <section id="experience" className="section">
        <div className="container narrow"><Reveal><p className="section-kicker">EXPERIENCE</p><h2 className="section-title">Professional Journey</h2></Reveal>
          <div className="timeline">{experience.map(([date, role, company, description], index) => <Reveal key={role} delay={index * 90}><article className="timeline-item"><span className="dot" /><p className="date">{date}</p><h3>{role}</h3><strong>{company}</strong><p>{description}</p></article></Reveal>)}</div>
        </div>
      </section>
      <TechnologyStack />
      <SkillMarquee />
      <section id="skills" className="section shade">
        <div className="container"><Reveal><p className="section-kicker">EXPERTISE</p><h2 className="section-title">Technical Skills</h2></Reveal><div className="skills-grid">{skills.map((skill, index) => <SkillCategory key={skill[0]} skill={skill} index={index} />)}</div></div>
      </section>
      <section id="projects" className="section shade">
        <div className="container"><Reveal><p className="section-kicker">SELECTED WORK</p><h2 className="section-title">Featured Projects</h2></Reveal><div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project[0]} project={project} index={index} />)}</div></div>
      </section>
      <section id="contact" className="section">
        <div className="container"><Reveal>
          <div className="contact-panel contact-details-layout">
            <div className="contact-details">
              <p className="section-kicker">GET IN TOUCH</p>
              <h2>Contact details</h2>
              <p>Reach me directly or connect through my professional profiles.</p>
              <div className="contact-detail-list">
                <a className="contact-detail" href="mailto:ullahtayyeb19@gmail.com"><span className="contact-detail-icon"><i className="fa-solid fa-envelope" /></span><span><small>Email</small><strong>ullahtayyeb19@gmail.com</strong></span></a>
                <a className="contact-detail" href="https://wa.me/923179818016" target="_blank" rel="noreferrer"><span className="contact-detail-icon"><i className="fa-brands fa-whatsapp" /></span><span><small>Phone / WhatsApp</small><strong>+92 317 9818016</strong></span></a>
                <a className="contact-detail" href="https://github.com/Tayyebwazir" target="_blank" rel="noreferrer"><span className="contact-detail-icon"><i className="fa-brands fa-github" /></span><span><small>GitHub</small><strong>Tayyebwazir</strong></span><i className="fa-solid fa-arrow-up-right-from-square contact-detail-arrow" /></a>
                <a className="contact-detail" href="https://linkedin.com/in/tayyeb-ullah" target="_blank" rel="noreferrer"><span className="contact-detail-icon"><i className="fa-brands fa-linkedin-in" /></span><span><small>LinkedIn</small><strong>LinkedIn profile</strong></span><i className="fa-solid fa-arrow-up-right-from-square contact-detail-arrow" /></a>
              </div>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); setNotice('Thanks! Please use WhatsApp or email to contact Tayyeb directly.'); }}>
              <label>Name<input required name="name" /></label>
              <label>Email<input required type="email" name="email" /></label>
              <label>Message<textarea required name="message" rows="4" /></label>
              <button className="button primary" type="submit">Send message <i className="fa-solid fa-paper-plane" /></button>
              {notice && <p role="status" className="form-notice">{notice}</p>}
            </form>
          </div>
        </Reveal></div>
      </section>
    </main>
    <footer>© {new Date().getFullYear()} Tayyeb Ullah · Built for intelligent systems.</footer>
  </>;
}
