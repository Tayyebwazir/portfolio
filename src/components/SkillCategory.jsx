import Reveal from './Reveal';

export default function SkillCategory({ skill, index }) {
  const [title, icon, items] = skill;
  return <Reveal delay={index * 70}><article className="skill-card"><h3><i className={`fa-solid ${icon}`} /> {title}</h3><div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div></article></Reveal>;
}
