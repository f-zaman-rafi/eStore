import useAxiosCommon from "../../../../../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../../../../SharedComponents/Loading/LoadingComponent";

const NewArrivals = () => {

    const axiosCommon = useAxiosCommon();

    const { data: productData = [], isLoading } = useQuery({
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

            // combine all data into a single array with spread operator
            return [
                ...phones.data,
                ...smartWatches.data,
                ...cameras.data,
                ...headphones.data,
                ...computers.data,
                ...consoles.data
            ];
        }
    });

    if (isLoading) return <LoadingComponent />;
    console.log(productData);

    return (
        <div>
            <p>total products: {productData.length}</p>
            {productData.map(product => (
                <div key={product._id} className="border-2 p-4 m-4">
                    <img className="h-40 w-40" src={product.image} />
                    <h3>{product.Title}</h3>
                </div>
            ))

            }
        </div>
    );
};

export default NewArrivals;