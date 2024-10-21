import { useFieldArray, useForm } from "react-hook-form";
import useAxiosCommon from '../../../Hooks/useAxiosCommon';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


// Access environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const Smartphone = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            priceVariants: [{ variant: '', price: '' }]  // Initializing with one price variant field
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "priceVariants"
    });

    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();

    // Submit the data
    const onSubmit = async (data) => {
        try {
            // Upload image to Cloudinary first
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append('upload_preset', UPLOAD_PRESET);
            const photoRes = await axiosCommon.post(UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Add the uploaded image URL to the data
            data.image = photoRes.data.secure_url;

            // Send product data to backend
            const res = await axiosCommon.post('/phones', data);
            if (res.data.insertedId) {
                toast.success('Product added successfully');
                navigate('/');
            }
        } catch (error) {
            console.error("Error adding phone: ", error);
            toast.error('Failed to add phone');
        }
    }




    return (
        <div className="pb-10 lg:px-20 px-10 my-10 min-h-[80vh] max-w-[1440px] mx-auto font-inter overflow-x-hidden">
            <Helmet>
                <title>Add Phone | Cyber</title>
            </Helmet>
            <h1 className="text-2xl font-medium text-gray-800 dark:text-white px-4 py-10">Add Phone</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col sm:flex-row flex-wrap gap-7">

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
                            <option value="" selected>Select a status</option>
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

                <div className=" gap-y-5 gap-x-10 pt-10">

                    {/* Brand Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Brand" className="label">
                            <span className="label-text">Brand</span>
                        </label>
                        <input
                            id="Brand"
                            type="text"
                            {...register("Brand", { required: "Brand name is required" })}
                            placeholder="e.g., Samsung, Apple, OnePlus"
                            className="input input-bordered w-full"
                        />
                        {errors.Brand && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Brand.message}
                            </span>
                        )}
                    </div>


                    {/* Model Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Model" className="label">
                            <span className="label-text">Model</span>
                        </label>
                        <input
                            id="Model"
                            type="text"
                            {...register("Model", { required: "Model name is required" })}
                            placeholder="e.g., Galaxy S21, iPhone 13, Pixel 6"
                            className="input input-bordered w-full"
                        />
                        {errors.Model && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Model.message}
                            </span>
                        )}
                    </div>

                    {/* Network Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Network" className="label">
                            <span className="label-text">Network</span>
                        </label>
                        <input
                            id="Network"
                            type="text"
                            {...register("Network", { required: "Network info is required" })}
                            placeholder="e.g., 5G, 4G LTE"
                            className="input input-bordered w-full"
                        />
                        {errors.Network && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Network.message}
                            </span>
                        )}
                    </div>

                    {/* Dimensions Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Dimensions" className="label">
                            <span className="label-text">Dimensions</span>
                        </label>
                        <input
                            id="Dimensions"
                            type="text"
                            {...register("Dimensions", { required: "Dimensions info is required" })}
                            placeholder="e.g., 146.7 x 71.5 x 7.4 mm"
                            className="input input-bordered w-full"
                        />
                        {errors.Dimensions && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Dimensions.message}
                            </span>
                        )}
                    </div>

                    {/* Weight Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Weight" className="label">
                            <span className="label-text">Weight</span>
                        </label>
                        <input
                            id="Weight"
                            type="text"
                            {...register("Weight", { required: "Weight info is required" })}
                            placeholder="e.g., 189g, 202g"
                            className="input input-bordered w-full"
                        />
                        {errors.Weight && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Weight.message}
                            </span>
                        )}
                    </div>

                    {/* SIM Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="SIM" className="label">
                            <span className="label-text">SIM</span>
                        </label>
                        <input
                            id="SIM"
                            type="text"
                            {...register("SIM", { required: "SIM info is required" })}
                            placeholder="e.g., Dual SIM, Nano SIM"
                            className="input input-bordered w-full"
                        />
                        {errors.SIM && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.SIM.message}
                            </span>
                        )}
                    </div>

                    {/* DisplayType Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="DisplayType" className="label">
                            <span className="label-text">Display Type</span>
                        </label>
                        <input
                            id="DisplayType"
                            type="text"
                            {...register("DisplayType", { required: "Display Type is required" })}
                            placeholder="e.g., AMOLED, LCD"
                            className="input input-bordered w-full"
                        />
                        {errors.DisplayType && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.DisplayType.message}
                            </span>
                        )}
                    </div>

                    {/* DisplaySize Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="DisplaySize" className="label">
                            <span className="label-text">Display Size</span>
                        </label>
                        <input
                            id="DisplaySize"
                            type="text"
                            {...register("DisplaySize", { required: "Display Size is required" })}
                            placeholder="e.g., 6.7 inches, 5.5 inches"
                            className="input input-bordered w-full"
                        />
                        {errors.DisplaySize && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.DisplaySize.message}
                            </span>
                        )}
                    </div>

                    {/* DisplayResolution Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="DisplayResolution" className="label">
                            <span className="label-text">Display Resolution</span>
                        </label>
                        <input
                            id="DisplayResolution"
                            type="text"
                            {...register("DisplayResolution", { required: "Display Resolution is required" })}
                            placeholder="e.g., 1080 x 2400 pixels, 1440 x 3200 pixels"
                            className="input input-bordered w-full"
                        />
                        {errors.DisplayResolution && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.DisplayResolution.message}
                            </span>
                        )}
                    </div>

                    {/* os Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="os" className="label">
                            <span className="label-text">OS</span>
                        </label>
                        <input
                            id="os"
                            type="text"
                            {...register("os", { required: "OS is required" })}
                            placeholder="e.g., Android 11, iOS 14"
                            className="input input-bordered w-full"
                        />
                        {errors.os && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.os.message}
                            </span>
                        )}
                    </div>

                    {/* Chipset Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Chipset" className="label">
                            <span className="label-text">Chipset</span>
                        </label>
                        <input
                            id="Chipset"
                            type="text"
                            {...register("Chipset", { required: "Chipset name is required" })}
                            placeholder="e.g., Snapdragon 888, A15 Bionic"
                            className="input input-bordered w-full"
                        />
                        {errors.Chipset && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Chipset.message}
                            </span>
                        )}
                    </div>

                    {/* cpu Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="cpu" className="label">
                            <span className="label-text">CPU</span>
                        </label>
                        <input
                            id="cpu"
                            type="text"
                            {...register("cpu", { required: "CPU name is required" })}
                            placeholder="e.g., Octa-core, Hexa-core"
                            className="input input-bordered w-full"
                        />
                        {errors.cpu && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.cpu.message}
                            </span>
                        )}
                    </div>

                    {/* memory Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="memory" className="label">
                            <span className="label-text">Memory/Storage</span>
                        </label>
                        <input
                            id="memory"
                            type="text"
                            {...register("memory", { required: "Memory/Storage info is required" })}
                            placeholder="e.g., 128GB/8GB RAM, 256GB/12GB RAM"
                            className="input input-bordered w-full"
                        />
                        {errors.memory && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.memory.message}
                            </span>
                        )}
                    </div>

                    {/* MainCamera Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="MainCamera" className="label">
                            <span className="label-text">Main Camera</span>
                        </label>
                        <input
                            id="MainCamera"
                            type="text"
                            {...register("MainCamera", { required: "Main Camera info is required" })}
                            placeholder="e.g., 108MP (wide), 12MP (ultrawide)"
                            className="input input-bordered w-full"
                        />
                        {errors.MainCamera && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.MainCamera.message}
                            </span>
                        )}
                    </div>

                    {/* SelfieCamera Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="SelfieCamera" className="label">
                            <span className="label-text">Selfie Camera</span>
                        </label>
                        <input
                            id="SelfieCamera"
                            type="text"
                            {...register("SelfieCamera", { required: "Selfie Camera info is required" })}
                            placeholder="e.g., 32MP (wide), 12MP (ultrawide)"
                            className="input input-bordered w-full"
                        />
                        {errors.SelfieCamera && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.SelfieCamera.message}
                            </span>
                        )}
                    </div>

                    {/* Sound Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Sound" className="label">
                            <span className="label-text">Sound</span>
                        </label>
                        <input
                            id="Sound"
                            type="text"
                            {...register("Sound", { required: "Sound info is required" })}
                            placeholder="e.g., Stereo speakers, 3.5mm jack"
                            className="input input-bordered w-full"
                        />
                        {errors.Sound && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Sound.message}
                            </span>
                        )}
                    </div>

                    {/* BatteryInfo Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="BatteryInfo" className="label">
                            <span className="label-text">Battery Info</span>
                        </label>
                        <input
                            id="BatteryInfo"
                            type="text"
                            {...register("BatteryInfo", { required: "Battery Info is required" })}
                            placeholder="e.g., 5000mAh, 4500mAh"
                            className="input input-bordered w-full"
                        />
                        {errors.BatteryInfo && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.BatteryInfo.message}
                            </span>
                        )}
                    </div>

                    {/* Sensors Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Sensors" className="label">
                            <span className="label-text">Sensors</span>
                        </label>
                        <input
                            id="Sensors"
                            type="text"
                            {...register("Sensors", { required: "Sensors info is required" })}
                            placeholder="e.g., Fingerprint, Gyroscope"
                            className="input input-bordered w-full"
                        />
                        {errors.Sensors && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Sensors.message}
                            </span>
                        )}
                    </div>

                    {/* Other Features / Info Input Field */}
                    <div className="form-control mb-4">
                        <label htmlFor="OtherFeatures" className="label">
                            <span className="label-text">Other Features / Info</span>
                        </label>
                        <input
                            id="OtherFeatures"
                            type="text"
                            {...register("OtherFeatures", { required: "Other features info is required" })}
                            placeholder="e.g., Glass front (Corning-made), IP68 water resistance, Always on Display"
                            className="input input-bordered w-full"
                        />
                        {errors.OtherFeatures && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.OtherFeatures.message}
                            </span>
                        )}
                    </div>


                    {/* Image Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="image" className="label">
                            <span className="label-text">Upload Product Image</span>
                        </label>
                        <input
                            id="image"
                            type="file"
                            {...register("image", { required: "Product Image is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.image && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.image.message}
                            </span>
                        )}
                    </div>

                    {/* Price Section */}

                    {/* Variant-Price Section */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Price Variants</span>
                        </label>

                        {fields.map((item, index) => (
                            <div key={item.id} className="priceGroup mb-2 flex items-center gap-4">
                                <input
                                    type="text"
                                    placeholder="Variant (e.g., 512/12)"
                                    {...register(`priceVariants.${index}.variant`, { required: "Variant is required" })}
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    {...register(`priceVariants.${index}.price`, { required: "Price is required" })}
                                    className="input input-bordered w-full"
                                />

                            </div>
                        ))}

                        <div className="flex justify-between gap-5">
                            <button type="button" className="btn btn-outline text-green-700 flex-1" onClick={() => append({ variant: '', price: '' })}>
                                Add More
                            </button>
                            <button type="button" className="btn btn-outline text-red-600 flex-1" onClick={() => remove({ variant: '', price: '' })}>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center py-10 ">
                    <input className="btn btn-outline btn-wide btn-circle" type="submit" />
                </div>

            </form>
        </div>
    );
};

export default Smartphone;

