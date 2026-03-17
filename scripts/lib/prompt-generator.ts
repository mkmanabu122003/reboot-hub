interface ArticleMeta {
  title: string;
  category: string;
  tags: string[];
  slug: string;
}

interface SceneTemplate {
  scene: string;
  palette: string;
}

const ARTICLE_SCENES: Record<string, SceneTemplate> = {
  'why-i-left-big4': {
    scene:
      'Single person walking confidently on an open road toward a bright horizon. Behind them, a large corporate building fades into shadow. The person is small but moving forward with purpose.',
    palette:
      'deep navy (#1B4F72) for the building/shadow, warm amber for the horizon light, white space',
  },
  'big4-quit-story': {
    scene:
      'A person standing at a glass door of a tall office building, one hand pushing the door open to the outside. Inside is dark and structured, outside is bright open sky with soft clouds.',
    palette:
      'deep navy (#1B4F72) for the interior, soft teal and white for the exterior light',
  },
  'consul-agent-review': {
    scene:
      'A person standing at a crossroads with five distinct paths branching out ahead. Each path is subtly different in width and direction. The person holds a compass.',
    palette:
      'blue (#2E75B6) as primary, sky blue accents, light gray ground, white space',
  },
  'freelance-full-record': {
    scene:
      'A solo figure sitting at a minimal desk with a laptop, surrounded by floating geometric shapes representing growth — ascending bar charts, upward arrows. A small plant growing beside the desk.',
    palette:
      'emerald green (#27AE60) as primary, soft mint accents, warm white background',
  },
  'claude-api-automation': {
    scene:
      'A person and an abstract AI entity (represented as a glowing geometric orb) collaborating side by side at a workspace. Data streams flow between them in clean arcs.',
    palette:
      'deep purple (#8E44AD) as primary, soft violet gradients, electric blue accents, dark background fading to white',
  },
};

const CATEGORY_FALLBACK: Record<string, SceneTemplate> = {
  'consul-real': {
    scene:
      'A business professional silhouette standing in front of a large corporate building, looking outward toward open space. Geometric shapes suggest structure giving way to freedom.',
    palette:
      'deep navy (#1B4F72) for corporate elements, teal accents, white space',
  },
  'career-change': {
    scene:
      'A person at a fork in the road, one path leading to a structured cityscape, the other to an open landscape with possibilities. The person faces the open path.',
    palette:
      'blue (#2E75B6) as primary, sky blue for the open path, soft gray for the city',
  },
  freelance: {
    scene:
      'A solo professional working at a minimal desk in an open, airy space. Clean geometric shapes float around representing independence and growth.',
    palette:
      'emerald green (#27AE60) as primary, mint accents, warm white background',
  },
  'ai-career': {
    scene:
      'Abstract representation of human-AI collaboration: a person and a geometric AI form working together, connected by flowing data streams.',
    palette:
      'deep purple (#8E44AD) as primary, violet gradients, electric blue accents',
  },
  global: {
    scene:
      'A person with a briefcase walking across a stylized globe or world map. Dotted lines suggest international connections and travel routes.',
    palette:
      'warm orange (#E67E22) as primary, amber accents, soft white background',
  },
};

const STYLE_SUFFIX =
  'Flat vector style, no text, no faces, clean geometric shapes. Aspect ratio 16:9, suitable for blog OGP thumbnail.';

export function generateImagePrompt(meta: ArticleMeta): string {
  const custom = ARTICLE_SCENES[meta.slug];
  const fallback = CATEGORY_FALLBACK[meta.category] || CATEGORY_FALLBACK['consul-real'];
  const template = custom || fallback;

  return `Minimalist editorial illustration. ${template.scene} Color palette: ${template.palette}. ${STYLE_SUFFIX}`;
}
