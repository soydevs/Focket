import { useEffect, useState } from "react";
import { FOCKET_IS_USER_LOGGED_IN } from "../constants";

const useIsLoggedIn = (initialVal = false) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(initialVal);
  // to be improved
  useEffect(() => {
    localStorage.setItem(FOCKET_IS_USER_LOGGED_IN, isUserLoggedIn === true);
  }, [isUserLoggedIn]);
  console.log({ isUserLoggedIn });
  return { isUserLoggedIn, setIsUserLoggedIn };
};

export default useIsLoggedIn;
