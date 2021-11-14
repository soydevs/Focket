import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "../components/Main";
import styles from "../styles/Home.module.css";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { Button } from "@mui/material";
import { FOCKET_IS_USER_LOGGED_IN } from "../constants";

export default function Home() {
  const router = useRouter();
  const { isUserLoggedIn, setIsUserLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    const val = localStorage.getItem(FOCKET_IS_USER_LOGGED_IN);
    console.log(val);
    if (!val) {
      router.replace("/login");
    }
  });

  const handleLogout = () => {
    localStorage.removeItem(FOCKET_IS_USER_LOGGED_IN);
    toast("Logging you out");
    setTimeout(() => {
      router.replace("/login");
    }, 2500);
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
