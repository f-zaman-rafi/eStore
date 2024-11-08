/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingComponent from "../../../SharedComponents/Loading/LoadingComponent";
import { Link } from "react-router-dom";



const Checkout = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    const [productDetails, setProductDetails] = useState([]);
    const [quantities, setQuantities] = useState({});

    // Fetch cart data
    const { data: cartData = [], isLoading, error } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            if (!user?.email) return []; // Return empty array if email is not available
            try {
                const res = await axiosCommon.get(`/cart/email/${user.email}`);
                return res.data;
            } catch (err) {
                console.error("Error fetching cart data:", err);
                return []; // Return empty array if there's an error
            }
        },
        enabled: !!user?.email, // Only run query if user email exists
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
        } else {
            setProductDetails([]); // Clear product details when the cart is empty
        }
    }, [cartData, axiosCommon]);


    // Initialize quantities based on cart data
    useEffect(() => {
        const initialQuantities = cartData.reduce((acc, item) => {
            acc[item._id] = item.quantity || 1;
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [cartData]);


    useEffect(() => {
        const updateQuantitiesInDB = async () => {
            if (Object.keys(quantities).length > 0) {  // Only run if quantities is not empty
                try {
                    await axiosCommon.put('/cart/update-quantities', { quantities });
                    console.log("Quantities updated in DB:", quantities);  // Log to verify
                } catch (error) {
                    console.error('Failed to update quantities:', error);
                }
            }
        };

        updateQuantitiesInDB();
    }, [quantities]); // This runs only when 'quantities' change



    const calculateSubtotal = () => {
        if (cartData.length === 0) return 0;
        return cartData.reduce((total, item) => {
            const matchingDetails = productDetails.find(details => details._id === item.product_id);
            if (matchingDetails) {
                const variantPrice = matchingDetails.priceVariants.find(
                    variant => variant.variant === item.variant
                );
                const price = variantPrice ? variantPrice.price : 0;
                total += price * (quantities[item._id] || 1);
            }
            return total;
        }, 0);
    };

    const tax = () => {
        return cartData.length > 0 ? calculateSubtotal() * 0.05 : 0;
    };

    const shippingCost = () => {
        if (cartData.length === 0) return 0;

        // Calculate the total quantity of items
        const totalQuantity = cartData.reduce((sum, item) => sum + (quantities[item._id] || 1), 0);

        return totalQuantity * 10;
    };



    const total = calculateSubtotal() + tax() + shippingCost();

    if (!user) return <LoadingComponent />;
    if (isLoading) return <LoadingComponent />;
    if (error) return <p>Error loading cart: {error.message}</p>;
    return (
        <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden md:px-0 px-4">
            <div className="lg:ml-32 lg:mr-40 mt-14">
                <div className="lg:grid lg:grid-cols-2 my-[72px] gap-24">
                    <div className="col-span-1 md:pl-10 border-2 py-8 px-6 rounded-xl border-[#F6F6F6]">
                        <p className="text-lg font-bold pb-5">Summary</p>
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
                                    <div key={data._id} className="flex justify-between p-4 my-4 rounded-lg bg-[#F6F6F6] items-center">
                                        <img className="h-full w-[40px]" src={image} alt="" />
                                        <div className="flex justify-between items-center w-full">
                                            <Link to={`/${data.type}/${data.product_id}`}><p className="font-semibold pl-4 text-sm">{Model}</p></Link>
                                            <p className="text-sm font-bold">${updatedPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                        <span className="label-text-alt text-gray-500 px-2">Address</span>
                        <input type="text" placeholder="Type here" className="input input-bordered input-sm w-full h-12 my-1 mb-4" />
                        <span className="label-text-alt text-gray-500 px-2">Shipment method</span> <br />
                        <select className="select select-bordered w-full h-12 my-1">
                            <option disabled selected>Choose Shipment Method</option>
                            <option>Free ( 3 - 5 working days )</option>
                            <option> $10 - ASAP - As Soon As Possible ( 1 - 2 days maximum )</option>
                        </select>
                        <div className="pt-7 flex justify-between">
                            <p className="text-sm font-semibold ">Subtotal</p>
                            <p className="text-sm font-semibold">${calculateSubtotal().toFixed(2)}</p>
                        </div>
                        <div className="pt-4 flex justify-between">
                            <p className="text-sm text-gray-600 font-medium">Estimated Tax</p>
                            <p className="text-sm">${tax().toFixed(2)}</p>
                        </div>
                        <div className="pt-4 flex justify-between">
                            <p className="text-sm text-gray-600 font-medium">Estimated shipping Handling</p>
                            <p className="text-sm">${shippingCost().toFixed(2)}</p>
                        </div>
                        <div className="pt-5 flex justify-between">
                            <p className="text-sm font-semibold ">Total</p>
                            <p className="text-sm font-semibold">${total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="col-span-1 ">
                        <p className="font-bold">Payment</p>


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

                            <p className="btn bg-black text-xs text-white mt-14">Checkout</p>
                        </label>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Checkout;
