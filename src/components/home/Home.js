import { useEffect, useState } from "react";
import { useTheme } from "../../context/themeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loading from "../../assets/loading.gif";

function Home() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProduct(response.data);
    } catch (error) {
      setError("Failed to fetch products!");
    }
  };

  const addToCart = (prod) => {
    const updatedCart = [...cart, prod];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first!");
      navigate("/login");
    } else {
      fetchData();
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        setCart(storedCart);
      }
    }
  }, []);

  return (
    <div
      className={`${
        themeMode === "dark"
          ? "bg-gray-800 text-white"
          : "bg-yellow-100 text-gray-900"
      } py-8 px-4`}
    >
      <div className="flex justify-between">
        <h1
          className={`text-4xl font-semibold text-center mb-8 ${
            themeMode === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Welcome to the Home Page!
        </h1>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {product.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {product.map((prod) => (
            <div
              key={prod.id}
              className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl"
            >
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-64 object-contain mb-4 rounded-md"
              />
              <h2 className={"text-xl font-semibold mb-2 text-gray-900"}>
                {prod.title}
              </h2>
              <p
                className={`text-gray-600 mb-4 ${
                  themeMode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {prod.description}
              </p>
              <p className={`text-lg font-bold mb-4 text-gray-900`}>
                ${prod.price}
              </p>
              <button
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => addToCart(prod)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-transparent">
          <img
            src={loading}
            alt="Loading..."
            className="mx-auto bg-transparent"
          />
        </div>
      )}
    </div>
  );
}

export default Home;