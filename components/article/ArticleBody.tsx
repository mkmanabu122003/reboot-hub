interface ArticleBodyProps {
  content: string;
}

const ArticleBody: React.FC<ArticleBodyProps> = ({ content }) => {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleBody;
