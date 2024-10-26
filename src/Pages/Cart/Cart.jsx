import { useEffect, useState } from "react";
import useCart from "../../Hooks/useCart";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const Cart = () => {
    const { cartItems } = useCart();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const axiosCommon = useAxiosCommon();

    useEffect(() => {
        const fetchProducts = async () => {
            const productPromises = cartItems.map(async (item) => {
                try {
                    const response = await axiosCommon.get(`/${item.product_type}/${item.product_id}`);
                    if (response.status === 200) { // Check if the response status is OK
                        const product = response.data; // Access the data directly
                        return { ...product, quantity: item.quantity }; // Include quantity from cart item
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
                return null; // Return null if the product is not found or an error occurred
            });

            const products = await Promise.all(productPromises);
            // Filter out null responses
            setFilteredProducts(products.filter((product) => product !== null));
        };

        if (cartItems.length > 0) { // Only fetch if there are items in the cart
            fetchProducts();
        }
    }, [cartItems, axiosCommon]); // Added axiosCommon to the dependency array

    return (
        <div>
            <h1>This is the cart page</h1>
            <h1>Products: {filteredProducts.length}</h1>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product._id}>
                        <h2>{product.Title}</h2>
                        <p>Price: {product.priceVariants[0].price} | Quantity: {product.quantity}</p>
                        <img src={product.image} alt={product.Title} style={{ width: '100px' }} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
