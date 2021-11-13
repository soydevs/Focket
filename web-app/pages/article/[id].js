import React, { useState } from "react";
import NotesTab from "../../components/NotesTab";
import TagsList from "../../components/TagsList";
import { tempArticles } from "../../tempData";

export const getStaticProps = ({ params }) => {
  const article = tempArticles.find((article) => article.id === params.id);
  return { props: { article } };
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

const Article = ({ article }) => {
  const [notesTabOpen, setNotesTabOpen] = useState(true);
  return (
    <div style={{ minHeight: "100vh", padding: 5 }}>
      <h1>{article.title}</h1>
      <h3>Added on: {new Date(article.addedTime).toLocaleString()}</h3>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <b>Tags:</b>
          <TagsList tags={article.tags} />
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
        <iframe style={{ flex: 3 }} src={article.url} frameborder='0'></iframe>
        {notesTabOpen && (
          <div style={{ flex: 1 }}>
            <NotesTab notesList={article.notes} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Article;
