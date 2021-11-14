import { useEffect, useState } from "react";
import { FOCKET_IS_USER_LOGGED_IN } from "../constants";

const useIsLoggedIn = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  // to be fixed
  useEffect(() => {
    const val = localStorage.getItem(FOCKET_IS_USER_LOGGED_IN);
    console.log(val);
  });
  return { isUserLoggedIn };
};

export default useIsLoggedIn;
