import React from "react";
import Preview from "preview-url-component";
// import { ReactTinyLink } from "react-tiny-link";

const ArticleList = ({ articles = [] }) => {
  console.log(articles);
  return (
    <div>
      {articles?.length ? (
        articles.map(({ url }) => {
          console.log(url);
          return (
            <Preview
              url={url}
              loadingText='loading...'
              notFound='URL Not Found!'
            />
            // <ReactTinyLink
            //   cardSize='small'
            //   showGraphic={true}
            //   maxLine={2}
            //   minLine={1}
            //   url={url}
            // />
            // null
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
