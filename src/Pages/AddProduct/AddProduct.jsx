import { useState } from 'react';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { Helmet } from 'react-helmet-async';

// Access environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedStorage, setSelectedStorage] = useState({});
    const [storagePrices, setStoragePrices] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            // Prepare storage data
            const storageData = Object.keys(selectedStorage).map(size => ({
                size,
                price: storagePrices[size] || ''
            }));

            // Handle image upload
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
            data.storageData = storageData; // Add storage data to form data

            // Submit product data
            const res = await axiosCommon.post('/products', data);

            if (res.data.insertedId) {
                console.log('Product added to the database successfully');
                toast.success('Product added successfully');
                navigate('/'); // Redirect to home page
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product');
        }
    };

    // Handle category change
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Handle storage checkbox change
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedStorage(prev => {
            const updated = { ...prev };
            if (checked) {
                updated[value] = true;
            } else {
                delete updated[value];
            }
            return updated;
        });
    };

    // Handle storage price change
    const handlePriceChange = (e) => {
        const { id, value } = e.target;
        setStoragePrices(prev => ({
            ...prev,
            [id]: value
        }));
    };


    return (
        <div className="pb-10 lg:px-20 px-10 my-10 min-h-[80vh] max-w-[1440px] mx-auto font-inter overflow-x-hidden">
            <Helmet>
                <title>Add Product | Cyber</title>
            </Helmet>
            <h1 className="text-2xl font-medium text-gray-800 dark:text-white px-4 py-10">Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Category and Status Selection */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-7">

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

                            {/* Title Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="title" className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    placeholder="Enter title"
                                    className="input input-bordered w-full"
                                />
                                {errors.title && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.title.message}
                                    </span>
                                )}
                            </div>

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

                            {/* Color Selection */}

                            <div className="form-control mb-4">
                                <label htmlFor="color" className="label">
                                    <span className="label-text">Color</span>
                                </label>
                                <input
                                    id="color"
                                    type="text"
                                    {...register("color", { required: "Color is required" })}
                                    placeholder="Enter color"
                                    className="input input-bordered w-full"
                                />
                                {errors.color && (
                                    <span className="text-red-500 text-xs mt-2 ml-2">
                                        {errors.color.message}
                                    </span>
                                )}
                            </div>

                            {/* Front Camera Input Field */}

                            {selectedCategory === 'phone' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="frontCamera" className="label">
                                        <span className="label-text">Front Camera</span>
                                    </label>
                                    <select
                                        id="frontCamera"
                                        {...register("frontCamera", { required: "Front Camera is required" })}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="" selected disabled>Select Front Camera</option>
                                        <option value="2MP">2 MP</option>
                                        <option value="5MP">5 MP</option>
                                        <option value="8MP">8 MP</option>
                                        <option value="12MP">12 MP</option>
                                        <option value="16MP">16 MP</option>
                                        <option value="20MP">20 MP</option>
                                        <option value="32MP">32 MP</option>
                                        <option value="48MP">48 MP</option>
                                        <option value="64MP">64 MP</option>
                                        <option value="108MP">108 MP</option>
                                    </select>
                                    {errors.frontCamera && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.frontCamera.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Main Camera Input Field */}

                            {selectedCategory === 'phone' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="mainCamera" className="label">
                                        <span className="label-text">Main Camera</span>
                                    </label>
                                    <select
                                        id="mainCamera"
                                        {...register("mainCamera", { required: "Main Camera is required" })}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="" selected disabled>Select Main Camera</option>
                                        <option value="5MP">5 MP</option>
                                        <option value="8MP">8 MP</option>
                                        <option value="12MP">12 MP</option>
                                        <option value="16MP">16 MP</option>
                                        <option value="20MP">20 MP</option>
                                        <option value="32MP">32 MP</option>
                                        <option value="48MP">48 MP</option>
                                        <option value="64MP">64 MP</option>
                                        <option value="108MP">108 MP</option>
                                        <option value="200MP">200 MP</option>
                                    </select>
                                    {errors.mainCamera && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.mainCamera.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Depth Camera Input Field */}

                            {selectedCategory === 'phone' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="depthCamera" className="label">
                                        <span className="label-text">Depth Camera</span>
                                    </label>
                                    <select
                                        id="depthCamera"
                                        {...register("depthCamera")}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="" selected disabled>Select Depth Camera</option>
                                        <option value="5MP">5 MP</option>
                                        <option value="8MP">8 MP</option>
                                        <option value="12MP">12 MP</option>
                                        <option value="16MP">16 MP</option>
                                        <option value="20MP">20 MP</option>
                                    </select>
                                </div>
                            )}

                            {/* Ultra-Wide Camera Input Field */}

                            {selectedCategory === 'phone' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="ultraWideCamera" className="label">
                                        <span className="label-text">Ultra-Wide Camera</span>
                                    </label>
                                    <select
                                        id="ultraWideCamera"
                                        {...register("ultraWideCamera")}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="" selected disabled>Select Ultra-Wide Camera</option>
                                        <option value="5MP">5 MP</option>
                                        <option value="8MP">8 MP</option>
                                        <option value="12MP">12 MP</option>
                                        <option value="16MP">16 MP</option>
                                        <option value="20MP">20 MP</option>
                                        <option value="32MP">32 MP</option>
                                        <option value="48MP">48 MP</option>
                                        <option value="64MP">64 MP</option>
                                        <option value="108MP">108 MP</option>
                                        <option value="200MP">200 MP</option>
                                    </select>
                                </div>
                            )}

                            {/* Telephoto Camera Input Field */}

                            {selectedCategory === 'phone' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="telephotoCamera" className="label">
                                        <span className="label-text">Telephoto Camera</span>
                                    </label>
                                    <select
                                        id="telephotoCamera"
                                        {...register("telephotoCamera")}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="" selected disabled>Select Telephoto Camera</option>
                                        <option value="5MP">5 MP</option>
                                        <option value="8MP">8 MP</option>
                                        <option value="12MP">12 MP</option>
                                        <option value="16MP">16 MP</option>
                                        <option value="20MP">20 MP</option>
                                        <option value="32MP">32 MP</option>
                                        <option value="48MP">48 MP</option>
                                        <option value="64MP">64 MP</option>
                                        <option value="108MP">108 MP</option>
                                        <option value="200MP">200 MP</option>
                                    </select>
                                </div>
                            )}

                            {/* Macro Camera Input Field */}

                            {selectedCategory === 'phone' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="macroCamera" className="label">
                                        <span className="label-text">Macro Camera</span>
                                    </label>
                                    <select
                                        id="macroCamera"
                                        {...register("macroCamera")}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="" selected disabled>Select Macro Camera</option>
                                        <option value="5MP">5 MP</option>
                                        <option value="8MP">8 MP</option>
                                        <option value="12MP">12 MP</option>
                                        <option value="16MP">16 MP</option>
                                        <option value="20MP">20 MP</option>
                                        <option value="32MP">32 MP</option>
                                        <option value="48MP">48 MP</option>
                                    </select>
                                </div>
                            )}

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

                            {/* Display Size Input Field */}

                            {selectedCategory !== 'headphone' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="displaySize" className="label">
                                        <span className="label-text">Display Size</span>
                                    </label>
                                    <input
                                        id="displaySize"
                                        type="text"
                                        {...register("displaySize", { required: "Display Size is required" })}
                                        placeholder="Enter display size"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.displaySize && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.displaySize.message}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Display Size Input Field */}

                            {selectedCategory !== 'headphone' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="displayResolution" className="label">
                                        <span className="label-text">Display Resolution</span>
                                    </label>
                                    <input
                                        id="displayResolution"
                                        type="text"
                                        {...register("displayResolution", { required: "Display Resolution is required" })}
                                        placeholder="Enter display resolution"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.displayResolution && (
                                        <span className="text-red-500 text-xs mt-2">
                                            {errors.displayResolution.message}
                                        </span>
                                    )}
                                </div>
                            )}



                            {/* RAM Input Field */}

                            {selectedCategory && selectedCategory !== 'camera' && (
                                <div className="form-control mb-4">
                                    <label htmlFor="ram" className="label">
                                        <span className="label-text">RAM</span>
                                    </label>
                                    <select
                                        id="ram"
                                        {...register("ram", { required: "RAM is required" })}
                                        className="input input-bordered w-full"
                                    >
                                        <option value="">Select RAM</option>
                                        <option value="1GB">1GB</option>
                                        <option value="2GB">2GB</option>
                                        <option value="4GB">4GB</option>
                                        <option value="6GB">6GB</option>
                                        <option value="8GB">8GB</option>
                                        <option value="12GB">12GB</option>
                                        <option value="16GB">16GB</option>
                                        <option value="20GB">20GB</option>
                                        <option value="24GB">24GB</option>
                                        <option value="32GB">32GB</option>
                                        <option value="40GB">40GB</option>
                                        <option value="48GB">48GB</option>
                                        <option value="64GB">64GB</option>
                                        <option value="96GB">96GB</option>
                                        <option value="128GB">128GB</option>
                                    </select>
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
                                    <span className="label-text">Battery Capacity</span>
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

                            {selectedCategory === 'headphone' || selectedCategory === 'smart-watch' && (
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
                                        <option value="5-7 hours">5-7 hours</option>
                                        <option value="8-10 hours">8-10 hours</option>
                                        <option value="10-15 hours">10-15 hours</option>
                                        <option value="15-20 hours">15-20 hours</option>
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

                            {/* Stock Status Input Field */}

                            <div className="form-control mb-4">
                                <label htmlFor="stockStatus" className="label">
                                    <span className="label-text">Stock Status</span>
                                </label>
                                <select
                                    id="stockStatus"
                                    {...register("stockStatus", { required: "Stock status is required" })}
                                    className="input input-bordered w-full"
                                >
                                    <option value="" selected disabled>Select stock status</option>
                                    <option value="in_stock">In Stock</option>
                                    <option value="out_of_stock">Out of Stock</option>
                                </select>
                                {errors.stockStatus && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.stockStatus.message}
                                    </span>
                                )}
                            </div>

                        </div>

                        {/* checkbox */}

                        <div className='space-y-5'>

                            {/* Storage Selection */}

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Storage</span>
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB", "4TB", "8TB"].map(size => (
                                        <div key={size}>
                                            <input
                                                type="checkbox"
                                                id={`storage-${size}`}
                                                value={size}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor={`storage-${size}`} className="ml-2">{size}</label>
                                            {selectedStorage[size] && (
                                                <div className="mt-2">
                                                    <input
                                                        type="number"
                                                        id={size}
                                                        placeholder={`Price for ${size}`}
                                                        value={storagePrices[size] || ''}
                                                        onChange={handlePriceChange}
                                                        className="input input-bordered w-full"
                                                    />
                                                    {errors.storagePrice && errors.storagePrice[size] && (
                                                        <span className="text-red-500 text-xs mt-2">
                                                            {errors.storagePrice[size]?.message}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {errors.storage && (
                                    <span className="text-red-500 text-xs mt-2">
                                        {errors.storage.message}
                                    </span>
                                )}
                            </div>


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

                        {/*details Input Field */}

                        <div className="form-control mb-4">
                            <label htmlFor="details" className="label">
                                <span className="label-text py-5">Details</span>
                            </label>
                            <textarea
                                id="details"
                                type="text"
                                {...register("details", { required: "details are required" })}
                                placeholder="Enter details"
                                className="input input-bordered w-full h-40"
                            />
                            {errors.details && (
                                <span className="text-red-500 text-xs mt-2">
                                    {errors.details.message}
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
