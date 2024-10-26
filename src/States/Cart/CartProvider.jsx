/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import useAuth from "../../Hooks/useAuth";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    useEffect(() => {
        const fetchCartItems = async () => {
            if (user && user.email) {
                try {
                    const res = await axiosCommon.get(`/cart/email/${user.email}`);
                    setCartItems(res.data);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                    toast.error('Failed to fetch cart items');
                }
            }
        };

        fetchCartItems();
    }, [user, axiosCommon]);

    const addToCart = async (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.product_id === item.product_id);

        if (existingItem) {
            // If the item exists, update the quantity
            const updatedCartItems = cartItems.map(cartItem => {
                if (cartItem.product_id === item.product_id) {
                    return { ...cartItem, quantity: (cartItem.quantity || 1) + 1 };
                }
                return cartItem;
            });
            setCartItems(updatedCartItems);
            toast.success('Quantity updated in Cart');

            // Optionally, send the updated quantity to the server
            await axiosCommon.put(`/cart/${existingItem._id}`, { quantity: (existingItem.quantity || 1) + 1 });
        } else {
            // If the item is new, add it to the cart
            const newItem = { ...item, quantity: 1 }; // Set initial quantity to 1
            setCartItems((prevItems) => [...prevItems, newItem]);

            try {
                const res = await axiosCommon.post('/cart', { ...newItem, email: user.email });

                if (res.data?.insertedId) {
                    toast.success('Added to Cart');
                } else {
                    toast.error('Failed to add cart');
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error('Failed to add cart');
            }
        }
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
        toast.success('Removed from Cart');
    };

    const cartInfo = {
        cartItems, addToCart, removeFromCart
    };

    return (
        <CartContext.Provider value={cartInfo}>
            {children}
            <Toaster position="top-center" />
        </CartContext.Provider>
    );
};

export default CartProvider;
