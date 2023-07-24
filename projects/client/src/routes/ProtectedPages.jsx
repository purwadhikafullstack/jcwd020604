import React,{ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Text } from "@chakra-ui/react";

const ProtectedPages = ({
    children,
    redirect = false,
    guestOnly = false,
    needLogin = false,
    needLoginAdmin = false
}) => {
    const location = useLocation();
    const user = useSelector((state) => state.login.auth);
    const nav = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }, [isLoading]);
    
      useEffect(() => {
        if (redirect) {
          return nav("/");
        } else if (guestOnly && user?.email) {
          return nav("/");
        } else if (needLogin && !user?.email) {
          return nav("/");
        } else if (needLoginAdmin && user?.role !== "ADMIN") {
          return nav("/");
        }
        console.log(user);
      }, [user]);

    return (
        <>
            {isLoading ? <Loading/> : children}
        </>
    );
}

export default ProtectedPages;
