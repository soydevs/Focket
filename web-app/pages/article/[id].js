import { useEffect, useState } from "react";
import Head from "next/head";
import Chips from "react-chips";

import dbConnect from "../../lib/connect";
import { Article } from "../../models";
import CleanedPage from "../../components/CleanedPage";
import NotesTab from "../../components/NotesTab";

export const getStaticProps = async ({ params }) => {
  await dbConnect();
  const [article] = await Article.find({ title: params.id }).lean().exec();
  console.log(article);
  return {
    props: {
      passedArticle: {
        ...article,
        _id: article._id.toHexString(),
        createdAt: new Date(article.createdAt).getTime(),
        updatedAt: new Date(article.updatedAt).getTime(),
      },
    },
  };
};

export const getStaticPaths = async () => {
  await dbConnect();
  const articles = await Article.find({}).lean().exec();
  const paths = articles.map((article) => ({
    params: { id: article.title },
  }));
  return {
    paths,
    fallback: false,
  };
};

const ArticlePage = ({ passedArticle }) => {
  const [article, setArticle] = useState(passedArticle);
  const [notesTabOpen, setNotesTabOpen] = useState(true);

  useEffect(() => {
    setArticle(passedArticle);
  }, [passedArticle]);

  if (!article) return null;
  const { title, createdAt, tags, url, notes } = article;

  const handleUpdateArticle = async (key, val) => {
    const updatedArticle = { ...article, [key]: val };
    try {
      const res = await (
        await fetch("http://localhost:3000/api/articles", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedArticle),
        })
      ).json();
      console.log(res);
      if (res.success) {
        const savedArticle = res.data;
        setArticle(savedArticle);
      } else throw "Server error";
    } catch (err) {
      console.log("error: " + err);
      // toast(
      //   "There seems to be some issues with updation. Please check your network connectivity"
      // );
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
          <CleanedPage content={article.content} url={url} />
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
export default ArticlePage;
