import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../components/Register";
import Login from "../components/Login";
import Auth from "../pages/authPage";
import Verify from "../components/RegisterVerify";


const routes = 
[
    <Route path="/" element={<HomePage />}></Route>,
    <Route path="/register" element={<Register />}></Route>,
    <Route path="/login" element={<Login />}></Route>,
    <Route path="/auth" element={<Auth />}></Route>,
    <Route path="/verify" element={<Verify />}></Route>,
];

export default routes;
