import { useState } from "react";
import Head from "next/head";
// const read = require("node-readability"); // todo: make this into an api which can be called

import CleanedPage from "../../components/CleanedPage";
import NotesTab from "../../components/NotesTab";
import TagsList from "../../components/TagsList";
import { tempArticles } from "../../tempData";

export const getStaticProps = ({ params }) => {
  const article = tempArticles.find((article) => article.id === params.id);
  return { props: { article } };
  // return new Promise((resolve) => {
  // read(article.url, (err, { content }, meta) => {
  //   if (err) {
  //     resolve({ props: { article } });
  //   } else {
  //     resolve({ props: { article, content: content } });
  //   }
  // });
  // });
};

export const getStaticPaths = () => {
  const paths = tempArticles.map((article) => ({
    params: { id: article.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

const Article = ({ article, content }) => {
  const [notesTabOpen, setNotesTabOpen] = useState(true);
  const { title, addedTime, tags, url, notes } = article;
  return (
    <div style={{ minHeight: "100vh", padding: 5 }}>
      <Head>
        <title>Focket - {title}</title>
      </Head>
      <h1>{title}</h1>
      <p>
        <b>Added On: </b>
        {new Date(addedTime).toLocaleString()}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <b>Tags: </b>
          <TagsList tags={tags} />
        </span>
        <br />
        <button onClick={() => setNotesTabOpen((curr) => !curr)}>
          {notesTabOpen ? "Hide " : "Show "}Notes
        </button>
      </div>
      <div
        className='container'
        style={{ display: "flex", height: 400, marginTop: 10 }}
      >
        <div style={{ flex: 3 }}>
          <CleanedPage content={content} url={url} />
        </div>
        {notesTabOpen && (
          <div style={{ flex: 1 }}>
            <NotesTab notesList={notes} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Article;
