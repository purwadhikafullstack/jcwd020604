import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../components/Register";
import Login from "../components/Login";
import Verify from "../components/RegisterVerify";
import UserProfile from "../pages/user/UserProfile";
import UserList from "../pages/user/UserList";
import AdminProfile from "../pages/user/UserProfile";
import AddUser from "../pages/user/AddUser";
import EditUser from "../pages/user/EditUser";
// import ProtectedPages from "./ProtectedPages";


const routes = 
[
    <Route path="/" element={<HomePage />}></Route>,
    <Route path="/register" element={<Register />}></Route>,
    <Route path="/login" element={<Login />}></Route>,
    <Route path="/verify" element={<Verify />}></Route>,

    <Route path="/user_profile" element={<UserProfile />}></Route>,
    <Route path="/user_list" element={<UserList />}></Route>,
    <Route path="/add_user" element={<AddUser />}></Route>,
    <Route path="/edit_user" element={<EditUser />}></Route>,
    <Route path="/admin_profile" element={<AdminProfile />}></Route>,
];

export default routes;
