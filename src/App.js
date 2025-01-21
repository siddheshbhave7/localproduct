import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/themeContext";
import HeaderNavbar from "./components/HeaderNavbar";
import Register from "./components/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Cart from "./components/cart/Cart";
import error from "./components/error/error";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);
  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      {/* <Theme /> */}
      <BrowserRouter>
        <HeaderNavbar />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className=" justify-center min-h-screen bg-yellow-100">
                Home Page
              </h1>
            }
          />
          <Route path="/register" Component={Register} />
          <Route path="/signup" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/home" Component={Home} />
          <Route path="/cart" Component={Cart} />
          <Route path="*" Component={error} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;