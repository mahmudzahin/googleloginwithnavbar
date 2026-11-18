
import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";

function Cart() {
  const { cart, removeFromCart, totalItems } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Shopping Cart ({totalItems})
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-600">
            Your cart is empty!
          </h2>
          <p className="text-gray-400 mt-2">
            Add some products to your cart.
          </p>
        </div>
      ) : (
        <div className="space-y-5">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5
              bg-white shadow p-4 rounded-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="font-bold text-lg">
                  {item.name}
                </h2>

                <p className="text-indigo-600 font-semibold">
                  ৳{item.price}
                </p>

                <p className="text-gray-500 text-sm">
                  Quantity: {item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))}

          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-bold">
              Total: ৳{totalPrice}
            </h2>

            <button className="mt-4 bg-indigo-600
              text-white px-8 py-3 rounded-lg
              hover:bg-indigo-700">
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;
