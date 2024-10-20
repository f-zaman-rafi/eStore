import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../../../Hooks/useAxiosCommon";
import LoadingComponent from "../../../../../../SharedComponents/Loading/LoadingComponent";

const BestSeller = () => {
    const axiosCommon = useAxiosCommon();

    const { data: productData = [], isLoading } = useQuery({
        queryKey: ['productData'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/phones`);
            return data;
        }
    });

    if (isLoading) return <LoadingComponent />;
    console.log(productData);




    return (
        <div>
            <p>total products:  {productData.length}</p>

            {
                productData.map(product => (
                    <div key={product._id}>
                        <img className="h-40 w-40" src={product.image} alt="" />
                        <p>{product.title}</p>
                        <p>{product.ram}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default BestSeller;