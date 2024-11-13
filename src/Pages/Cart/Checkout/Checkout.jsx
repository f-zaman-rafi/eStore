/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { PiContactlessPayment } from "react-icons/pi";
import { useCart } from "../../../Providers/Cart/CartProvider";




const Checkout = () => {

    const { cartData, productDetails, quantities, calculateSubtotal, tax, shippingCost, total, currentAddress, shipmentMethod } = useCart();

    const [activeTab, setActiveTab] = useState('creditCard');

    // credit card
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        if (name === 'number' && value.length > 16) return;
        if (name === 'expiry' && value.length > 4) return;
        if (name === 'cvc' && value.length > 4) return;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const ultimateTotal = total + (shipmentMethod === "AFAP" ? 10 : 0)


    return (
        <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden md:px-0 px-4">
            <div className="lg:ml-40 lg:mr-40 mt-14">
                <div className="flex items-center justify-between py-5 px-5">
                    <div className="flex items-center gap-1 opacity-50">
                        <p className="bg-black p-1 rounded-full"><FaLocationDot size={15} color="white" /></p>
                        <div>
                            <p className="text-[10px] font-medium">Step 1</p>
                            <p className="text-sm font-bold">Address</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-50">
                        <p className="bg-black p-1 rounded-full"><FaShippingFast size={15} color="white" /></p>
                        <div>
                            <p className="text-[10px] font-medium">Step 2</p>
                            <p className="text-sm font-bold">Shipping</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="bg-black p-1 rounded-full"><PiContactlessPayment size={15} color="white" /></p>
                        <div>
                            <p className="text-[10px] font-medium">Step 3</p>
                            <p className="text-sm font-bold">Payment</p>
                        </div>
                    </div>

                </div>
                <div className="lg:grid lg:grid-cols-2 my-[72px] gap-24">
                    <div className="col-span-1 px-10 border-2 lg:py-8 lg:px-6 rounded-xl border-[#F6F6F6]">
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
                        <span className="label-text-alt text-gray-500 ">Address</span>
                        <p className="py-3 text-sm font-semibold">{currentAddress.street}, {currentAddress.postal} {currentAddress.city}, {currentAddress.state}</p>

                        <span className="label-text-alt text-gray-500">Shipment method</span> <br />
                        <p className="py-3 text-sm font-semibold ">{shipmentMethod === "AFAP" ? "As Fast As Possible" : shipmentMethod}</p>

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
                        <div className="pt-4 flex justify-between">
                            <p className="text-sm text-gray-600 font-medium">Shipping Method - <span className="font-bold">{shipmentMethod}</span></p>
                            <p className="text-sm">${shipmentMethod === 'AFAP' ? "10.00" : "0.00"}</p>
                        </div>
                        <div className="pt-5 flex justify-between">
                            <p className="text-sm font-semibold ">Total</p>
                            <p className="text-sm font-semibold">${ultimateTotal.toFixed(2)}</p>
                        </div>
                    </div>



                    {/* Payment Methods */}
                    <div className="col-span-1">
                        <p className="font-extrabold">Payment</p>
                        {/* Tabs */}
                        <div role="tablist" className="tabs font-bold gap-10 my-5 justify-start">
                            <a
                                role="tab"
                                className={`tab p-0 border-b-2 ${activeTab === "creditCard" ? "tab-active" : "text-gray-300 border-none"}`}
                                onClick={() => setActiveTab("creditCard")}
                            >
                                Credit Card
                            </a>
                            <a
                                role="tab"
                                className={`tab p-0 border-b-2 ${activeTab === "paypal" ? "tab-active" : "text-gray-300 border-none"}`}
                                onClick={() => setActiveTab("paypal")}
                            >
                                PayPal
                            </a>
                            <a
                                role="tab"
                                className={`tab p-0 border-b-2 ${activeTab === "wise" ? "tab-active" : "text-gray-300 border-none"}`}
                                onClick={() => setActiveTab("wise")}
                            >
                                Wise
                            </a>
                        </div>

                        {/* Payment Form Display Based on Tab */}
                        {activeTab === "creditCard" && (
                            <div>
                                <Cards
                                    number={state.number}
                                    expiry={state.expiry}
                                    cvc={state.cvc}
                                    name={state.name}
                                    focused={state.focus}
                                />
                                <form>
                                    <input
                                        type="number"
                                        placeholder="Card Number"
                                        name="number"
                                        value={state.number}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        className="input input-bordered w-full mt-10 uppercase"
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Cardholder Name"
                                        value={state.name}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        className="input input-bordered w-full mt-5 uppercase"
                                    />
                                    <div className="flex justify-between pt-5 gap-4">
                                        <input
                                            type="number"
                                            placeholder="Exp.Date (eg. mm/yy)"
                                            name="expiry"
                                            value={state.expiry}
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                            className="input input-bordered w-full uppercase"
                                        />
                                        <input
                                            type="number"
                                            placeholder="CVC"
                                            name="cvc"
                                            value={state.cvc}
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="mt-14 flex justify-between gap-3">
                                        <div className="flex-1"><Link to='/cart/shipping'><p className="btn btn-wide btn-outline">Back</p></Link></div>
                                        <p className="btn bg-black text-xs text-white flex-1">Checkout</p>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === "paypal" && (
                            <div>
                                <p className="text-center mt-40">PayPal payment method currently not available</p>
                            </div>
                        )}

                        {activeTab === "wise" && (
                            <div>
                                <p className="text-center mt-40">Wise payment method currently not available</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Checkout;
