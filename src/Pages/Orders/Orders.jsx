import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const axiosCommon = useAxiosCommon();

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosCommon.get(`/orders/email/${user.email}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  // Fetch product details based on type and product_id from orders
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Iterate over orders to fetch the product details based on type and product_id
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            const { product_id, type } = order; // Accessing type and product_id from each order

            try {
              const response = await axiosCommon.get(`/${type}/${product_id}`);
              return { ...order, ...response.data }; // Attach product details to the order
            } catch (error) {
              console.error(
                `Error fetching product details for ${product_id}:`,
                error
              );
              return { ...order, product: null }; // Fallback in case of error
            }
          })
        );
        setOrders(updatedOrders);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (orders.length > 0) {
      fetchProductDetails();
    }
  }, [orders.length]);

  return (
    <div className="max-w-[1440px] mx-auto font-inter overflow-x-hidden md:px-0 px-4">
      <div className="lg:ml-32 lg:mr-40 mt-14">
        <p className="text-lg font-bold pb-5">Your Orders</p>
        {orders.length > 0 ? (
          orders.map((order) => {
            return (
              <div
                key={order._id}
                className="flex py-8 border-b-[1px] items-center"
              >
                {order ? (
                  <>
                    <img
                      src={order.image}
                      alt={order.Model}
                      className="h-20 w-20 object-contain mr-4"
                    />
                    <div className="pb-2 font-semibold w-56 mx-auto pl-3">
                      <p className="w-auto">{order.Model}</p>
                      <p className="pb-2 text-sm">{order.variant}</p>
                      <p className="font-medium text-xs pt-1 break-all">
                        {`#${order._id.slice(0, 15)}${
                          order._id.length > 15 ? "..." : ""
                        }`}
                      </p>
                    </div>
                    <div className="flex gap-5 select-none h-10 items-center w-auto mx-auto px-5">
                      <p className="py-[1px] w-8 text-center border-gray-200 border-[1px] rounded-md ">
                        {order.quantity}
                      </p>
                      <p>{order.deliveryStatus}</p>
                    </div>
                    <p className="font-semibold w-auto mx-auto px-5">
                      $
                      {order.priceVariants?.find(
                        (variant) => variant.variant === order.variant
                      )?.price || "N/A"}
                    </p>
                    <div className="text-center">
                      {" "}
                      <p className="text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleTimeString()}
                        <br />
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </>
                ) : (
                  <p>Product not found</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
