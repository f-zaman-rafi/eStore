import { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const AddProduct = () => {
    // Destructure functions and objects from useForm
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State to manage the selected category
    const [selectedCategory, setSelectedCategory] = useState('');

    // Axios instance for API calls
    const axiosCommon = useAxiosCommon();
    // Navigation function to redirect after successful submission
    const navigate = useNavigate();

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            // Log form data for debugging
            console.log(data);

            // Post data to the server
            const res = await axiosCommon.post('/products', data);
            console.log(res);

            // Check if the insertion was successful
            if (res.data.insertedId) {
                console.log('Product added to the database successfully');
                navigate('/'); // Redirect to home page
                toast.success('Product added successfully');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product');
        }
    };

    // Handle category change and update the state
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="pb-10 mx-20 my-10">
            <Helmet>
                <title>Add Product | Cyber</title>
            </Helmet>
            <h1 className="text-lg font-medium text-gray-800 dark:text-white px-4 py-10">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Category Selection */}
                <div className="form-control lg:w-2/6">
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

                {/* Conditional Fields */}

                {selectedCategory !== '' && (

                    <div> <div className="grid lg:grid-cols-3 gap-y-5 gap-x-10 pt-10">


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

                        {/* Storage Input Field */}

                        <div className="form-control mb-4">
                            <label htmlFor="storage" className="label">
                                <span className="label-text">Storage</span>
                            </label>
                            <input
                                id="storage"
                                type="text"
                                {...register("storage", { required: "Storage is required" })}
                                placeholder="Enter storage details"
                                className="input input-bordered w-full"
                            />
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
                                    placeholder="Enter GPU model or other graphics details"
                                    className="input input-bordered w-full"
                                />
                                {errors.graphics && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.graphics.message}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* OS Input Field */}

                        {(selectedCategory === 'phone' ||
                            selectedCategory === 'smart-watch' ||
                            selectedCategory === 'laptop') && (
                                <div className="form-control mb-4">
                                    <label htmlFor="os" className="label">
                                        <span className="label-text">OS</span>
                                    </label>
                                    <input
                                        id="os"
                                        type="text"
                                        {...register("os", { required: "OS is required" })}
                                        placeholder="Enter OS details"
                                        className="input input-bordered w-full"
                                    />
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
                                                <option value="" disabled>Select type</option>
                                                <option value="DSLR">DSLR</option>
                                                <option value="Mirrorless">Mirrorless</option>
                                                <option value="Point-and-Shoot">Point-and-Shoot</option>
                                                <option value="Action Camera">Action Camera</option>
                                            </>
                                        )}
                                        {selectedCategory === 'headphones' && (
                                            <>
                                                <option value="" disabled>Select type</option>
                                                <option value="Over-Ear">Over-Ear</option>
                                                <option value="On-Ear">On-Ear</option>
                                                <option value="In-Ear">In-Ear</option>
                                                <option value="True Wireless">True Wireless</option>
                                            </>
                                        )}
                                        {selectedCategory === 'gaming-device' && (
                                            <>
                                                <option value="" disabled>Select type</option>
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

                        {/* Sensors */}

                        {selectedCategory === 'smart-watch' && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Sensors</span>
                                </label>
                                <div className="flex flex-col gap-2 border-2 p-5 rounded-lg">
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

                        {/* Water Resistance */}

                        {selectedCategory === 'smart-watch' && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Water Resistance</span>
                                </label>
                                <div className='border-2 p-5 rounded-lg'>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Water Resistant"
                                            {...register("waterResistance")}
                                            className="mr-2 checkbox"
                                        />
                                        Water Resistant
                                    </label>
                                </div>
                                {errors.waterResistance && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.waterResistance.message}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Compatibility */}

                        {selectedCategory === 'smart-watch' && (
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Compatibility</span>
                                </label>
                                <div className="flex flex-col gap-2">
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

                        {/* Headphone Features */}

                        {selectedCategory === 'headphone' && (
                            <div className="flex flex-wrap gap-8 items-center">
                                <div className="form-control w-full md:w-1/2 lg:w-1/3">
                                    <label className="label">
                                        <span className="label-text">Battery Life</span>
                                    </label>
                                    <select
                                        {...register("batteryLife")}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="Up to 5 hours">Up to 5 hours</option>
                                        <option value="5-10 hours">5-10 hours</option>
                                        <option value="10-20 hours">10-20 hours</option>
                                        <option value="More than 20 hours">More than 20 hours</option>
                                    </select>
                                </div>

                                <div className="form-control w-full md:w-1/2 lg:w-1/3">
                                    <label className="label">
                                        <span className="label-text">Noise Cancellation</span>
                                    </label>
                                    <input
                                        type="checkbox"
                                        {...register("noiseCancellation")}
                                        className="checkbox"
                                    />
                                </div>

                                <div className="form-control w-full md:w-1/2 lg:w-1/3">
                                    <label className="label">
                                        <span className="label-text">Frequency Response</span>
                                    </label>
                                    <select
                                        {...register("frequencyResponse")}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="20Hz - 20kHz">20Hz - 20kHz</option>
                                        <option value="18Hz - 22kHz">18Hz - 22kHz</option>
                                        <option value="15Hz - 25kHz">15Hz - 25kHz</option>
                                        <option value="10Hz - 30kHz">10Hz - 30kHz</option>
                                    </select>
                                </div>

                                <div className="form-control w-full md:w-1/2 lg:w-1/3">
                                    <label className="label">
                                        <span className="label-text">Impedance</span>
                                    </label>
                                    <input
                                        type="checkbox"
                                        {...register("impedance")}
                                        className="checkbox"
                                    />
                                </div>

                                <div className="form-control w-full md:w-1/2 lg:w-1/3">
                                    <label className="label">
                                        <span className="label-text">Microphone</span>
                                    </label>
                                    <input
                                        type="checkbox"
                                        {...register("microphone")}
                                        className="checkbox"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Lens Compatibility */}

                        {selectedCategory === 'camera' && (
                            <div className="flex flex-wrap gap-4">
                                <div className="form-control w-full md:w-1/2 lg:w-1/3">
                                    <label className="label">
                                        <span className="label-text">Lens Compatibility</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
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

                                <div className="form-control w-full md:w-1/2 lg:w-1/3">
                                    <label className="label">
                                        <span className="label-text">Shutter Speed</span>
                                    </label>
                                    <select
                                        {...register("shutterSpeed")}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="" disabled>Select Shutter Speed</option>
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
                            </div>
                        )}

                        {/* Controllers */}

                        {selectedCategory === 'gaming-device' && (
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Controllers</span>
                                </label>
                                <div className="flex flex-col gap-2">
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


                        {/* connectivity */}

                        <div className="form-control">
                            <label className="label py-5">
                                <span className="label-text">Connectivity</span>
                            </label>
                            <div className="flex flex-wrap gap-4">
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

                    </div>
                )}

                <div className="text-center py-10 ">
                    <input className="btn btn-outline btn-wide btn-circle" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
