// Importing necessary assets and libraries
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import LoadingComponent from '../Loading/LoadingComponent';
import logo from "../../assets/icons/Logo.svg"
import userLogo from "../../assets/images/user.svg"
import wishlistLogo from "../../assets/images/heart.svg"
import cartLogo from "../../assets/images/Cart1.svg"
// import useCart from '../../Hooks/useCart';


// Navbar component definition
const Navbar = () => {
    // Using custom hook to get user authentication details
    const { user, logout, loading } = useAuth();
    // const { cartItems } = useCart();
    const navigate = useNavigate();

    // Navigation links component
    const navlink = (
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li><Link to='/blog'>Blog</Link></li>
        </>
    );

    // logout
    const handleLogOut = async () => {
        try {
            await logout();
            if (loading) { <LoadingComponent /> }
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again.');
        }
    };


    // User menu items
    const userMenu = user && (
        <>
            <li><span>{user.displayName}</span></li>
            <li><Link to='/add-product'>Add Product</Link></li>
            <li onClick={handleLogOut}><Link>Logout</Link></li>
        </>
    );

    // Navbar rendering
    return (
        <div className='lg:px-40 md:px-10 px-4 max-w-[1440px] mx-auto font-inter'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    {/* Dropdown for mobile view */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navlink}
                        </ul>
                    </div>
                    {/* Logo */}
                    <Link to='/'><img className='h-7' src={logo} alt="Logo" /></Link>
                </div>

                {/* Navigation links for desktop view */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal text-lg px-1">
                        {navlink}
                    </ul>
                </div>

                {/* Icons and user avatar */}
                <div className="navbar-end flex gap-3 items-center">
                    <img className='h-7' src={wishlistLogo} alt="Wishlist" />
                    <img className='h-7' src={cartLogo} alt="Cart" onClick={() => { if (user) { navigate('/cart') } else { navigate('/sign-in') } }} style={{ cursor: 'pointer' }} />



                    {
                        user ? (
                            // User avatar with hover menu for authenticated user
                            <div className="dropdown dropdown-hover dropdown-end">
                                <div tabIndex={0} className="flex items-center cursor-pointer">
                                    <img className='h-7 mt-1 rounded-full' src={user.photoURL} alt="User" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu menu-sm p-2 shadow bg-gray-200 bg-opacity-80 font-semibold text-stone-800 rounded-box w-auto min-w-max">
                                    {userMenu}
                                </ul>

                            </div>
                        ) : (
                            // Sign-in icon for unauthenticated user
                            <Link to='/sign-in'>
                                <img className='h-4' src={userLogo} alt="User Logo" />
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
