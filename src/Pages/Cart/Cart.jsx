import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";
import CartProducts from "./CartProducts/CartProducts";
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
    enabled: !!user?.email // Only run query if user email exists
  });

  // Fetch product details for each item in cartData
  useEffect(() => {
    if (cartData.length > 0) {
      const fetchProductDetails = async () => {
        try {
          const productPromises = cartData.map(cartItem =>
            axiosCommon.get(`/${cartItem.type}/${cartItem.product_id}`)
          );
          const response = await Promise.all(productPromises);
          const remap = (() => (response.map(res => res.data)));
          setProductDetails(remap);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProductDetails();
    }
  }, [cartData, axiosCommon]);

  console.log(productDetails, cartData)

  if (!user) return <LoadingComponent />;
  if (isLoading) return <LoadingComponent />;
  if (error) return <p>Error loading cart: {error.message}</p>;

  return (
    <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden">
      <div className="lg:mx-40 mt-14">
        {cartData.length === 0 ? (
          <p>No product found</p>
        ) : (
          <div className="grid grid-cols-6">
            <div className="col-span-4">
              <p className="text-lg font-bold pb-5">Shopping Cart</p>
              {
                cartData.map((data) => {
                  // Find the matching details in productDetails
                  const matchingDetails = productDetails.find(details => details._id === data.product_id);

                  // Only render if there is a match
                  if (matchingDetails) {
                    return (
                      <div key={data.product_id}>
                        <CartProducts
                          data={data}
                          details={matchingDetails}
                        />
                      </div>
                    );
                  }
                  return null; // If no matching details, render nothing
                })
              }
            </div>
            <div className="col-span-2">
              <p>Order Summary</p>
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default Cart;
