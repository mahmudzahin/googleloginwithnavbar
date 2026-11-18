import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  // Check Google login
  const isLoggedIn = () => {
    return localStorage.getItem("googleUser") !== null;
  };

  const products = [
    {
      id: 1,
      name: "Wireless Headphone",
      price: 2500,
      image: "https://placehold.co/400x300?text=Headphones",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 3500,
      image: "https://placehold.co/400x300?text=Smart+Watch",
    },
    {
      id: 3,
      name: "Keyboard",
      price: 1500,
      image: "https://placehold.co/400x300?text=Keyboard",
    },
  ];

  const handleAddToCart = (product) => {
    if (!isLoggedIn()) {
      setMessage("Please login with Google before adding products!");
      return;
    }

    addToCart(product);

    setMessage(`${product.name} added to cart successfully!`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Our Products
      </h1>

      {message && (
        <div className="mb-6 bg-indigo-50 text-indigo-700 p-4 rounded-lg flex justify-between">
          <p>{message}</p>

          {!isLoggedIn() && (
            <button
              onClick={() => navigate("/")}
              className="font-bold underline"
            >
              Login Now
            </button>
          )}

          <button onClick={() => setMessage("")}>
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-semibold">
                {product.name}
              </h2>

              <p className="text-indigo-600 font-bold mt-2">
                ৳{product.price}
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full mt-4 bg-indigo-600
                text-white py-3 rounded-lg
                hover:bg-indigo-700 transition"
              >
                Add To Cart
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Products;