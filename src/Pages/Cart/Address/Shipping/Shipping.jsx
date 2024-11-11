import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiContactlessPayment } from "react-icons/pi";
import { Link } from "react-router-dom";

const Shipping = () => {
    // Local state to store the selected shipping method
    const [shipmentMethod, setShipmentMethod] = useState("");

    // Handle change in shipment method
    const handleShipmentChange = (event) => {
        setShipmentMethod(event.target.value);
    };

    return (
        <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden md:px-0 px-4">
            <div className="lg:ml-40 lg:mr-40 mt-14">
                <div className="flex items-center justify-between pb-16 px-5">
                    <div className="flex items-center gap-1 opacity-50">
                        <p className="bg-black p-1 rounded-full"><FaLocationDot size={15} color="white" /></p>
                        <div>
                            <p className="text-[10px] font-medium">Step 1</p>
                            <p className="text-sm font-bold">Address</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="bg-black p-1 rounded-full"><FaShippingFast size={15} color="white" /></p>
                        <div>
                            <p className="text-[10px] font-medium">Step 2</p>
                            <p className="text-sm font-bold">Shipping</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-50">
                        <p className="bg-black p-1 rounded-full"><PiContactlessPayment size={15} color="white" /></p>
                        <div>
                            <p className="text-[10px] font-medium">Step 3</p>
                            <p className="text-sm font-bold">Payment</p>
                        </div>
                    </div>
                </div>
                <p className="font-bold">Shipment Method</p>
                <div className="space-y-3 py-5">
                    <div
                        className={`flex items-center gap-2 border-[1px] p-4 rounded-lg ${shipmentMethod !== "regular" ? "opacity-50" : ""}`}
                    >
                        <input
                            className="radio text-black checked:bg-black"
                            type="radio"
                            id="regular"
                            value="regular"
                            checked={shipmentMethod === "regular"}
                            onChange={handleShipmentChange}
                        />
                        <div className="flex items-center justify-between w-full">
                            <div className="flex gap-5 items-center">
                                <p htmlFor="regular" className="text-sm font-bold pl-2">Free</p>
                                <p htmlFor="regular" className="text-xs font-semibold">Regular shipment</p>
                            </div>
                            <p htmlFor="regular" className="text-sm font-bold">3-5 days</p>
                        </div>
                    </div>

                    <div
                        className={`flex items-center gap-2 border-[1px] p-4 rounded-lg ${shipmentMethod !== "afap" ? "opacity-50" : ""}`}
                    >
                        <input
                            className="radio text-black checked:bg-black"
                            type="radio"
                            id="afap"
                            value="afap"
                            checked={shipmentMethod === "afap"}
                            onChange={handleShipmentChange}
                        />
                        <div className="flex items-center justify-between w-full">
                            <div className="flex gap-5 items-center">
                                <p htmlFor="afap" className="text-sm font-bold pl-2">$10.00</p>
                                <p htmlFor="afap" className="text-xs font-semibold">AFAP - As Fast As Possible</p>
                            </div>
                            <p htmlFor="afap" className="text-sm font-bold">1-2 days</p>
                        </div>
                    </div>

                    <div
                        className={`flex items-center gap-2 border-[1px] p-4 rounded-lg ${shipmentMethod !== "schedule" ? "opacity-50" : ""}`}
                    >
                        <input
                            className="radio text-black checked:bg-black"
                            type="radio"
                            id="schedule"
                            value="schedule"
                            checked={shipmentMethod === "schedule"}
                            onChange={handleShipmentChange}
                        />
                        <div className="flex items-center justify-between w-full">
                            <div className="flex gap-5 items-center">
                                <p htmlFor="schedule" className="text-sm font-bold pl-2">Scheduled</p>
                                <p htmlFor="schedule" className="text-xs font-semibold">Regular shipment</p>
                            </div>
                            <p htmlFor="schedule" className="text-sm font-bold">Select Date</p>
                        </div>
                    </div>
                </div>


                <div className="flex gap-5 justify-end my-10">
                    <Link to='/cart/address'><p className="btn btn-outline px-16">Back</p></Link>
                    <Link to='/cart/checkout'><p className="btn btn-outline px-16 bg-black text-white">Next</p></Link>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
