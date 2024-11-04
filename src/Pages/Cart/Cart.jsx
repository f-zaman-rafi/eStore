import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";
import { useEffect, useState } from "react";

const Cart = () => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const [productDetails, setProductDetails] = useState([]);


    // Fetch cart data
    const { data: cartData = [], isLoading, error } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            const res = await axiosCommon.get(`/cart/email/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email      // Only run query if user email exists
    });

    // Fetch product details for each item in cartData
    useEffect(() => {
        if (cartData.length > 0) {
            const fetchProductDetails = async () => {
                try {
                    const productPromises = cartData.map(cartItem => axiosCommon.get(`/${cartItem.type}/${cartItem.product_id}`));
                    const response = await Promise.all(productPromises);
                    setProductDetails(response.map(res => res.data))
                } catch (error) {
                    console.error(error);

                }
            };
            fetchProductDetails();
        }
    }, [cartData, axiosCommon])

    if (!user) return <LoadingComponent />
    if (isLoading) return <LoadingComponent />
    if (error) return <p>Error loading cart: {error.message}</p>;

    return (
        <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden">
            <div className="lg:mx-40 mt-14">
                <h2>Shopping Cart</h2>
                <p>{cartData.length}</p>
                {
                    productDetails.map(product => (
                        <div key={product._id}>
                            <img className="h-24" src={product.image} alt="" />
                            <p>{product.Model}</p>
                        </div>


                    ))
                }
            </div>
        </div>
    );
};

export default Cart;