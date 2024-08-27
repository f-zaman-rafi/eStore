import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Homepage/Home";
import SignIn from "../Pages/SignIn/SignIn";
import AuthGuard from "./AuthGuard";
import About from "../Pages/About/About";
import AddProduct from "../Pages/AddProduct/AddProduct";

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
                element: <About />
            },
            {
                path: '/add-product',
                element: <AddProduct />
            }
        ],
    },
]);

