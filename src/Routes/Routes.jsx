import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Homepage/Home";
import SignIn from "../Pages/SignIn/SignIn";
import AuthGuard from "./AuthGuard";
import About from "../Pages/About/About";
import DashHome from "../Pages/Dashboard/DashHome/DashHome";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Dashboard from "../Layout/Dashboard";

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
        ],
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: '/dashboard',
                element: <DashHome />
            },
            {
                path: 'add-product',
                element: <AddProduct />
            }
        ]
    }
]);

