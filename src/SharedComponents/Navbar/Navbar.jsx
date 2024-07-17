import wishlist from '../../../public/images/heart.svg'
import cart from '../../../public/images/Cart1.svg'
import user from '../../../public/images/user.svg'
import logo from '../../../public/icons/Logo.svg'

const Navbar = () => {

    const navlink = <>
        <li><a>Home</a></li>
        <li><a>About</a></li>
        <li><a>Contact Us</a></li>
        <li><a>Blog</a></li>
    </>
    return (
        <div className='lg:mx-40 md:mx-10 mx-4'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                    <img className='h-5' src={logo} alt="" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlink}
                    </ul>
                </div>
                <div className="navbar-end flex gap-3">
                    <img className='h-5' src={wishlist} alt="" />
                    <img className='h-5' src={cart} alt="" />
                    <img className='h-4' src={user} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;