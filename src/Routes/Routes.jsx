import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Homepage/Home";
import SignIn from "../Pages/SignIn/SignIn";
import AuthGuard from "./AuthGuard";
// import About from "../Pages/About/About";
import AddProduct from "../Pages/AddProduct/AddProduct";
// import Phone from "../Pages/AddProduct/Phone/Phone";
import SmartWatch from "../Pages/AddProduct/SmartWatch/SmartWatch";
import Camera from "../Pages/AddProduct/Camera/Camera";
import Headphone from "../Pages/AddProduct/Headphone/Headphone";
import Computer from "../Pages/AddProduct/Computer/Computer";
import AddProductCategory from "../Pages/AddProduct/AddProductCategory/AddProductCategory";
import Smartphone from "../Pages/AddProduct/Smartphone/Smartphone";
import Demo from "../Pages/Demo/Demo";
import Console from "../Pages/AddProduct/Console/Console";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Cart/Checkout/Checkout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/sign-in',
                element: <AuthGuard><SignIn /></AuthGuard>
            },
            {
                path: '/about',
                element: <Demo />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/:type/:id',
                element: <ProductDetails />
            },
            {
                path: '/add-product',
                element: <AddProduct />,
                children: [
                    {
                        path: '',
                        element: <AddProductCategory />
                    },
                    {
                        path: 'phone',
                        element: <Smartphone />
                    },
                    {
                        path: 'smartwatch',
                        element: <SmartWatch />
                    },
                    {
                        path: 'camera',
                        element: <Camera />
                    },
                    {
                        path: 'headphone',
                        element: <Headphone />
                    },
                    {
                        path: 'computer',
                        element: <Computer />
                    },
                    {
                        path: 'console',
                        element: <Console />
                    },
                ]
            }
        ],
    },
]);
