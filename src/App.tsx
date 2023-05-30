import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/User/Login/login-form";
import { RegisterFrom } from "./components/User/Register/register-form";
import { Header } from "./components/User/Layout/Header/header";

function App() {
   return (
      <>
         <Header />
         <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterFrom />} />
         </Routes>
      </>
   );
}

export default App;
