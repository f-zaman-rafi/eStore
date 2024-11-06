import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";
import CartProducts from "./CartProducts/CartProducts";

const Cart = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  // Fetch cart data with handling for 404
  const {
    data: cartData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cartData", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosCommon.get(`/cart/email/${user.email}`);
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Return an empty array if the cart is not found
          return [];
        }
        throw error; // Re-throw other errors
      }
    },
    enabled: !!user?.email, // Only run query if user email exists
  });

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
              {cartData.map((data) => (
                <div key={data._id}>
                  <CartProducts data={data} />
                </div>
              ))}
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
