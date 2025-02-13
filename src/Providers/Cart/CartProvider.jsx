/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";

// Create the Shipment Context
export const CartContext = createContext(null);

// Create the provider component
const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();
  const [cartData, setCartData] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  // Initialize the state from localStorage if available
  const [currentAddress, setCurrentAddress] = useState(() => {
    const savedAddress = localStorage.getItem("currentAddress");
    // console.log("Saved address from localStorage:", savedAddress);
    return savedAddress !== null ? JSON.parse(savedAddress) : [];
  });

  useEffect(() => {
    // Log the currentAddress to verify it's updating as expected
    // console.log("Current address updated:", currentAddress);
  }, [currentAddress]);

  const [shipmentMethod, setShipmentMethod] = useState(() => {
    // Retrieve from localStorage if available
    return localStorage.getItem("shipmentMethod") || "Free";
  });

  useEffect(() => {
    // Save shipmentMethod to localStorage whenever it changes
    localStorage.setItem("shipmentMethod", shipmentMethod);
  }, [shipmentMethod]);

  // Fetch cart data manually with useEffect
  useEffect(() => {
    if (!user?.email) {
      setCartData([]); // If no user email, set cartData to empty
      setLoading(false); // Stop loading
      return;
    }

    const fetchCartData = async () => {
      try {
        setLoading(true); // Start loading
        const res = await axiosCommon.get(`/cart/email/${user.email}`);
        setCartData(res.data); // Set cart data from the response
      } catch (err) {
        console.error("Error fetching cart data:", err);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchCartData();
  }, [user?.email, axiosCommon]); // Trigger this effect when user.email changes

  // Fetch product details for cart items
  useEffect(() => {
    if (cartData.length > 0) {
      const fetchProductDetails = async () => {
        try {
          const productPromises = cartData.map((cartItem) =>
            axiosCommon.get(`/${cartItem.type}/${cartItem.product_id}`)
          );
          const response = await Promise.all(productPromises);
          const remap = response.map((res) => res.data);
          setProductDetails(remap); // Set product details
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };
      fetchProductDetails();
    } else {
      setProductDetails([]); // Clear product details if cart is empty
    }
  }, [cartData, axiosCommon]);

  // Initialize quantities based on cart data
  useEffect(() => {
    const initialQuantities = cartData.reduce((acc, item) => {
      acc[item._id] = item.quantity || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities); // Set initial quantities
  }, [cartData]);

  // handle add item
  const handleAddItem = (itemId) => {
    if (cartData.length > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + 1,
      }));
    }
  };

  // handle remove item
  const handleRemoveItem = (itemId) => {
    if (cartData.length > 0 && quantities[itemId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  // Update quantities in DB
  useEffect(() => {
    const updateQuantitiesInDB = async () => {
      if (Object.keys(quantities).length > 0) {
        try {
          await axiosCommon.put("/cart/update-quantities", { quantities });
        } catch (error) {
          console.error("Failed to update quantities:", error);
        }
      }
    };

    updateQuantitiesInDB();
  }, [quantities]);

  const calculateSubtotal = () => {
    if (cartData.length === 0) return 0;
    return cartData.reduce((total, item) => {
      const matchingDetails = productDetails.find(
        (details) => details._id === item.product_id
      );
      if (matchingDetails) {
        const variantPrice = matchingDetails.priceVariants.find(
          (variant) => variant.variant === item.variant
        );
        const price = variantPrice ? variantPrice.price : 0;
        total += price * (quantities[item._id] || 1);
      }
      return total;
    }, 0);
  };

  const tax = () => {
    return cartData.length > 0 ? calculateSubtotal() * 0.05 : 0;
  };

  const shippingCost = () => {
    if (cartData.length === 0) return 0;

    // Calculate the total quantity of items
    const totalQuantity = cartData.reduce(
      (sum, item) => sum + (quantities[item._id] || 1),
      0
    );

    return totalQuantity * 10;
  };

  const total = calculateSubtotal() + tax() + shippingCost();

  // refetch cartdata
  const refetch = async () => {
    if (!user?.email) return; // Exit if user is not logged in
    try {
      const response = await axiosCommon.get(`/cart/email/${user.email}`);
      setCartData(response.data); // Update cart data with the latest data from the server
    } catch (error) {
      console.error("Error refetching cart data:", error);
    }
  };

  // Delete cart product
  const handleDeleteItem = async (itemId) => {
    try {
      // Delete the item from the backend
      await axiosCommon.delete(`/cart/${itemId}`);

      // Refetch the cart data manually
      await refetch();

      if (cartData.length === 1) {
        // Before deletion, length was 1, so after deletion it should be 0
        setQuantities({});
        setProductDetails([]);
      }
    } catch (error) {
      console.error("Failed to delete item from cart: ", error);
    }
  };

  useEffect(() => {
    if (!user) {
      setUserData([]); // Clear user data when user logs out
    } else {
      fetchUserData(); // Fetch new user data when a new user logs in
    }
  }, [user]); // This hook runs whenever the 'user' state changes

  // Fetch user data
  const fetchUserData = async () => {
    if (!user?.email) return;
    try {
      const response = await axiosCommon.get(`/users/email/${user.email}`);
      setUserData(response.data); // Update the user data for the logged-in user
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user?.email && userData.length === 0) {
      fetchUserData();
    }
  }, [user?.email, userData]);

  // refetch address data
  const refetchAddress = async () => {
    if (!user?.email) return; // Exit if user is not logged in
    try {
      const response = await axiosCommon.get(`/users/email/${user.email}`);
      setUserData(response.data); // Update cart data with the latest data from the server
    } catch (error) {
      console.error("Error refetching cart data:", error);
    }
  };

  // Delete cart product
  const handleDeleteAddress = async (addressId) => {
    try {
      // Delete the item from the backend
      await axiosCommon.delete(`/users/${addressId}`);
      if (userData.length === 1) {
        // Before deletion, length was 1, so after deletion it should be 0
        setUserData([]);
      }
      await refetchAddress();
    } catch (error) {
      console.error("Failed to delete address from users: ", error);
    }
  };

  if (loading) return <LoadingComponent />;
  // if (error) return <p>{error}</p>;

  const cartInfo = {
    cartData,
    productDetails,
    quantities,
    handleAddItem,
    handleRemoveItem,
    calculateSubtotal,
    tax,
    shippingCost,
    total,
    handleDeleteItem,
    userData,
    refetch,
    setUserData,
    handleDeleteAddress,
    refetchAddress,
    setCurrentAddress,
    currentAddress,
    shipmentMethod,
    setShipmentMethod,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
