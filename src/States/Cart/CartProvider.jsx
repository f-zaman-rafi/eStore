/* eslint-disable react/prop-types */

import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item])
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };



    const cartInfo = {
        cartItems, addToCart, removeFromCart
    };

    return (
        <CartContext.Provider value={cartInfo}>
            {children}
            <Toaster position="top-center" />
        </CartContext.Provider>
    )
};

export default CartProvider;