interface ArticleBodyProps {
  content: string;
}

const ArticleBody: React.FC<ArticleBodyProps> = ({ content }) => {
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:text-text prose-headings:font-bold
        prose-h2:text-h2-mobile prose-h2:md:text-h2 prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
        prose-h3:text-h3-mobile prose-h3:md:text-h3 prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-body prose-p:leading-relaxed prose-p:my-4
        prose-a:text-secondary prose-a:underline prose-a:hover:text-primary
        prose-code:text-code prose-code:bg-bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-bg-secondary prose-pre:rounded-lg prose-pre:p-4
        prose-ul:my-4 prose-li:my-1
        prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleBody;
