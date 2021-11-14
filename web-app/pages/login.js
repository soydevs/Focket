import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FOCKET_IS_USER_LOGGED_IN } from "../constants";
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
      if (res.success) {
        console.log("success");
        setMsg("Successfully Logged in");
        setIsUserLoggedIn(true);

        localStorage.setItem(FOCKET_IS_USER_LOGGED_IN, true);
        setTimeout(() => {
          router.replace("/");
        }, 700);
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

  // if (isUserLoggedIn) {
  //   router.push("/");
  // }
  // useEffect(() => {
  //   console.log(val);
  // });

  // const val = localStorage.getItem(FOCKET_IS_USER_LOGGED_IN);
  // if (val) {
  //   router.replace("/");
  // }
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
