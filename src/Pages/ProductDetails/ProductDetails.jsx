import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const ProductDetails = () => {
    const axiosCommon = useAxiosCommon();
    const { id, type } = useParams(); // Access both id and type from the route parameters

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id, type], // Use id and type in the queryKey
        queryFn: async () => {
            const response = await axiosCommon.get(`/${type}/${id}`); // Make API call based on type
            return response.data;
        },
        enabled: !!id && !!type, // Ensure the query runs only if both id and type are available
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>{product?.Title}</h1>
            <p>Price: ${product?.price}</p>
            <img src={product?.image} alt={product?.Title} />
        </div>
    );
};

export default ProductDetails;
