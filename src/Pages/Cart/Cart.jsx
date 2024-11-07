/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";
import { useEffect, useState } from "react";

const Cart = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const [productDetails, setProductDetails] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Fetch cart data
  const { data: cartData = [], isLoading, error } = useQuery({
    queryKey: ['cartData', user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/cart/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email // Only run query if user email exists
  });

  // Fetch product details for each item in cartData
  useEffect(() => {
    if (cartData.length > 0) {
      const fetchProductDetails = async () => {
        try {
          const productPromises = cartData.map(cartItem =>
            axiosCommon.get(`/${cartItem.type}/${cartItem.product_id}`)
          );
          const response = await Promise.all(productPromises);
          const remap = response.map(res => res.data);
          setProductDetails(remap);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProductDetails();
    }
  }, [cartData, axiosCommon]);

  // Initialize quantities based on cart data
  useEffect(() => {
    const initialQuantities = cartData.reduce((acc, item) => {
      acc[item.product_id] = item.quantity || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cartData]);

  const handleAddItem = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleRemoveItem = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1),
    }));
  };

  //store the quantity inside db 
  useEffect(() => {
    const updateQuantitiesInDB = async () => {
      await axiosCommon.put('/cart/update-quantities', { quantities });
    };

    if (quantities) updateQuantitiesInDB();

  }, [quantities]);


  // calculate subTotal
  const calculateSubtotal = () => {
    return cartData.reduce((total, item) => {
      const matchingDetails = productDetails.find(details => details._id === item.product_id);
      if (matchingDetails) {
        const variantPrice = matchingDetails.priceVariants.find(
          variant => variant.variant === item.variant
        );
        const price = variantPrice ? variantPrice.price : 0;
        total += price * (quantities[item.product_id] || 1);
      }
      return total;
    }, 0);
  };

  // Estimated Tax
  const tax = () => {
    return calculateSubtotal() * 0.05;
  };

  // handling and shipping
  const shippingCost = () => {
    return cartData.length * 10;
  }
  const total = calculateSubtotal() + tax() + shippingCost();
  if (!user) return <LoadingComponent />;
  if (isLoading) return <LoadingComponent />;
  if (error) return <p>Error loading cart: {error.message}</p>;
  return (
    <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden">
      <div className="lg:ml-32 lg:mr-40 mt-14">
        {cartData.length === 0 ? (
          <p>No product found</p>
        ) : (
          <div className="lg:grid lg:grid-cols-7 lg:gap-12 ">
            <div className="col-span-4 md:px-10">
              <p className="text-lg font-bold pb-5">Shopping Cart</p>
              {cartData.map((data) => {
                const matchingDetails = productDetails.find(details => details._id === data.product_id);

                if (matchingDetails) {
                  const { image, Model, priceVariants } = matchingDetails;
                  const variantPrice = priceVariants.find(
                    variant => variant.variant === data.variant
                  );
                  const price = variantPrice ? variantPrice.price : 0;
                  const updatedPrice = price * quantities[data.product_id];

                  return (
                    <div key={data.product_id} className="flex py-8 border-b-[1px] items-center">
                      <img className="h-full w-[90px]" src={image} alt="" />
                      <div className="pb-2 font-semibold w-auto pl-3">
                        <p className="w-auto">{Model}</p>
                        <p className="pb-2 text-sm">{data.variant}</p>
                        <p className="font-medium text-xs pt-1 break-all">{`#${data.product_id}`}</p>
                      </div>
                      <div className="flex select-none h-10 items-center w-auto px-5">
                        <p
                          className="px-2 py-[1px] border-gray-200 rounded-s-md border-y-[1px] border-l-[1px] cursor-pointer"
                          onClick={() => handleAddItem(data.product_id)}
                        >
                          +
                        </p>
                        <p className="py-[1px] w-8 text-center border-gray-200 border-[1px]">
                          {quantities[data.product_id]}
                        </p>
                        <p
                          className="px-2 py-[1px] border-gray-200 rounded-e-md border-y-[1px] border-r-[1px] cursor-pointer"
                          onClick={() => handleRemoveItem(data.product_id)}
                        >
                          -
                        </p>
                      </div>
                      <p className="font-semibold w-auto mx-auto">${updatedPrice.toFixed(2)}</p>
                      <p
                        className="border-[1px] border-transparent hover:border-gray-400 rounded-full text-xl text-center flex items-center mx-auto p-1 cursor-pointer"
                        style={{ transitionDuration: '500ms' }}
                      >
                        <ion-icon name="close-outline" />
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
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
                <p className="btn bg-black text-xs text-white mt-14">Checkout</p>
              </label>



            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
