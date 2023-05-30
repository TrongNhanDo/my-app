import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/User/Account/Login/login-form";
import { RegisterFrom } from "./components/User/Account/Register/register-form";
import { Header } from "./components/User/Layout/Header/header";
import { HomePage } from "./components/User/HomePage";

function App() {
   return (
      <>
         <Header />
         <Routes>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterFrom />} />
         </Routes>
      </>
   );
}

export default App;
