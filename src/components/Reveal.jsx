import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0, className = '' }) {
  const [visible, setVisible] = useState(typeof IntersectionObserver === 'undefined');
  const ref = useRef(null);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--delay': `${delay}ms` }}>{children}</div>;
}
