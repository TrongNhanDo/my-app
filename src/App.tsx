import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/User/Account/Login/login-form";
import { RegisterFrom } from "./components/User/Account/Register/register-form";
import { Header } from "./components/User/Layout/Header/header";
import { HomePage } from "./components/User/HomePage";
import { AdminHome } from "./components/Admin/HomePage";
import { UserList } from "./components/Admin/Account/UserList/user-list";
import { PageNotFound } from "./components/Common/Error/error";
import { UserDetail } from "./components/Admin/Account/UserDetail/user-detail";

function App() {
   return (
      <>
         <Header />
         <Routes>
            {/* route for user */}
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterFrom />} />

            {/* route for admin */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/product-list" element={<AdminHome />} />
            <Route path="/admin/user-list" element={<UserList />} />
            <Route path="/admin/user-detail/:userId" element={<UserDetail />} />
            <Route path="/admin/age-category-list" element={<AdminHome />} />
            <Route path="/admin/branch-category-list" element={<AdminHome />} />
            <Route path="/admin/list-category-list" element={<AdminHome />} />
            <Route path="/admin/order-list" element={<AdminHome />} />

            {/* 404 page */}
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </>
   );
}

export default App;
