import Reveal from './Reveal';

export default function SkillCategory({ skill, index }) {
  const [title, icon, items, imagePath] = skill;
  const image = imagePath || (title === 'Languages Spoken' ? '/skill-spoken.png' : undefined);
  return <Reveal delay={index * 70}><article className="skill-card">{image && <img className="skill-image" src={image} alt={`${title} skill illustration`} />}<h3><i className={`fa-solid ${icon}`} /> {title}</h3><div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div></article></Reveal>;
}
