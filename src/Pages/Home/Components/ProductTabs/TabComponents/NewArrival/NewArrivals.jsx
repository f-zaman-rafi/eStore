import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../../../../SharedComponents/Loading/LoadingComponent";
import { Link } from "react-router-dom";
import useAxiosCommon from "../../../../../../Hooks/useAxiosCommon";

const NewArrivals = () => {
    const axiosCommon = useAxiosCommon();

    const { data: productData = [], isLoading, error } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const [phones, smartWatches, cameras, headphones, computers, consoles] = await Promise.all([
                axiosCommon.get(`/phones?status=new_arrival`),
                axiosCommon.get(`/smartWatches?status=new_arrival`),
                axiosCommon.get(`/cameras?status=new_arrival`),
                axiosCommon.get(`/headphones?status=new_arrival`),
                axiosCommon.get(`/computers?status=new_arrival`),
                axiosCommon.get(`/consoles?status=new_arrival`),
            ]);

            return [
                ...phones.data,
                ...smartWatches.data,
                ...cameras.data,
                ...headphones.data,
                ...computers.data,
                ...consoles.data,
            ];
        }
    });

    if (isLoading) return <LoadingComponent />;
    if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 lg:mx-0">
            {productData.length > 0 ? (
                productData.map((product) => (
                    <div key={product._id} className="bg-gray-100 rounded-md cursor-pointer">
                        <Link to={`/${product.type}/${product._id}`}>
                            <div className="flex flex-col justify-center items-center text-center h-full">
                                <img
                                    className="h-40 w-auto mx-14 mt-[72px] hover:p-2"
                                    style={{ transitionDuration: "500ms" }}
                                    src={product.image}
                                    alt={product.Title}
                                />
                                <h3 className="mx-4 px-6 font-semibold my-4">{product.Title}</h3>
                                <p className="font-bold text-lg mt-auto">${product.priceVariants[0].price}</p>
                                <p className="btn bg-black text-white px-16 mx-6 my-4 hover:bg-gray-100 hover:border-black duration-700 hover:text-black">
                                    Buy Now
                                </p>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-center col-span-4 py-20 text-gray-500">No products available at the moment.</p>
            )}
        </div>
    );
};

export default NewArrivals;
