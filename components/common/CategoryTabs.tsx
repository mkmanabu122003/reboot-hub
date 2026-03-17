'use client';

import { CATEGORIES, CategorySlug } from '@/lib/constants';

interface CategoryTabsProps {
  activeCategory: CategorySlug | 'all';
  onCategoryChange: (category: CategorySlug | 'all') => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-body-sm transition-colors ${
          activeCategory === 'all'
            ? 'bg-primary text-white'
            : 'bg-bg-secondary text-text-muted hover:bg-border'
        }`}
      >
        すべて
      </button>
      {Object.entries(CATEGORIES).map(([slug, cat]) => (
        <button
          key={slug}
          onClick={() => onCategoryChange(slug as CategorySlug)}
          className={`px-4 py-2 rounded-full text-body-sm transition-colors ${
            activeCategory === slug
              ? 'text-white'
              : 'bg-bg-secondary text-text-muted hover:bg-border'
          }`}
          style={activeCategory === slug ? { backgroundColor: cat.color } : undefined}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
