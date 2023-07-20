import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      console.log(token);
      const user = await axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/auth/v2`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data);
      if (user) {
        dispatch({
          type: "login",
          payload: user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  return children;
}


