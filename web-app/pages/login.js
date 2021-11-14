import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useIsLoggedIn from "../hooks/useIsLoggedIn";

const login = () => {
  const router = useRouter();
  const { isUserLoggedIn, setIsUserLoggedIn } = useIsLoggedIn();
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await (await fetch(`/api/verify?pass=${pass}`)).json();
      console.log(res);
      if (res.success) {
        console.log("success");
        setMsg("Successfully Logged in");
        setIsUserLoggedIn(true);
      } else {
        console.log("wrong pass");
        setMsg("Invalid Password");
      }
    } catch (error) {
      console.log("Error in logIn: " + error);
      toast(
        "There seems to be some error in login. Please verify your password"
      );
    }
  };

  if (isUserLoggedIn) {
    router.push("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Focket</h1>
      <p>Your Personal and private Knowledge Management Library</p>
      <div>
        <form action="" method="post" style={{ flex: 1 }}>
          <input
            placeholder="Enter password"
            type="text"
            type="password"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p style={{ color: "red", textAlign: "center" }}>{msg}</p>
      </div>
    </div>
  );
};

export default login;
