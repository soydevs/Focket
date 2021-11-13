import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { FOCKET_IS_USER_LOGGED_IN } from "../constants";

const login = () => {
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    // getRequest
    // verify

    try {
      localStorage.setItem(FOCKET_IS_USER_LOGGED_IN, true);
      router.push("/");
      toast("Successfully Logged in");
    } catch (error) {
      console.log("Error in logIn: " + error);
      toast(
        "There seems to be some error in login. Please verify your password"
      );
    }
  };

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
        <form action='' method='post' style={{ flex: 1 }}>
          <input
            placeholder='Enter password'
            type='text'
            type='password'
            id='pass'
          />
          <button type='submit' onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
