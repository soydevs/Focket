import React from "react";
// import Preview from "preview-url-component";
import { useRouter } from "next/router";
import Link from "next/link";
import PreviewCard from "./PreviewCard";
// import { ReactTinyLink } from "react-tiny-link";

const ArticleList = ({ articles = [] }) => {
  const router = useRouter();
  return (
    <div>
      {articles?.length ? (
        articles.map((article) => {
          const { url, id } = article;
          return (
            <div onClick={() => router.push(`article/${id}`)}>
              {/* <Link href={`article/${id}`}> */}
              <PreviewCard article={article} />
              {/* </Link> */}
            </div>
          );
        })
      ) : (
        <p>
          Try adding some urls in the extension to have them displayed here!
        </p>
      )}
    </div>
  );
};

export default ArticleList;
