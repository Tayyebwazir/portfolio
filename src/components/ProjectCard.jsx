import Reveal from './Reveal';

export default function ProjectCard({ project, index }) {
  const [title, icon, description, tags, repo, image] = project;
  return <Reveal delay={index * 80}><article className="project-card" data-testid="project-card" style={{ '--delay': `${index * 80}ms` }}><div className={`project-visual ${image ? 'custom-project-image' : ''}`}>{image ? <img src={image} alt={`${title} AI illustration`} /> : <i className={`fa-solid ${icon}`} />}</div><div className="project-body"><h3>{title}</h3><p>{description}</p><div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{repo ? <a className="project-repo" href={repo} target="_blank" rel="noreferrer"><i className="fa-brands fa-github" /> View repository</a> : <span className="project-repo unavailable"><i className="fa-brands fa-github" /> View repository</span>}</div></article></Reveal>;
}
