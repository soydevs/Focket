import { useState } from "react";
import Head from "next/head";
import Chips from "react-chips";
// const read = require("node-readability"); // todo: make this into an api which can be called

import Article from "../../models";
import CleanedPage from "../../components/CleanedPage";
import NotesTab from "../../components/NotesTab";
import { toast } from "react-toastify";

export const getStaticProps = ({ params }) => {
  const article = await Article.find({ title: params.id }).lean().exec();
  return { props: { article } };
};

export const getStaticPaths = async () => {
  const articles = await Article.find({}).lean().exec();
  const paths = articles.map((article) => ({
    params: { id: article.title },
  }));
  return {
    paths,
    fallback: false,
  };
};

const Article = ({ article, content }) => {
  const [notesTabOpen, setNotesTabOpen] = useState(true);
  const { title, createdAt, tags, url, notes } = article;

  const handleUpdateArticle = (key, val) => {
    const updatedArticle = { ...article, [key]: val };
    console.log(updatedArticle);
    try {
      // axios.put(...)
      toast("Successfully updated");
    } catch (error) {
      toast(
        "There seems to be some issues with updation. Please check your network connectivity"
      );
    }
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
          {new Date(createdAt).toLocaleString()}
        </span>
        <br />
        <button onClick={() => setNotesTabOpen((curr) => !curr)}>
          {notesTabOpen ? "Hide " : "Show "}Notes
        </button>
      </div>
      <div
        className="container"
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
