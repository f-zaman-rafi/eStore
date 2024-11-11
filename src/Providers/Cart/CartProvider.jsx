/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import LoadingComponent from "../../SharedComponents/Loading/LoadingComponent";

// Create the Shipment Context
const CartContext = createContext();

// Create a custom hook to use the Shipment Context
export const useCart = () => {
    return useContext(CartContext);
};

// Create the provider component
export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    const [productDetails, setProductDetails] = useState([]);
    const [quantities, setQuantities] = useState({});



    // Fetch cart data
    const { data: cartData = [], isLoading, error } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            if (!user?.email) return []; // Return empty array if email is not available
            try {
                const res = await axiosCommon.get(`/cart/email/${user.email}`);
                return res.data;
            } catch (err) {
                console.error("Error fetching cart data:", err);
                return []; // Return empty array if there's an error
            }
        },
        enabled: !!user?.email, // Only run query if user email exists
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
                    const remap = response.map(res => res.data);
                    setProductDetails(remap);
                } catch (error) {
                    console.error("Error fetching product details:", error);
                }
            };
            fetchProductDetails();
        } else {
            setProductDetails([]); // Clear product details when the cart is empty
        }
    }, [cartData, axiosCommon]);

    // handle add item
    const handleAddItem = (itemId) => {
        if (cartData.length > 0) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [itemId]: (prevQuantities[itemId] || 0) + 1,
            }));
        }
    };

    // handle delete item
    const handleRemoveItem = (itemId) => {
        if (cartData.length > 0 && quantities[itemId] > 1) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [itemId]: prevQuantities[itemId] - 1,
            }));
        }
    };

    // Initialize quantities based on cart data
    useEffect(() => {
        const initialQuantities = cartData.reduce((acc, item) => {
            acc[item._id] = item.quantity || 1;
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [cartData]);


    useEffect(() => {
        const updateQuantitiesInDB = async () => {
            if (Object.keys(quantities).length > 0) {  // Only run if quantities is not empty
                try {
                    await axiosCommon.put('/cart/update-quantities', { quantities });
                    console.log("Quantities updated in DB:", quantities);  // Log to verify
                } catch (error) {
                    console.error('Failed to update quantities:', error);
                }
            }
        };

        updateQuantitiesInDB();
    }, [quantities]); // This runs only when 'quantities' change



    const calculateSubtotal = () => {
        if (cartData.length === 0) return 0;
        return cartData.reduce((total, item) => {
            const matchingDetails = productDetails.find(details => details._id === item.product_id);
            if (matchingDetails) {
                const variantPrice = matchingDetails.priceVariants.find(
                    variant => variant.variant === item.variant
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
        const totalQuantity = cartData.reduce((sum, item) => sum + (quantities[item._id] || 1), 0);

        return totalQuantity * 10;
    };



    const total = calculateSubtotal() + tax() + shippingCost();
    const queryClient = useQueryClient();


    // delete cart product
    const handleDeleteItem = async (itemId) => {
        try {
            // Delete the item from the backend
            await axiosCommon.delete(`/cart/${itemId}`);

            // Invalidate the cartData query to trigger a refetch and update the UI
            queryClient.invalidateQueries(['cartData', user?.email]);
        } catch (error) {
            console.error("Failed to delete item from cart: ", error);
        }
    };

    if (!user) return <LoadingComponent />;
    if (isLoading) return <LoadingComponent />;
    if (error) return <p>Error loading cart: {error.message}</p>;

    const cartInfo = {
        cartData,
        isLoading,
        error,
        productDetails,
        quantities,
        handleAddItem,
        handleRemoveItem,
        calculateSubtotal,
        tax,
        shippingCost,
        total,
        handleDeleteItem
    }

    return (
        <CartContext.Provider value={cartInfo}>
            {children}
        </CartContext.Provider>
    );
};
