import { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

// Access environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;


const AddProduct = () => {
    // Destructure functions and objects from useForm
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State to manage the selected category
    const [selectedCategory, setSelectedCategory] = useState('');

    // Axios instance for API calls
    const axiosCommon = useAxiosCommon();
    // Navigation function to redirect after successful submission
    const navigate = useNavigate();

    // State to manage visibility of the 'Specify Color' input field when 'Other' color is selected
    const [otherColorVisible, setOtherColorVisible] = useState(false);


    // Handle form submission
    const onSubmit = async (data) => {
        try {
            console.log(data);

            // Image upload
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append("upload_preset", UPLOAD_PRESET);

            const photoRes = await axiosCommon.post(UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Add the uploaded image URL to data
            data.image = photoRes.data.secure_url;

            // Submit product data
            const res = await axiosCommon.post('/products', data);
            console.log(res);

            // Check if the insertion was successful
            if (res.data.insertedId) {
                console.log('Product added to the database successfully');
                toast.success('Product added successfully');
                navigate('/'); // Redirect to home page
            }
        }
        catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product');
        }
    };

    // Handle category change and update the state
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="pb-10 lg:px-20 px-10 my-10 min-h-[80vh] max-w-[1440px] mx-auto font-inter overflow-x-hidden">
            <Helmet>
                <title>Add Product | Cyber</title>
            </Helmet>
            <h1 className="text-2xl font-medium text-gray-800 dark:text-white px-4 py-10">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Category and Status Selection */}
                <div className="flex flex-wrap gap-6">
                    {/* Category Selection */}
                    <div className="form-control flex-1">
                        <label htmlFor="category" className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            id="category"
                            {...register("category", { required: "Category is required" })}
                            onChange={handleCategoryChange}
                            className="input input-bordered"
                        >
                            <option value="">Select a category</option>
                            <option value="phone">Phone</option>
                            <option value="smart-watch">Smart Watch</option>
                            <option value="camera">Camera</option>
                            <option value="headphone">Headphone</option>
                            <option value="computer">Computer</option>
                            <option value="gaming-device">Gaming Device</option>
                        </select>
                        {errors.category && (
                            <span className="text-red-500 text-xs mt-2 ml-2">
                                {errors.category.message}
                            </span>
                        )}
                    </div>

                    {/* Status Selection */}
                    <div className="form-control flex-1">
                        <label htmlFor="status" className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <select
                            id="status"
                            {...register("status", { required: "Status is required" })}
                            className="input input-bordered"
                        >
                            <option value="" selected disabled>Select a status</option>
                            <option value="regular">Regular</option>
                            <option value="new_arrival">New Arrival</option>
                            <option value="best_seller">Best Seller</option>
                            <option value="featured_product">Featured Product</option>
                        </select>
                        {errors.status && (
                            <span className="text-red-500 text-xs mt-2 ml-2">
                                {errors.status.message}
                            </span>
                        )}
                    </div>
                </div>


                {/* Conditional Fields */}

                {selectedCategory !== '' && (

                    <div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-5 gap-x-10 pt-10">


                            {/* Brand Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="brand" className="label">
                                    <span className="label-text">Brand</span>
                                </label>
                                <input
                                    id="brand"
                                    type="text"
                                    {...register("brand", { required: "Brand is required" })}
                                    placeholder="Enter brand name"
                                    className="input input-bordered w-full"
                                />
                                {errors.brand && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.brand.message}
                                    </span>
                                )}
                            </div>


                            {/* Model Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="model" className="label">
                                    <span className="label-text">Model</span>
                                </label>
                                <input
                                    id="model"
                                    type="text"
                                    {...register("model", { required: "Model is required" })}
                                    placeholder="Enter model name"
                                    className="input input-bordered w-full"
                                />
                                {errors.model && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.model.message}
                                    </span>
                                )}
                            </div>

                            {/* Image Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="image" className="label">
                                    <span className="label-text">Upload a file</span>
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    {...register("image", { required: "Image is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.image && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.image.message}
                                    </span>
                                )}
                            </div>

                            {/* Processor Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="processor" className="label">
                                    <span className="label-text">Processor</span>
                                </label>
                                <input
                                    id="processor"
                                    type="text"
                                    {...register("processor", { required: "Processor is required" })}
                                    placeholder="Enter processor details"
                                    className="input input-bordered w-full"
                                />
                                {errors.processor && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.processor.message}
                                    </span>
                                )}
                            </div>

                            {/* Storage Selection */}

                            <div className="form-control mb-4">
                                <label htmlFor="storage" className="label">
                                    <span className="label-text">Storage</span>
                                </label>
                                <select
                                    id="storage"
                                    {...register("storage", { required: "Storage is required" })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="" selected disabled>Select Storage Capacity</option>
                                    <option value="32GB">32GB</option>
                                    <option value="64GB">64GB</option>
                                    <option value="128GB">128GB</option>
                                    <option value="256GB">256GB</option>
                                    <option value="512GB">512GB</option>
                                    <option value="1TB">1TB</option>
                                    <option value="2TB">2TB</option>
                                    <option value="4TB">4TB</option>
                                    <option value="8TB">8TB</option>
                                </select>
                                {errors.storage && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.storage.message}
                                    </span>
                                )}
                            </div>


                            {/* Display Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="display" className="label">
                                    <span className="label-text">Display</span>
                                </label>
                                <input
                                    id="display"
                                    type="text"
                                    {...register("display", { required: "Display is required" })}
                                    placeholder="Enter display details"
                                    className="input input-bordered w-full"
                                />
                                {errors.display && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.display.message}
                                    </span>
                                )}
                            </div>

                            {/* RAM Input Field */}

                            {selectedCategory !== 'camera' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="ram" className="label">
                                        <span className="label-text">RAM</span>
                                    </label>
                                    <input
                                        id="ram"
                                        type="text"
                                        {...register("ram", { required: "RAM is required" })}
                                        placeholder="Enter RAM details"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.ram && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.ram.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Graphics Input Field */}

                            {(selectedCategory === 'computer' || selectedCategory === 'gaming-device') && (
                                <div className="form-control mb-4">
                                    <label htmlFor="graphics" className="label">
                                        <span className="label-text">Graphics</span>
                                    </label>
                                    <input
                                        id="graphics"
                                        type="text"
                                        {...register("graphics")}
                                        placeholder="Enter GPU model"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.graphics && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.graphics.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* OS Selection */}

                            {(selectedCategory === 'phone' ||
                                selectedCategory === 'smart-watch' ||
                                selectedCategory === 'laptop') && (
                                    <div className="form-control mb-4">
                                        <label htmlFor="os" className="label">
                                            <span className="label-text">OS</span>
                                        </label>
                                        <select
                                            id="os"
                                            {...register("os", { required: "OS is required" })}
                                            className="select select-bordered w-full"
                                        >
                                            <option value="" selected disabled>Select OS</option>
                                            <option value="iOS">iOS</option>
                                            <option value="Android">Android</option>
                                            <option value="Windows">Windows</option>
                                            <option value="macOS">macOS</option>
                                            <option value="watchOS">watchOS</option>
                                            <option value="Wear OS">Wear OS</option>
                                            <option value="Linux">Linux</option>
                                        </select>
                                        {errors.os && (
                                            <span className="text-red-500 text-xs mt-2">
                                                {errors.os.message}
                                            </span>
                                        )}
                                    </div>
                                )}


                            {/* Type Dropdown Field */}

                            {(selectedCategory === 'camera' ||
                                selectedCategory === 'headphones' ||
                                selectedCategory === 'gaming-device') && (
                                    <div className="form-control mb-4">
                                        <label htmlFor="type" className="label">
                                            <span className="label-text">Type</span>
                                        </label>
                                        <select
                                            id="type"
                                            {...register("type", { required: "Type is required" })}
                                            className="input input-bordered w-full"
                                        >
                                            {selectedCategory === 'camera' && (
                                                <>
                                                    <option value="" selected disabled>Select type</option>
                                                    <option value="DSLR">DSLR</option>
                                                    <option value="Mirrorless">Mirrorless</option>
                                                    <option value="Point-and-Shoot">Point-and-Shoot</option>
                                                    <option value="Action Camera">Action Camera</option>
                                                </>
                                            )}
                                            {selectedCategory === 'headphones' && (
                                                <>
                                                    <option value="" selected disabled>Select type</option>
                                                    <option value="Over-Ear">Over-Ear</option>
                                                    <option value="On-Ear">On-Ear</option>
                                                    <option value="In-Ear">In-Ear</option>
                                                    <option value="True Wireless">True Wireless</option>
                                                </>
                                            )}
                                            {selectedCategory === 'gaming-device' && (
                                                <>
                                                    <option value="" selected disabled>Select type</option>
                                                    <option value="Console">Console</option>
                                                    <option value="Handheld">Handheld</option>
                                                    <option value="PC">PC</option>
                                                    <option value="VR">VR</option>
                                                </>
                                            )}
                                        </select>
                                        {errors.type && (
                                            <span className="text-red-500 text-xs mt-2">
                                                {errors.type.message}
                                            </span>
                                        )}
                                    </div>
                                )}


                            {/* Battery Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="battery" className="label">
                                    <span className="label-text">Battery</span>
                                </label>
                                <input
                                    id="battery"
                                    type="text"
                                    {...register("battery", { required: "Battery is required" })}
                                    placeholder="Enter battery details"
                                    className="input input-bordered w-full"
                                />
                                {errors.battery && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.battery.message}
                                    </span>
                                )}
                            </div>

                            {/*  Battery Life */}

                            {selectedCategory === 'headphone' && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Battery Life</span>
                                    </label>
                                    <select
                                        {...register("batteryLife")}
                                        className="select select-bordered w-full"
                                        defaultValue=""
                                    >
                                        <option value="" selected disabled>Select Battery Life</option>
                                        <option value="Up to 5 hours">Up to 5 hours</option>
                                        <option value="5-10 hours">5-10 hours</option>
                                        <option value="10-20 hours">10-20 hours</option>
                                        <option value="More than 20 hours">More than 20 hours</option>
                                    </select>
                                    {errors.batteryLife && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.batteryLife.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Frequency Response */}

                            {selectedCategory === 'headphone' && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Frequency Response</span>
                                    </label>
                                    <select
                                        {...register("frequencyResponse")}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="" selected disabled>Select Frequency</option>
                                        <option value="20Hz - 20kHz">20Hz - 20kHz</option>
                                        <option value="18Hz - 22kHz">18Hz - 22kHz</option>
                                        <option value="15Hz - 25kHz">15Hz - 25kHz</option>
                                        <option value="10Hz - 30kHz">10Hz - 30kHz</option>
                                    </select>
                                </div>
                            )}


                            {/* Warranty Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="warranty" className="label">
                                    <span className="label-text">Warranty</span>
                                </label>
                                <input
                                    id="warranty"
                                    type="text"
                                    {...register("warranty", { required: "Warranty is required" })}
                                    placeholder="Enter warranty details"
                                    className="input input-bordered w-full"
                                />
                                {errors.warranty && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.warranty.message}
                                    </span>
                                )}
                            </div>

                            {/* Noise Cancellation */}

                            {selectedCategory === 'headphone' && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Noise Cancellation</span>
                                    </label>
                                    <label className="flex items-center py-3">
                                        <input
                                            type="checkbox"
                                            {...register("noiseCancellation")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Noise Cancellation</span>
                                    </label>
                                </div>
                            )}

                            {/* Impedance */}

                            {selectedCategory === 'headphone' && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Impedance</span>
                                    </label>
                                    <label className="flex items-center py-3">
                                        <input
                                            type="checkbox"
                                            {...register("impedance")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Impedance</span>
                                    </label>
                                </div>
                            )}

                            {/* Microphone */}

                            {selectedCategory === 'headphone' && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Microphone</span>
                                    </label>
                                    <label className="flex items-center py-3">
                                        <input
                                            type="checkbox"
                                            {...register("microphone")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Microphone</span>
                                    </label>
                                </div>
                            )}

                            {/* Water Resistance */}

                            {selectedCategory === 'smart-watch' && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Water Resistance</span>
                                    </label>
                                    <select
                                        {...register("waterResistance", { required: "Water resistance is required" })}
                                        className="select select-bordered"
                                    >
                                        <option value="" selected disabled>Select Water Resistance</option>
                                        <option value="none">N/A</option>
                                        <option value="IP67">IP67 - Dust tight and water-resistant</option>
                                        <option value="IP68">IP68 - Dust tight and water-resistant to a greater depth</option>
                                        <option value="IPX7">IPX7 - Protected against water immersion</option>
                                        <option value="IPX8">IPX8 - Protected against prolonged water immersion</option>
                                    </select>
                                    {errors.waterResistance && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.waterResistance.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Lens Compatibility */}

                            {selectedCategory === 'camera' && (

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Shutter Speed</span>
                                    </label>
                                    <select
                                        {...register("shutterSpeed")}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="" selected disabled>Select Shutter Speed</option>
                                        <option value="1/4000s">1/4000s</option>
                                        <option value="1/2000s">1/2000s</option>
                                        <option value="1/1000s">1/1000s</option>
                                        <option value="1/500s">1/500s</option>
                                        <option value="1/250s">1/250s</option>
                                        <option value="1/125s">1/125s</option>
                                        <option value="1/60s">1/60s</option>
                                        <option value="1/30s">1/30s</option>
                                    </select>
                                </div>


                            )}




                        </div>


                        {/* checkbox */}

                        <div className='space-y-5'>

                            {/* Sensors */}

                            {selectedCategory === 'smart-watch' && (
                                <div className="form-control">
                                    <label className="label py-5">
                                        <span className="label-text">Sensors</span>
                                    </label>
                                    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Heart Rate Monitor"
                                                {...register("sensors")}
                                                className="mr-2 checkbox"
                                            />
                                            Heart Rate Monitor
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="GPS"
                                                {...register("sensors")}
                                                className="mr-2 checkbox"
                                            />
                                            GPS
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Accelerometer"
                                                {...register("sensors")}
                                                className="mr-2 checkbox"
                                            />
                                            Accelerometer
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Gyroscope"
                                                {...register("sensors")}
                                                className="mr-2 checkbox"
                                            />
                                            Gyroscope
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Barometer"
                                                {...register("sensors")}
                                                className="mr-2 checkbox"
                                            />
                                            Barometer
                                        </label>
                                    </div>
                                    {errors.sensors && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.sensors.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* lens compatibility */}

                            {selectedCategory === 'camera' && (

                                <div className="form-control">
                                    <label className="label pt-14 pb-5">
                                        <span className="label-text">Lens Compatibility</span>
                                    </label>
                                    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value="Canon EF"
                                                {...register("lensCompatibility")}
                                                className="checkbox"
                                            />
                                            <span className="text-gray-600">Canon EF</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value="Nikon F"
                                                {...register("lensCompatibility")}
                                                className="checkbox"
                                            />
                                            <span className="text-gray-600">Nikon F</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value="Sony E"
                                                {...register("lensCompatibility")}
                                                className="checkbox"
                                            />
                                            <span className="text-gray-600">Sony E</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value="Micro Four Thirds"
                                                {...register("lensCompatibility")}
                                                className="checkbox"
                                            />
                                            <span className="text-gray-600">Micro Four Thirds</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Compatibility */}

                            {selectedCategory === 'smart-watch' && (
                                <div className="form-control mb-4">
                                    <label className="label py-5">
                                        <span className="label-text">Compatibility</span>
                                    </label>
                                    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Android"
                                                {...register("compatibility")}
                                                className="mr-2 checkbox"
                                            />
                                            Android
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="iOS"
                                                {...register("compatibility")}
                                                className="mr-2 checkbox"
                                            />
                                            iOS
                                        </label>
                                    </div>
                                    {errors.compatibility && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.compatibility.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* connectivity */}

                            <div className="form-control">
                                <label className="label py-5">
                                    <span className="label-text">Connectivity</span>
                                </label>
                                <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Wi-Fi"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Wi-Fi</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Bluetooth"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Bluetooth</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="5G"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">5G</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="4G"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">4G</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="3G"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">3G</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="NFC"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">NFC</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="USB-C"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">USB-C</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="USB-A"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">USB-A</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="HDMI"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">HDMI</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Ethernet"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Ethernet</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Thunderbolt"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Thunderbolt</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Infrared"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Infrared</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="GPS"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">GPS</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Cellular"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Cellular</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Zigbee"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Zigbee</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Z-Wave"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Z-Wave</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="FM Radio"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">FM Radio</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="DLNA"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">DLNA</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="A2DP"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">A2DP</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="MHL"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">MHL</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Miracast"
                                            {...register("connectivity")}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">Miracast</span>
                                    </label>
                                </div>
                                {errors.connectivity && (
                                    <span className="text-red-500 text-xs mt-2 ml-2">
                                        {errors.connectivity.message}
                                    </span>
                                )}
                            </div>

                            {/* color */}

                            {(selectedCategory === 'phone' || selectedCategory === 'smart-watch' || selectedCategory === 'headphone') && (
                                <div className="form-control">
                                    <label className="label py-5">
                                        <span className="label-text">Color</span>
                                    </label>
                                    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Black"
                                                {...register("color")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Black</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="White"
                                                {...register("color")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">White</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Silver"
                                                {...register("color")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Silver</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Gold"
                                                {...register("color")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Gold</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Blue"
                                                {...register("color")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Blue</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Red"
                                                {...register("color")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Red</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Other"
                                                {...register("color")}
                                                onChange={(e) => setOtherColorVisible(e.target.checked)}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Other</span>
                                        </label>
                                        {otherColorVisible && (
                                            <div className="form-control mt-2">
                                                <label className="label">
                                                    <span className="label-text">Specify Color</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    {...register("otherColor", { required: "Please specify the color" })}
                                                    placeholder="Enter color"
                                                    className="input input-bordered w-full"
                                                />
                                                {errors.otherColor && (
                                                    <span className="text-red-500 text-xs mt-2 ml-2">
                                                        {errors.otherColor.message}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {errors.color && (
                                        <span className="text-red-500 text-xs mt-2 ml-2">
                                            {errors.color.message}
                                        </span>
                                    )}
                                </div>
                            )}


                            {/* Controllers */}

                            {selectedCategory === 'gaming-device' && (
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Controllers</span>
                                    </label>
                                    <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Wired Controller"
                                                {...register("controllers")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Wired Controller</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Wireless Controller"
                                                {...register("controllers")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Wireless Controller</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Gamepad"
                                                {...register("controllers")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Gamepad</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="Joystick"
                                                {...register("controllers")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">Joystick</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                value="VR Controller"
                                                {...register("controllers")}
                                                className="checkbox"
                                            />
                                            <span className="ml-2">VR Controller</span>
                                        </label>
                                    </div>
                                    {errors.controllers && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.controllers.message}
                                        </span>
                                    )}
                                </div>
                            )}

                        </div>

                    </div>
                )}

                {selectedCategory !== '' && (
                    <div className="text-center py-10 ">
                        <input className="btn btn-outline btn-wide btn-circle" type="submit" />
                    </div>
                )}
            </form>
        </div>
    );
};

export default AddProduct;
