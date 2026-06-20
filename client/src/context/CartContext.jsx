// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
    
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     const existingItem = cartItems.find((item) => item._id === product._id);

//     if (existingItem) {
//       setCartItems(
//         cartItems.map((item) =>
//           item._id === product._id
//             ? {
//                 ...item,
//                 quantity: item.quantity + 1,
//               }
//             : item,
//         ),
//       );
//     } else {
//       setCartItems([
//         ...cartItems,
//         {
//           ...product,
//           quantity: 1,
//         },
//       ]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCartItems(cartItems.filter((item) => item._id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCartItems(
//       cartItems.map((item) => (item._id === id ? { ...item, quantity } : item)),
//     );
//   };

//   const increaseQty = (id) => {
//     setCartItems(
//       cartItems.map((item) =>
//         item._id === id
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
//             }
//           : item,
//       ),
//     );
//   };

//   const decreaseQty = (id) => {
//     setCartItems(
//       cartItems
//         .map((item) =>
//           item._id === id
//             ? {
//                 ...item,
//                 quantity: item.quantity - 1,
//               }
//             : item,
//         )
//         .filter((item) => item.quantity > 0),
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         increaseQty,
//         decreaseQty,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const savedCart = user
      ? localStorage.getItem(`cart_${user.id}`)
      : null;

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user) {
      localStorage.setItem(
        `cart_${user.id}`,
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter(
        (item) => item._id !== id
      )
    );
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? { ...item, quantity }
          : item
      )
    );
  };

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);