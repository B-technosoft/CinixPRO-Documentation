import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Storage } from "../enums/storage.enums";

const useIsHashToken = (storage: Storage) => {
  const [token, setToken] = useState(localStorage.getItem(storage));

  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem(storage));
  }, [location]);

  return token;
};

export default useIsHashToken;
