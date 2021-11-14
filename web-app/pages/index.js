import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "../components/Main";
import styles from "../styles/Home.module.css";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { Button } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { isUserLoggedIn, setIsUserLoggedIn } = useIsLoggedIn();
  console.log({ isUserLoggedIn });

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.replace("/login");
    }
  }, [isUserLoggedIn]);
  console.log({ isUserLoggedIn });

  const handleLogout = () => {
    setIsUserLoggedIn(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Focket</title>
        <meta
          name="description"
          content="Focket-A FOSS knowledge management system"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Button
        onClick={handleLogout}
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        LogOut
      </Button>
      <Main />
      <ToastContainer />
      <footer>
        <a
          href="https://github.com/soydevs/Focket"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", marginBottom: 5 }}
        >
          Visit source Code
        </a>
      </footer>
    </div>
  );
}
