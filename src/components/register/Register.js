import { useState, useEffect } from "react"; 
import { useTheme } from "../../context/themeContext";

function Register() {
  const { themeMode } = useTheme();

  const [formData, setFormData] = useState({
    comap: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUsers = [...users, formData];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUsers(updatedUsers);

    setFormData({
      fullName: "",
      email: "",
      password: "",
    });

    alert("Registration successful!");
  };

  return (
    <div
      className={`flex justify-center min-h-screen ${
        themeMode === "dark"
          ? "bg-gray-800 text-white"
          : "bg-yellow-100 text-black"
      }`}
    >
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          placeholder="Enter your full name"
          className="mb-4 p-2 w-full rounded-md"
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          className="mb-4 p-2 w-full rounded-md"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          className="mb-4 p-2 w-full rounded-md"
          onChange={handleInputChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;