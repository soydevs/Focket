import Head from "next/head";
import { useState } from "react";
import ArticleList from "../components/ArticleList";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.css";
import { tempArticles } from "../tempData";

export default function Home() {
  const [articles, setArticles] = useState(tempArticles);

  const handleSearch = (query = "") => {
    if (query) {
      const filteredArticles = tempArticles.filter(
        (el) =>
          el.url.toLowerCase().includes(query.toLowerCase()) ||
          el.title.toLowerCase().includes(query.toLowerCase())
      );
      setArticles(filteredArticles);
      return;
    }
    setArticles(tempArticles);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Focket</title>
        <meta
          name='description'
          content='Focket-A FOSS knowledge management system'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </Head>

      <SearchBar handleSearch={handleSearch} />
      <ArticleList articles={articles} />

      <footer className={styles.footer}>
        <a
          href='https://github.com/soydevs/Focket'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: "blue" }}
        >
          Visit source Code
        </a>
      </footer>
    </div>
  );
}
