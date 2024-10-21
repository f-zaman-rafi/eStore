import { useFieldArray, useForm } from "react-hook-form";
import useAxiosCommon from '../../../Hooks/useAxiosCommon';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


// Access environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const Console = () => {
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
            const res = await axiosCommon.post('/headphones', data);
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
                <title>Add Gaming Console | Cyber</title>
            </Helmet>
            <h1 className="text-2xl font-medium text-gray-800 dark:text-white px-4 py-10">Add Gaming Console</h1>
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
                            placeholder="e.g., Sony"
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
                            placeholder="e.g., Play Station 5 Slim Edition"
                            className="input input-bordered w-full"
                        />
                        {errors.Model && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Model.message}
                            </span>
                        )}
                    </div>

                    {/* Processor Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Processor" className="label">
                            <span className="label-text">Processor</span>
                        </label>
                        <input
                            id="Processor"
                            type="text"
                            {...register("Processor", { required: "Processor name is required" })}
                            placeholder="e.g., AMD Ryzen “Zen 2” | 8 Cores / 16 Threads” "
                            className="input input-bordered w-full"
                        />
                        {errors.Processor && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Processor.message}
                            </span>
                        )}
                    </div>

                    {/* Graphics Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Graphics" className="label">
                            <span className="label-text">Graphics</span>
                        </label>
                        <input
                            id="Graphics"
                            type="text"
                            {...register("Graphics", { required: "Graphics is required" })}
                            placeholder="e.g., AMD Radeon RDNA 2 | Ray Tracing Acceleration"
                            className="input input-bordered w-full"
                        />
                        {errors.Graphics && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Graphics.message}
                            </span>
                        )}
                    </div>

                    {/* Storage Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Storage" className="label">
                            <span className="label-text">Storage</span>
                        </label>
                        <input
                            id="Storage"
                            type="text"
                            {...register("Storage", { required: "Storage info is required" })}
                            placeholder="e.g., 1TB | 5.5GB/s Read Bandwidth "
                            className="input input-bordered w-full"
                        />
                        {errors.Storage && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Storage.message}
                            </span>
                        )}
                    </div>

                    {/* Memory Input Field */}

                    <div className="form-control mb-4">
                        <label htmlFor="Memory" className="label">
                            <span className="label-text">Memory</span>
                        </label>
                        <input
                            id="Memory"
                            type="text"
                            {...register("Memory", { required: "Memory info is required" })}
                            placeholder="e.g., 16GB | 448GB/s Bandwidth "
                            className="input input-bordered w-full"
                        />
                        {errors.Memory && (
                            <span className="text-red-500 text-xs mt-2">
                                {errors.Memory.message}
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
                            placeholder="e.g., Remote-Play"
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

export default Console;
