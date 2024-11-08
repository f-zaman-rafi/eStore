import { useFieldArray, useForm } from "react-hook-form";
import useAxiosCommon from '../../../Hooks/useAxiosCommon';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxios from "../../../Hooks/useAxios";


// Access environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const Camera = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            priceVariants: [{ variant: '', price: '' }]  // Initializing with one price variant field
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "priceVariants"
    });

    const axios = useAxios();
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();

    // Submit the data
    const onSubmit = async (data) => {
        try {
            // Upload image to Cloudinary first
            const formData = new FormData();
            formData.append("file", data.image[0]);
            formData.append('upload_preset', UPLOAD_PRESET);
            const photoRes = await axios.post(UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Add the uploaded image URL to the data
            data.image = photoRes.data.secure_url;

            // Send product data to backend
            const res = await axiosCommon.post('/cameras', data);
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
                <title>Add Camera | Cyber</title>
            </Helmet>
            <h1 className="text-2xl font-medium text-gray-800 dark:text-white px-4 py-10">Add Camera</h1>
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

                    {/* Type Field */}

                    <div className="form-control flex-1">
                        <label htmlFor="type" className="label">
                            <span className="label-text">Type</span>
                        </label>
                        <select
                            id="type"
                            {...register("type", { required: "type is required" })}
                            className="input input-bordered"
                        >
                            <option value="" disabled>Select a type</option>
                            <option value="phone" disabled>phone</option>
                            <option value="camera" selected>Camera</option>
                            <option value="smartwatch" disabled>Smart-Watch</option>
                            <option value="headphone" disabled>Headphone</option>
                            <option value="computer" disabled>Computer</option>
                            <option value="console" disabled>Console</option>
                        </select>
                        {errors.type && (
                            <span className="text-red-500 text-xs mt-2 ml-2">
                                {errors.type.message}
                            </span>
                        )}
                    </div>

                </div>

                <div className=" gap-y-5 gap-x-10 pt-10">

                    {/* Title Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Title" className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            id="Title"
                            type="text"
                            {...register("Title", { required: "Title is required" })}
                            placeholder="e.g., Blackmagic Pocket Cinema Camera 6k"
                            className="input input-bordered w-full"
                        />
                        {errors.Title && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Title.message}
                            </span>
                        )}
                    </div>

                    {/* Brand Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Brand" className="label">
                            <span className="label-text">Brand</span>
                        </label>
                        <input
                            id="Brand"
                            type="text"
                            {...register("Brand", { required: "Brand name is required" })}
                            placeholder="e.g., Canon, Nikon"
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
                            placeholder="e.g., EOS R5, D850"
                            className="input input-bordered w-full"
                        />
                        {errors.Model && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Model.message}
                            </span>
                        )}
                    </div>

                    {/* CameraType Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="CameraType" className="label">
                            <span className="label-text">Camera Type</span>
                        </label>
                        <input
                            id="CameraType"
                            type="text"
                            {...register("CameraType", { required: "Camera Type name is required" })}
                            placeholder="e.g., SLR, DSLR, Digital Camera"
                            className="input input-bordered w-full"
                        />
                        {errors.CameraType && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.CameraType.message}
                            </span>
                        )}
                    </div>

                    {/* Resolution Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Resolution" className="label">
                            <span className="label-text">Resolution</span>
                        </label>
                        <input
                            id="Resolution"
                            type="text"
                            {...register("Resolution", { required: "Resolution is required" })}
                            placeholder="e.g., 12MP, 48MP"
                            className="input input-bordered w-full"
                        />
                        {errors.Resolution && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Resolution.message}
                            </span>
                        )}
                    </div>

                    {/* Aperture Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Aperture" className="label">
                            <span className="label-text">Aperture</span>
                        </label>
                        <input
                            id="Aperture"
                            type="text"
                            {...register("Aperture", { required: "Aperture info is required" })}
                            placeholder="e.g., f/1.8 "
                            className="input input-bordered w-full"
                        />
                        {errors.Aperture && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Aperture.message}
                            </span>
                        )}
                    </div>

                    {/* VideoRecording Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="VideoRecording" className="label">
                            <span className="label-text">Video Recording</span>
                        </label>
                        <input
                            id="VideoRecording"
                            type="text"
                            {...register("VideoRecording", { required: "Video Recording info is required" })}
                            placeholder="e.g., 4K at 60fps "
                            className="input input-bordered w-full"
                        />
                        {errors.VideoRecording && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.VideoRecording.message}
                            </span>
                        )}
                    </div>
                    {/* LensType Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="LensType" className="label">
                            <span className="label-text">Lens Type</span>
                        </label>
                        <input
                            id="LensType"
                            type="text"
                            {...register("LensType", { required: "Lens Type info is required" })}
                            placeholder="e.g., Wide, ultra-wide, telephoto, macro "
                            className="input input-bordered w-full"
                        />
                        {errors.LensType && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.LensType.message}
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
                            placeholder="e.g., Auto-focus (PDAF, laser, etc.), Optical Image Stabilization (OIS), HDR (High Dynamic Range), Panorama mode, Night Mode"
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

export default Camera;

