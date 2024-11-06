/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

const CartProducts = ({ data, details }) => {
  const { quantity, varient, _id } = data;
  const { image, Model, priceVariants } = details


  const [updateQuantity, setUpdateQuantity] = useState(quantity);
  const [updatedPrice, setUpdatedPrice] = useState("");

  const addItem = () => {
    setUpdateQuantity((prevQuantity) => prevQuantity + 1);
  };

  const removeItem = () => {
    setUpdateQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  // Find the price based on the variant selected
  useEffect(() => {
    if (priceVariants && varient) {
      const variantDetails = priceVariants.find(
        (variant) => variant.variant === varient
      );
      if (variantDetails) {
        setUpdatedPrice(variantDetails.price * updateQuantity);
      }
    }
  }, [updateQuantity, varient, priceVariants]);

  // console.log(details)

  return (
    <div className="flex py-8 border-b-[1px] gap-5 items-center">
      <img className="h-full w-[90px]" src={image} alt="" />
      <div className="pb-2 pr-10 font-semibold">
        <p>{Model}</p>
        <p className="pb-2 text-sm">{varient}</p>
        <p className="font-medium text-xs pt-1">#{_id}</p>
      </div>
      <div className="flex select-none h-10 items-center">
        <p className="px-2 py-[1px] border-gray-200 rounded-s-md border-y-[1px] border-l-[1px] cursor-pointer" onClick={addItem}>
          +
        </p>
        <p className="py-[1px] w-8 text-center border-gray-200 border-[1px]  ">
          {updateQuantity}
        </p>
        <p className="px-2 py-[1px] border-gray-200 rounded-e-md border-y-[1px] border-r-[1px] cursor-pointer"
          onClick={removeItem}>
          -
        </p>
      </div>
      <p className="font-semibold">${updatedPrice}</p>
    </div>
  );
};

export default CartProducts;
