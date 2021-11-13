import Head from "next/head";
import Main from "../components/Main";
import styles from "../styles/Home.module.css";

export default function Home() {
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
      <Main />

      <footer>
        <a
          href='https://github.com/soydevs/Focket'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: "blue", marginBottom: 5 }}
        >
          Visit source Code
        </a>
      </footer>
    </div>
  );
}
