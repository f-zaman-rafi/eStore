/* eslint-disable react/prop-types */

import { useState } from "react";

const CartProducts = ({ data }) => {

    const { image, model, quantity } = data;
    const [updateQuantity, setUpdateQuantity] = useState(quantity);

    const addItem = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const removeItem = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
    }
    console.log(data)
    return (
        <div>
            <div>
                <img className="h-24" src={image} alt="" />
                <p>{model}</p>
                <p>{updateQuantity}</p>
            </div>
            <div></div>
        </div>
    );
};

export default CartProducts;