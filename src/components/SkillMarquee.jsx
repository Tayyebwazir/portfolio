import { skills } from '../data/portfolio';

const allSkills = skills.flatMap(([category, icon, items]) => items.map((name) => ({ name, icon, category })));
const rows = [0, 1, 2].map((row) => allSkills.filter((_, index) => index % 3 === row));

export default function SkillMarquee() {
  return <section className="skill-marquee-section" aria-label="Moving skills list">
    <div className="container">
      <p className="skill-marquee-label">EXPLORE THE TOOLKIT</p>
    </div>
    <div className="skill-marquee-rows">
      {rows.map((row, rowIndex) => <div className={`skill-marquee-row row-${rowIndex + 1}`} key={rowIndex}>
        <div className="skill-marquee-track">
          {[...row, ...row].map(({ name, icon, category }, index) => <article className="skill-marquee-card" key={`${category}-${name}-${index}`} title={`${name} · ${category}`}>
            <i className={`fa-solid ${icon}`} aria-hidden="true" />
            <span>{name}</span>
          </article>)}
        </div>
      </div>)}
    </div>
  </section>;
}
