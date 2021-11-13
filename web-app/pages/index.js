import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "../components/Main";
import styles from "../styles/Home.module.css";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

export default function Home() {
  const { isUserLoggedIn } = useIsLoggedIn();
  console.log({ isUserLoggedIn });
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
      <ToastContainer />
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
