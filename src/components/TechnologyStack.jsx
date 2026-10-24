import { useRef, useState } from 'react';
import Reveal from './Reveal';
import { skills } from '../data/portfolio';

const technologyItems = skills.flatMap(([category, icon, items]) => items.map((name) => ({ name, icon, category })));
const goldenAngle = Math.PI * (3 - Math.sqrt(5));

function spherePoint(index, total) {
  const y = 1 - (index / (total - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = goldenAngle * index;
  return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius };
}

export default function TechnologyStack() {
  const [rotation, setRotation] = useState({ x: -10, y: 18 });
  const drag = useRef(null);

  const startDrag = (event) => {
    drag.current = { x: event.clientX, y: event.clientY, rotation };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    setRotation({ x: Math.max(-40, Math.min(40, drag.current.rotation.x - dy * 0.18)), y: drag.current.rotation.y + dx * 0.25 });
  };
  const endDrag = () => { drag.current = null; };

  return <section id="technology" className="section technology-section">
    <div className="container">
      <Reveal>
        <p className="section-kicker">MY TOOLKIT</p>
        <h2 className="technology-title">Technology Stack</h2>
        <p className="technology-lede">Every skill in one interactive 3D sphere.</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="technology-stage" aria-label="Interactive 3D technology sphere">
          <div className="technology-sphere-wrap" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
            <div className="technology-sphere-auto">
              <div className="technology-sphere" style={{ '--sphere-x': `${rotation.x}deg`, '--sphere-y': `${rotation.y}deg` }}>
              {technologyItems.map(({ name, icon, category }, index) => {
                const point = spherePoint(index, technologyItems.length);
                return <div className="technology-chip" key={`${category}-${name}-${index}`} title={`${name} · ${category}`} style={{ '--x': `${point.x * 215}px`, '--y': `${point.y * 215}px`, '--z': `${point.z * 215}px` }}>
                  <i className={`fa-solid ${icon}`} aria-hidden="true" />
                  <span>{name}</span>
                </div>;
              })}
              </div>
            </div>
          </div>
          <p className="technology-hint"><i className="fa-solid fa-arrows-left-right" /> Drag the sphere to explore every skill.</p>
        </div>
      </Reveal>
    </div>
  </section>;
}
