import { useContext } from "react";
import { CartContext } from "../Providers/Cart/CartProvider";

const useCart = () => {
    const cart = useContext(CartContext)
    return cart;
};

export default useCart;