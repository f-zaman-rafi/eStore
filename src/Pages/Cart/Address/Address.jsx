import { FaShippingFast } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiContactlessPayment } from "react-icons/pi";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import LoadingComponent from "../../../SharedComponents/Loading/LoadingComponent";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react"; // import useState to manage state
import { IoAddCircleSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import useCart from "../../../Hooks/useCart";


const Address = () => {
    const { user, loading } = useAuth();
    const axiosCommon = useAxiosCommon();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { userData = [], handleDeleteAddress, refetchAddress, setCurrentAddress } = useCart();
    const [editingAddress, setEditingAddress] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [error, setError] = useState("");

    // Handle form submission
    const onSubmit = async (data) => {
        if (!user?.email) {
            alert("User is not logged in");
            return;
        }

        const addressData = {
            email: user?.email,
            ...data
        };

        try {
            const response = await axiosCommon.post("/users", addressData);
            await refetchAddress();
            if (response.data.message === "User data added successfully") {
                toast.success("Address added successfully.");
            } else {
                toast.success("Address updated successfully.");
            }
            reset();
            setEditingAddress(null); // Close the form after saving
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form.");
        }
    };


    const handleRadioChange = (user) => {
        setSelectedAddress(user); // Track the selected address
        setError(""); // Clear error when an address is selected
    };

    const handleNextClick = async (e) => {
        if (!selectedAddress) {
            e.preventDefault(); // Prevent navigation
            setError("Please select an address before proceeding.");
            return;
        }
        setCurrentAddress(selectedAddress);
        localStorage.setItem('currentAddress', JSON.stringify(selectedAddress));
    };

    if (loading) {
        return <LoadingComponent />;
    }

    if (!user?.email) {
        return <LoadingComponent />;
    }

    const handleEditClick = (user) => {
        if (editingAddress && editingAddress._id === user._id) {
            // If the form is already visible and the same address is clicked, hide the form
            setIsFormVisible(false);
            setEditingAddress(null);
        } else {
            // Set the address to edit and show the form
            setEditingAddress(user);
            setIsFormVisible(true); // Ensure the form is visible when editing
            setValue("addressTitle", user.addressTitle);
            setValue("street", user.street);
            setValue("city", user.city);
            setValue("state", user.state);
            setValue("postal", user.postal);
            setValue("phone", user.phone);
        }
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

                {/* addresses */}
                {userData?.map((user) => (
                    <div className="my-10 bg-gray-100 p-5 rounded-lg flex items-center justify-between" key={user._id}>
                        <div className="flex gap-2">
                            <input
                                type="radio"
                                name="radio-1"
                                className="radio"
                                defaultChecked={editingAddress?._id === user._id}
                                onChange={() => handleRadioChange(user)}
                            />
                            <div>
                                <div className="flex gap-3">
                                    <p className="font-bold text-sm pb-2 ">{user.street}</p>
                                    <p className="font-medium text-xs pb-2"><span className="bg-black text-white text-center px-[5px] py-[2px] rounded-sm uppercase">{user.addressTitle}</span></p>
                                </div>
                                <p className="text-xs font-semibold pb-1">{user.city}, {user.postal}, {user.state}</p>
                                <p className="text-xs font-semibold">{user.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaRegEdit
                                className="cursor-pointer"
                                size={20}
                                onClick={() => handleEditClick(user)} // Set the address to edit
                            />
                            <p
                                className="border-[1px] border-transparent hover:border-gray-400 rounded-full text-xl text-center flex items-center mx-auto p-1 cursor-pointer"
                                style={{ transitionDuration: '500ms' }}
                                onClick={() => handleDeleteAddress(user._id)}
                            >
                                <ion-icon name="close-outline" />
                            </p>
                        </div>
                    </div>
                ))}

                {/* add new address */}
                <div className="my-10">
                    <div className="flex items-center gap-2">
                        {/* Left Divider */}
                        <div className="w-full h-[1px] border-t-0 relative">
                            <div
                                className="absolute inset-0 h-[1px] border-dotted"
                                style={{
                                    background: "linear-gradient(to left, rgba(0, 0, 0, 0) 0%, black 0%, rgba(0, 0, 0, 0) 100%)",
                                    backgroundSize: "700px", // Adjust for the dotted look
                                }}
                            ></div>
                        </div>

                        {/* Icon */}
                        <div>
                            <IoAddCircleSharp size={30} onClick={() => setIsFormVisible(!isFormVisible)} />
                        </div>

                        {/* Right Divider */}
                        <div className="w-full h-[1px] border-t-0 relative">
                            <div
                                className="absolute inset-0 h-[1px] border-dotted"
                                style={{
                                    background: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, black 0%, rgba(0, 0, 0, 0) 100%)",
                                    backgroundSize: "700px", // Adjust for the dotted look
                                }}
                            ></div>
                        </div>
                    </div>

                    <p className="text-center text-xs font-bold">Add New Address</p>
                </div>

                {/* form */}
                {(editingAddress || userData.length === 0 || isFormVisible) && (
                    <div>
                        <form className="space-y-4 py-10" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="addressTitle" className="block text-sm font-medium">Address Title</label>
                                <input
                                    type="text"
                                    id="addressTitle"
                                    placeholder="eg. Home, Office, Work"
                                    className="input input-bordered w-full mt-2"
                                    {...register("addressTitle", { required: "Address title is required" })}
                                />
                                {errors.addressTitle && <p className="text-red-500 text-xs mt-1">{errors.addressTitle.message}</p>}
                            </div>

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
                                        maxLength="5"
                                        {...register("postal", {
                                            required: "Postal code is required",
                                            pattern: {
                                                value: /^\d{5}$/,
                                                message: "Invalid postal code format"
                                            },
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
                    </div>
                )}

                <div className="flex gap-5 justify-end mb-10">
                    <Link to='/cart'><p className="btn btn-outline px-16">Back</p></Link>
                    <Link to='/cart/shipping' onClick={handleNextClick}><p className={`btn btn-outline px-16 ${!selectedAddress ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400 hover:border-white" : "bg-black"} text-white`}>Next</p></Link>
                </div>
            </div>
        </div>
    );
};

export default Address;
