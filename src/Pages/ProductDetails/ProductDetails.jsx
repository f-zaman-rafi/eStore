import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";
import useCart from "../../Hooks/useCart";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const ProductDetails = () => {

    const axiosCommon = useAxiosCommon();
    const { id, type } = useParams();
    const { user } = useAuth();

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id, type],
        queryFn: async () => {
            const response = await axiosCommon.get(`/${type}/${id}`);
            return response.data;
        },
        enabled: !!id && !!type,
    });

    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);


    const addItem = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const removeItem = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
    }

    useEffect(() => {
        if (product?.priceVariants?.length) {
            setSelectedVariant(product.priceVariants[0]);
        }
    }, [product]);

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
    };


    const { addToCart, cartItems } = useCart();

    // Function to handle adding an item to the cart
    const handleAddToCart = () => {
        if (selectedVariant && user?.email) { // Ensure selectedVariant and user email exist
            const item = {
                product_id: product._id,
                email: user.email,
                product_type: product.type,
                quantity: quantity
            };
            addToCart(item); // `addToCart` handles success/error toasts
        } else {
            toast.error('Please select a variant and ensure you are logged in.');
        }
    };

    console.log(cartItems)


    if (isLoading) return <div><LoadingComponent /></div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden">
            <div className="flex gap-20 lg:mx-40 mt-14">
                <div>
                    <img className="h-96" src={product?.image} alt={product?.Model} />
                </div>

                <div>
                    <h1 className="font-bold text-4xl">{product?.Model}</h1>
                    <p className="font-medium text-3xl pt-4 pb-6">${selectedVariant?.price}</p>

                    {/* Variant buttons */}
                    <div className="flex space-x-4 mt-12">
                        {product?.priceVariants?.map((variant, index) => (
                            <button
                                key={index}
                                onClick={() => handleVariantClick(variant)}
                                className={`px-8 text-center items-center btn btn-outline ${selectedVariant?.variant === variant.variant ? ' bg-black text-white' : 'border-gray-300'}`}
                            >
                                {variant.variant}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-5 mt-16">
                        <div className="flex select-none">
                            <p className="px-4 py-1 border-black rounded-s-md border-y-[1px] border-l-[1px] cursor-pointer" onClick={addItem}>+</p>
                            <p className="py-1 w-16 text-center border-black border-[1px]  ">{quantity}</p>
                            <p className="px-4 py-1 border-black rounded-e-md border-y-[1px] border-r-[1px] cursor-pointer" onClick={removeItem}>-</p>
                        </div>
                        <p onClick={handleAddToCart} className=" mx-auto w-full text-center py-1 border-black rounded-md border-[1px]  cursor-pointer font-semibold select-none">Add to Cart</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
