import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Specifications from "./Specifications/Specifications";
import toast from "react-hot-toast";
import { useCart } from "../../Providers/Cart/CartProvider";

const ProductDetails = () => {
  const axiosCommon = useAxiosCommon();
  const { id, type } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refetch } = useCart();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id, type],
    queryFn: async () => {
      const response = await axiosCommon.get(`/${type}/${id}`);
      return response.data;
    },
    enabled: !!id && !!type,
  });

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const addItem = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const removeItem = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  useEffect(() => {
    if (product?.priceVariants?.length) {
      setSelectedVariant(product.priceVariants[0]);
    }
  }, [product]);

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    try {
      const res = await axiosCommon.post("/cart", {
        email: user.email,
        product_id: product._id,
        quantity: quantity,
        type: product.type,
        variant: selectedVariant.variant,
      });
      console.log(res.data.message);
      toast.success("Added to Cart");
      refetch();
    } catch (error) {
      console.error("Issue adding/updating the cart:", error);
    }
  };

  if (isLoading)
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden ">
      <div className="lg:ml-32 lg:mr-40 md:px-10 ">
        <div className="grid grid-cols-3 mt-14">
          <div className="col-span-1">
            <img className="h-auto w-96" src={product?.image} alt={product?.Model} />
          </div>

          <div className="col-span-2 pl-28">
            <h1 className="font-bold text-4xl">{product?.Model}</h1>
            <p className="font-medium text-3xl pt-4 pb-6">
              ${selectedVariant?.price}
            </p>

            {/* Variant buttons */}
            <div className="flex space-x-4 mt-12">
              {product?.priceVariants?.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => handleVariantClick(variant)}
                  className={`px-8 text-center items-center btn btn-outline ${selectedVariant?.variant === variant.variant
                    ? " bg-black text-white"
                    : "border-gray-300"
                    }`}
                >
                  {variant.variant}
                </button>
              ))}
            </div>
            <div className="flex gap-5 mt-16">
              <div className="flex select-none">
                <p
                  className="px-4 py-1 border-black rounded-s-md border-y-[1px] border-l-[1px] cursor-pointer"
                  onClick={addItem}
                >
                  +
                </p>
                <p className="py-1 w-16 text-center border-black border-[1px]  ">
                  {quantity}
                </p>
                <p
                  className="px-4 py-1 border-black rounded-e-md border-y-[1px] border-r-[1px] cursor-pointer"
                  onClick={removeItem}
                >
                  -
                </p>
              </div>
              <p
                onClick={handleAddToCart}
                className=" mx-auto w-full text-center py-1 border-black rounded-md border-[1px] px-20 cursor-pointer font-semibold select-none"
              >
                Add to Cart
              </p>
            </div>
          </div>
        </div>
        <div className="mt-32 py-10">
          <Specifications product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
