import { useState, useEffect } from "react";
import { useTheme } from "../../context/themeContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { themeMode } = useTheme();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  function handleLogin(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      alert("No users registered yet.");
      return;
    }
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid email or password.");
    }
  }

  return (
    <div
      className={`flex  min-h-screen justify-center w-full ${
        themeMode === "dark" ? "bg-gray-800 text-white" : "bg-yellow-100 "
      }`}
    >
      <form onSubmit={handleLogin} className="w-full max-w-md p-4 ">
        <input
          placeholder="Email"
          value={email}
          type="email"
          className={`mb-4 p-2 w-full rounded-md ${
            themeMode === "dark" ? "bg-gray-800 text-white" : ""
          }`}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          className={`mb-4 p-2 w-full rounded-md  ${
            themeMode === "dark" ? "bg-gray-800 text-white" : ""
          }`}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;