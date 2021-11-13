import { useState } from "react";
import Head from "next/head";
import Chips from "react-chips";
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

  const handleUpdateArticle = (key, val) => {
    const updatedArticle = { ...article, [key]: val };
    console.log(updatedArticle);
    // axios.put(...)
  };

  return (
    <div style={{ minHeight: "100vh", padding: 5 }}>
      <Head>
        <title>Focket - {title}</title>
      </Head>
      <h1>{title}</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <b style={{ marginRight: 10 }}>Tags: </b>
        <Chips
          value={tags}
          onChange={(val) => handleUpdateArticle("tags", val)}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <b>Added On: </b>
          {new Date(addedTime).toLocaleString()}
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
            <NotesTab
              notesList={notes}
              handleUpdateArticle={handleUpdateArticle}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Article;
