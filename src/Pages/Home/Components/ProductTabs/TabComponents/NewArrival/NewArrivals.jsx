import useAxiosCommon from "../../../../../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../../../../SharedComponents/Loading/LoadingComponent";



const NewArrivals = () => {
    const axiosCommon = useAxiosCommon(); // Custom hook or function for axios configuration

    const { data: productData = [], isLoading } = useQuery({
        queryKey: ['productData'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/products`); // Making a GET request to fetch products
            return data;
        }
    });

    if (isLoading) return <LoadingComponent />; // Show loading state while data is being fetched

    console.log(productData); // Log the fetched product data




    return (
        <div>
            <p>New Arrivals</p>
        </div>
    );
};

export default NewArrivals;