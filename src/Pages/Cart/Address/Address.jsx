/* eslint-disable react-hooks/exhaustive-deps */
import { FaShippingFast } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiContactlessPayment } from "react-icons/pi";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../SharedComponents/Loading/LoadingComponent";
import { Link } from "react-router-dom";


const Address = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [userData, setUserData] = useState([]);

    // Fetch user data based on the email
    const fetchUserData = async () => {
        if (!user?.email) {
            alert("User is not logged in");
            return;
        }
        try {
            const response = await axiosCommon.get(`/users?email=${user.email}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("An error occurred while fetching user data.");
        }
    };

    useEffect(() => {
        if (user?.email && !loading) {
            fetchUserData();
        }
    }, [user?.email, loading]);

    // Handle form submission
    const onSubmit = async (data) => {
        if (!user?.email) {
            alert("User is not logged in");
            return;
        }

        const addressData = {
            email: user.email,
            ...data,
        };

        try {
            const response = await axiosCommon.post("/users", addressData);

            if (response.data.message === "User data added successfully") {
                alert("Address added successfully.");
            } else {
                alert("Address updated successfully.");
            }

            reset();
            await fetchUserData();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form.");
        }
    };

    if (loading) {
        return <LoadingComponent />;
    }

    if (!user?.email) {
        return <LoadingComponent />
    }

    return (
        <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden md:px-0 px-4">
            <div className="lg:ml-40 lg:mr-40 mt-14">
                <div className="flex items-center justify-between pb-16 px-5">
                    <div className="flex items-center gap-1">
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
                    <div className="flex items-center gap-1 opacity-50">
                        <p className="bg-black p-1 rounded-full"><PiContactlessPayment size={15} color="white" /></p>
                        <div>
                            <p className="text-[10px] font-medium">Step 3</p>
                            <p className="text-sm font-bold">Payment</p>
                        </div>
                    </div>
                </div>
                <p className="font-bold">Select Address</p>

                {
                    userData.map((user) => (
                        <div className="my-10 bg-gray-100 p-4 rounded-lg " key={user._id}>
                            <div className="flex gap-2">
                                <input type="radio" name="radio-1" className="radio" defaultChecked />
                                <div>
                                    <p className="font-bold text-sm pb-2">{user.street}</p>
                                    <p className="text-xs font-semibold pb-1">{user.city}, {user.postal}, {user.state}</p>
                                    <p className="text-xs font-semibold">{user.phone}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div>
                    <form className="space-y-4 py-10" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium">Street Address</label>
                            <input
                                type="text"
                                id="street"
                                placeholder="Enter street address"
                                className="input input-bordered w-full mt-2"
                                {...register("street", { required: "Street address is required" })}
                            />
                            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="Enter city"
                                className="input input-bordered w-full mt-2"
                                {...register("city", { required: "City is required" })}
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                        <div className="flex gap-4">
                            <div className="w-full">
                                <label htmlFor="state" className="block text-sm font-medium">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    placeholder="Enter state"
                                    className="input input-bordered w-full mt-2"
                                    {...register("state", { required: "State is required" })}
                                />
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                            </div>
                            <div className="w-full">
                                <label htmlFor="postal" className="block text-sm font-medium">Postal Code</label>
                                <input
                                    type="number"
                                    id="postal"
                                    placeholder="Enter postal code"
                                    className="input input-bordered w-full mt-2"
                                    {...register("postal", {
                                        required: "Postal code is required",
                                        pattern: { value: /^\d{5}$/, message: "Invalid postal code format" },
                                    })}
                                />
                                {errors.postal && <p className="text-red-500 text-xs mt-1">{errors.postal.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter phone number"
                                className="input input-bordered w-full mt-2"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\+?(\d{1,3})?[-. (]*\d{3}[-. )]*\d{3}[-. ]*\d{4}$/,
                                        message: "Invalid phone number format"
                                    }
                                })}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                        <button type="submit" className="btn bg-black text-white my-10 w-full">Save Address</button>
                    </form>
                    <div className="flex gap-5 justify-end mb-10">
                        <Link to='/cart'><p className="btn btn-outline px-16">Back</p></Link>
                        <Link to='/cart/shipping'><p className="btn btn-outline px-16 bg-black text-white">Next</p></Link>
                    </div>
                </div>



            </div>
        </div >
    );
};

export default Address;
