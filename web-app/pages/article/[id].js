import React, { useState } from "react";
import NotesTab from "../../components/NotesTab";
import { tempArticles } from "../../tempData";

export const getStaticProps = ({ params }) => {
  console.log(params);
  const article = tempArticles.find((article) => article.id === params.id);
  console.log(article);
  return { props: { article: article || {} } };
};

export const getStaticPaths = () => {
  const paths = tempArticles.map((article) => ({
    params: { id: article.id, slug: "hi" },
  }));
  return {
    paths,
    fallback: false,
  };
};

const Article = ({ article }) => {
  const [notesTabOpen, setNotesTabOpen] = useState(true);
  return (
    <div style={{ minHeight: "100vh" }}>
      <h1>{article.title}</h1>
      <h3>Added on: {new Date(article.addedTime).toLocaleString()}</h3>

      <span>
        <b>tags:</b>
        {article.tags.map((tag) => `${tag} `)}
      </span>
      <br />
      <button onClick={() => setNotesTabOpen((curr) => !curr)}>
        {notesTabOpen ? "Hide " : "Show "}Notes
      </button>
      <hr />
      <div className='container' style={{ display: "flex", height: 400 }}>
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
