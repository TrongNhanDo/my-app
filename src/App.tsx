import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/User/Account/Login/login-form";
import { RegisterFrom } from "./components/User/Account/Register/register-form";
import { Header } from "./components/User/Layout/Header/header";
import { HomePage } from "./components/User/HomePage";
import { AdminHome } from "./components/Admin/HomePage";
import { UserList } from "./components/Admin/Account/user-list";

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
            <Route path="/admin/" element={<AdminHome />} />
            <Route path="/admin/products" element={<AdminHome />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/categories-ages" element={<AdminHome />} />
            <Route path="/admin/categories-branches" element={<AdminHome />} />
            <Route path="/admin/categories-skills" element={<AdminHome />} />
            <Route path="/admin/orders" element={<AdminHome />} />
         </Routes>
      </>
   );
}

export default App;
