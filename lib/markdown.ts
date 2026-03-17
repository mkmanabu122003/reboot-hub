import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import type { Root, Node } from 'mdast';
import { visit } from 'unist-util-visit';

interface DirectiveNode extends Node {
  type: 'containerDirective' | 'leafDirective' | 'textDirective';
  name: string;
  children: DirectiveNode[];
  attributes?: Record<string, string>;
  data?: Record<string, unknown>;
}

function remarkCustomDirectives() {
  return (tree: Root) => {
    visit(tree, (node) => {
      const d = node as unknown as DirectiveNode;

      if (d.type === 'containerDirective') {
        if (d.name === 'point') {
          const label = getDirectiveLabel(d);
          d.data = d.data || {};
          d.data.hName = 'div';
          d.data.hProperties = { className: 'directive-point' };
          if (label) {
            d.children.unshift({
              type: 'leafDirective' as DirectiveNode['type'],
              name: 'span',
              children: [] as DirectiveNode[],
              data: {
                hName: 'div',
                hProperties: { className: 'directive-point-title' },
                hChildren: [{ type: 'text', value: label }],
              },
            });
          }
        }

        if (d.name === 'warn') {
          const label = getDirectiveLabel(d);
          d.data = d.data || {};
          d.data.hName = 'div';
          d.data.hProperties = { className: 'directive-warn' };
          if (label) {
            d.children.unshift({
              type: 'leafDirective' as DirectiveNode['type'],
              name: 'span',
              children: [] as DirectiveNode[],
              data: {
                hName: 'div',
                hProperties: { className: 'directive-warn-title' },
                hChildren: [{ type: 'text', value: label }],
              },
            });
          }
        }

        if (d.name === 'balloon') {
          const label = getDirectiveLabel(d);
          d.data = d.data || {};
          d.data.hName = 'div';
          d.data.hProperties = { className: 'directive-balloon' };
          if (label) {
            d.children.unshift({
              type: 'leafDirective' as DirectiveNode['type'],
              name: 'span',
              children: [] as DirectiveNode[],
              data: {
                hName: 'div',
                hProperties: { className: 'directive-balloon-header' },
                hChildren: [
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: { className: 'directive-balloon-avatar' },
                    children: [{ type: 'text', value: label[0] }],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: { className: 'directive-balloon-name' },
                    children: [{ type: 'text', value: label }],
                  },
                ],
              },
            });
          }
        }

        if (d.name === 'steps') {
          d.data = d.data || {};
          d.data.hName = 'div';
          d.data.hProperties = { className: 'directive-steps' };
          let stepIndex = 0;
          for (const child of d.children) {
            const c = child as unknown as DirectiveNode;
            if (c.type === 'leafDirective' && c.name === 'step') {
              stepIndex++;
              const stepLabel = getDirectiveLabel(c);
              c.data = c.data || {};
              c.data.hName = 'div';
              c.data.hProperties = { className: 'directive-step' };
              c.data.hChildren = [
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: 'directive-step-number' },
                  children: [{ type: 'text', value: String(stepIndex) }],
                },
                {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: 'directive-step-label' },
                  children: [{ type: 'text', value: stepLabel || `Step ${stepIndex}` }],
                },
              ];
            }
          }
        }

        if (d.name === 'compare') {
          d.data = d.data || {};
          d.data.hName = 'div';
          d.data.hProperties = { className: 'directive-compare' };
          for (const child of d.children) {
            const c = child as unknown as DirectiveNode;
            if (c.type === 'containerDirective' && c.name === 'col') {
              const colLabel = getDirectiveLabel(c);
              c.data = c.data || {};
              c.data.hName = 'div';
              c.data.hProperties = { className: 'directive-compare-col' };
              if (colLabel) {
                c.children.unshift({
                  type: 'leafDirective' as DirectiveNode['type'],
                  name: 'span',
                  children: [] as DirectiveNode[],
                  data: {
                    hName: 'div',
                    hProperties: { className: 'directive-compare-title' },
                    hChildren: [{ type: 'text', value: colLabel }],
                  },
                });
              }
            }
          }
        }
      }
    });
  };
}

function getDirectiveLabel(node: DirectiveNode): string {
  const firstChild = node.children[0] as unknown as { type: string; value?: string; children?: Array<{ type: string; value?: string }> };
  if (firstChild && firstChild.type === 'paragraph' && firstChild.children) {
    const textNode = firstChild.children[0];
    if (textNode && textNode.type === 'text' && textNode.value) {
      return textNode.value;
    }
  }
  return '';
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkCustomDirectives)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeExternalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}
