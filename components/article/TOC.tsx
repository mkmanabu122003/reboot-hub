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

  // Number h2 headings
  let h2Count = 0;

  return (
    <nav aria-label="目次" className="toc-container">
      <h4 className="font-bold text-sm mb-3 text-primary flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        目次
      </h4>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          if (item.level === 2) h2Count++;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-[13px] leading-[1.8] py-0.5 pl-3 border-l-2 transition-all duration-150 no-underline ${
                  item.level === 3 ? 'ml-4 text-[12px]' : ''
                } ${
                  activeId === item.id
                    ? 'text-primary border-primary font-bold'
                    : 'text-text-muted border-transparent hover:text-primary hover:border-primary'
                }`}
              >
                {item.level === 2 ? `${h2Count}. ${item.text}` : `・${item.text}`}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TOC;
