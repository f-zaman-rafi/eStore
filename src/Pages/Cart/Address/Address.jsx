import { FaShippingFast } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiContactlessPayment } from "react-icons/pi";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import LoadingComponent from "../../../SharedComponents/Loading/LoadingComponent";
import { Link } from "react-router-dom";
import { useCart } from "../../../Providers/Cart/CartProvider";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react"; // import useState to manage state

const Address = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { userData = [] } = useCart();

    // State to track the address being edited
    const [editingAddress, setEditingAddress] = useState(null);

    // Handle form submission
    const onSubmit = async (data) => {
        if (!user?.email) {
            alert("User is not logged in");
            return;
        }

        const addressData = {
            email: user?.email,
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
            setEditingAddress(null); // Close the form after saving
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form.");
        }
    };

    if (loading) {
        return <LoadingComponent />;
    }

    if (!user?.email) {
        return <LoadingComponent />;
    }

    const handleEditClick = (user) => {
        setEditingAddress(user); // Set the user to edit
        // Populate the form with selected user data
        setValue("street", user.street);
        setValue("city", user.city);
        setValue("state", user.state);
        setValue("postal", user.postal);
        setValue("phone", user.phone);
    };

    return (
        <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden md:px-0 px-4">
            <div className="lg:ml-40 lg:mr-40 mt-14">
                {/* Step indicators */}
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
                {/* Title */}
                <p className="font-bold">Select Address</p>

                {userData.map((user) => (
                    <div className="my-10 bg-gray-100 p-5 rounded-lg flex items-center justify-between" key={user._id}>
                        <div className="flex gap-2">
                            <input
                                type="radio"
                                name="radio-1"
                                className="radio"
                                defaultChecked={editingAddress?._id === user._id} // Show checked if it's the currently edited address
                            />
                            <div>
                                <p className="font-bold text-sm pb-2">{user.street}</p>
                                <p className="text-xs font-semibold pb-1">{user.city}, {user.postal}, {user.state}</p>
                                <p className="text-xs font-semibold">{user.phone}</p>
                            </div>
                        </div>
                        <div>
                            <FaRegEdit
                                className="cursor-pointer"
                                size={20}
                                onClick={() => handleEditClick(user)} // Set the address to edit
                            />
                        </div>
                    </div>
                ))}

                {editingAddress && (
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
                )}
            </div>
        </div>
    );
};

export default Address;
