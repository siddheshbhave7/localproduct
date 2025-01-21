import { useState, useEffect } from "react";
import { useTheme } from "../../context/themeContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    const savedCart =
      JSON.parse(localStorage.getItem(`cart`)) || [];
    setCart(savedCart);
  }, [navigate]);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((prod) => prod.id !== productId);
    setCart(updatedCart);
    localStorage.setItem(`cart`, JSON.stringify(updatedCart));
  };

  const placeOrder = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Order placed successfully!");
      localStorage.removeItem(`cart`);
      setCart([]);
      setLoading(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div
      className={`${
        themeMode === "dark"
          ? "bg-gray-800 text-white"
          : "bg-yellow-100 text-gray-900"
      } py-8 px-4 min-h-screen`}
    >
      <h1 className="text-4xl font-semibold text-center mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
        <div>
          {cart.map((prod) => (
            <div
              key={prod.id}
              className="flex justify-between p-4 mb-4 border-b"
            >
              <div>
                <h2 className="text-xl font-semibold">{prod.title}</h2>
                <p>${prod.price}</p>
              </div>
              <button
                className="text-red-500"
                onClick={() => removeFromCart(prod.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <button
          onClick={placeOrder}
          className="mt-8 py-2 px-4 bg-green-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      )}
    </div>
  );
}

export default Cart;