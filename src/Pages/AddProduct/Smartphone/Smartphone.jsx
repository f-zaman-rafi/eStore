import { useForm } from "react-hook-form";
import useAxiosCommon from '../../../Hooks/useAxiosCommon';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


// Access environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const Smartphone = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();

    // submit the data

    const onSubmit = async (data) => {
        try {

            // upload image first

            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append('upload_preset', UPLOAD_PRESET);
            const photoRes = await axiosCommon.post(UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            //add the uploaded image url to database 
            data.image = photoRes.data.secure_url;

            const res = await axiosCommon.post('/phones', data);
            if (res.data.insertedId) {
                console.log('Product successfully added to the database');
                toast.success('Product added successfully');
                navigate('/');
            }
        }
        catch (error) {
            console.error("Error at adding phone: ", error);
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

                <div>
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
                                placeholder="Enter Brand Name"
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
                                placeholder="Enter Model Name"
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
                                placeholder="Enter Network info"
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
                                placeholder="Enter Dimensions info"
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
                                placeholder="Enter Weight info"
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
                                placeholder="Enter SIM info"
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
                                placeholder="Enter Display Type"
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
                                placeholder="Enter Display Size"
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
                                placeholder="Enter Display Resolution"
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
                                placeholder="Enter OS"
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
                                placeholder="Enter Chipset name"
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
                                placeholder="Enter CPU name"
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
                                placeholder="Enter Memory/Storage info"
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
                                placeholder="Enter Main Camera info"
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
                                placeholder="Enter Selfie Camera info"
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
                                placeholder="Enter Sound info"
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
                                placeholder="Enter Battery Info"
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
                                placeholder="Enter Sensors info"
                                className="input input-bordered w-full"
                            />
                            {errors.Sensors && (
                                <span className="text-red-500 text-xs mt-2">
                                    {errors.Sensors.message}
                                </span>
                            )}
                        </div>

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
                </div>

                <div className="text-center py-10 ">
                    <input className="btn btn-outline btn-wide btn-circle" type="submit" />
                </div>

            </form>
        </div>
    );
};

export default Smartphone;

