import React from "react";
import { useRouter } from "next/router";
import PreviewCard from "./PreviewCard";

const ArticleList = ({ articles = [] }) => {
  const router = useRouter();
  return (
    <div>
      {articles?.length ? (
        articles.map((article) => (
          <div
            key={article.url}
            onClick={() => router.push(`article/${article.title}`)}
          >
            <PreviewCard article={article} />
          </div>
        ))
      ) : (
        <p>
          Try adding some urls in the extension to have them displayed here!
        </p>
      )}
    </div>
  );
};

export default ArticleList;
