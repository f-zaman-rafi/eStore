/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useCart } from "../../Providers/Cart/CartProvider";
import useAuth from "../../Hooks/useAuth";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";

const Cart = () => {
  const { user } = useAuth();
  const { cartData, productDetails, quantities, handleAddItem, handleRemoveItem, calculateSubtotal, tax, shippingCost, total, handleDeleteItem, isLoading } = useCart();

  if (!user) return <LoadingComponent />;
  if (isLoading) return <LoadingComponent />;
  // if (error) return <p>Error loading cart: {error.message}</p>;

  return (
    <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden md:px-0 px-4">
      <div className="lg:ml-32 lg:mr-40 mt-14">

        <div className="lg:grid lg:grid-cols-7 lg:gap-12 ">
          {cartData.length === 0 ? (
            <div className="col-span-4 text-center lg:my-40 my-20 space-y-5 font-bold">
              <p>No products in your cart</p>
            </div>
          ) : (
            <div className="col-span-4 md:pl-10">
              <p className="text-lg font-bold pb-5">Shopping Cart</p>
              {cartData.map((data) => {
                const matchingDetails = productDetails.find(details => details._id === data.product_id);

                if (matchingDetails) {
                  const { image, Model, priceVariants } = matchingDetails;
                  const variantPrice = priceVariants.find(
                    variant => variant.variant === data.variant
                  );
                  const price = variantPrice ? variantPrice.price : 0;
                  const updatedPrice = price * quantities[data._id];

                  return (
                    <div key={data._id} className="flex py-8 border-b-[1px] items-center">
                      <img className="h-full w-[90px]" src={image} alt="" />
                      <div className="pb-2 font-semibold w-56 mx-auto pl-3">
                        <Link to={`/${data.type}/${data.product_id}`}><p className="w-auto">{Model}</p></Link>
                        <p className="pb-2 text-sm">{data.variant}</p>
                        <p className="font-medium text-xs pt-1 break-all">
                          {`#${data._id.slice(0, 15)}${data._id.length > 15 ? '...' : ''}`}
                        </p>
                      </div>
                      <div className="flex select-none h-10 items-center w-auto mx-auto px-5">
                        <p
                          className="px-2 py-[1px] border-gray-200 rounded-s-md border-y-[1px] border-l-[1px] cursor-pointer"
                          onClick={() => handleAddItem(data._id)}
                        >
                          +
                        </p>
                        <p className="py-[1px] w-8 text-center border-gray-200 border-[1px]">
                          {quantities[data._id]}
                        </p>
                        <p
                          className="px-2 py-[1px] border-gray-200 rounded-e-md border-y-[1px] border-r-[1px] cursor-pointer"
                          onClick={() => handleRemoveItem(data._id)}
                        >
                          -
                        </p>
                      </div>
                      <p className="font-semibold w-auto mx-auto px-5">${updatedPrice.toFixed(2)}</p>
                      <p
                        className="border-[1px] border-transparent hover:border-gray-400 rounded-full text-xl text-center flex items-center mx-auto p-1 cursor-pointer"
                        style={{ transitionDuration: '500ms' }}
                        onClick={() => handleDeleteItem(data._id)}
                      >
                        <ion-icon name="close-outline" />
                      </p>

                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
          <div className="col-span-3 lg:border-2 border-gray-100 rounded-xl px-10 py-10 ">
            <p className="font-bold">Order Summary</p>


            <label className="form-control pt-10">
              <div className="label">
                <span className="label-text-alt">Discount code / Promo code</span>
              </div>
              <input type="text" placeholder="Code" className="input input-bordered " />

            </label>
            <label className="form-control pt-5">
              <div className="label">
                <span className="label-text-alt">Your bonus card number</span>
              </div>
              <input type="text" placeholder="Enter Card Number" className="input input-bordered " />
              <div className="pt-7 flex justify-between">
                <p className="text-sm font-semibold ">Subtotal</p>
                <p className="text-sm font-semibold">${calculateSubtotal().toFixed(2)}</p>
              </div>
              <div className="pt-2 flex justify-between">
                <p className="text-sm text-gray-600 font-medium">Estimated Tax</p>
                <p className="text-sm">${tax().toFixed(2)}</p>
              </div>
              <div className="pt-2 flex justify-between">
                <p className="text-sm text-gray-600 font-medium">Estimated shipping Handling</p>
                <p className="text-sm">${shippingCost().toFixed(2)}</p>
              </div>
              <div className="pt-5 flex justify-between">
                <p className="text-sm font-semibold ">Total</p>
                <p className="text-sm font-semibold">${total.toFixed(2)}</p>
              </div>
              {cartData.length === 0 ?
                <p className="btn bg-gray-300 text-gray-500 text-xs mt-14 disabled cursor-not-allowed">Checkout</p>
                :
                <Link to='address'><p className="btn bg-black text-xs text-white mt-14 w-full">Checkout</p></Link>

              }
            </label>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
