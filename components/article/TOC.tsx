'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  html: string;
}

function extractHeadings(html: string): TOCItem[] {
  const regex = /<(h[23])\s+id="([^"]*)"[^>]*>(.*?)<\/\1>/gi;
  const items: TOCItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tagText = match[3].replace(/<[^>]*>/g, '');
    items.push({
      id: match[2],
      text: tagText,
      level: parseInt(match[1][1]),
    });
  }
  return items;
}

const TOC: React.FC<TOCProps> = ({ html }) => {
  const [activeId, setActiveId] = useState('');
  const items = extractHeadings(html);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="目次" className="text-body-sm">
      <h4 className="font-bold mb-3 text-text">目次</h4>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${item.id}`}
              className={`block py-1 transition-colors ${
                activeId === item.id
                  ? 'text-primary font-bold'
                  : 'text-text-muted hover:text-primary'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOC;
