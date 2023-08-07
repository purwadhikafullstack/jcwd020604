import React,{ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const ProtectedPages = ({
    children,
    redirect,
    guestOnly,
    needLogin,
    needLoginAdmin
}) => {
    const user = useSelector((state) => state.auth);
    const nav = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }, [isLoading]);
    
      useEffect(() => {
        if (redirect) {
          return nav("/restricted");
        } else if (guestOnly && user.role) {
          return nav("/");
        } else if (needLogin && !user.role) {
          return nav("/login");
        } else if (needLogin && needLoginAdmin && user.role !== "ADMIN") {
          return nav("/restricted");
        }
      }, []);

    return (
        <>
            {isLoading ? <Loading/> : children}
        </>
    );
}

export default ProtectedPages;
