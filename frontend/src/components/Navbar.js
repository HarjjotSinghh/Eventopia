import { Button } from "./Button";
import Logo from "./Logo";
import NavbarHeading from "./NavbarHeading";
import { Link } from "react-router-dom";
// import { HamburgerButton } from "./HamburgerButton";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const Navbar = () => {
    const clientToken = localStorage.getItem("token");
    // console.log(clientToken)
    const clientName = localStorage.getItem("name");
    const clientEmail = localStorage.getItem("email");
    const clientUserName = localStorage.getItem("userName");
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    }
    const { user } = useAuthContext();

    return (
        <>
            <nav className="bg-[rgba(255,255,255,0.8)] backdrop-blur-lg z-[999] fixed text-[18px]">
                <div className="w-screen flex flex-wrap items-center justify-between p-4 lg:px-12 px-2">
                    <Link to="/" className="flex items-center">
                        <Logo></Logo>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <div className="relative">
                            {user ? (
                                <button type="button" className="flex lg:pl-16 pl-0 lg:mr-3 items-center justify-center text-sm  rounded-full mr-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={toggleDropdown}>
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="xl:w-6 xl:h-6 w-5 h-5 mr-2 rounded-full"
                                        src="https://img.icons8.com/?size=512&id=84020&format=png"
                                        alt="user_photo"
                                        draggable="false"
                                        />
                                    {user && 
                                    (
                                        <span className="pt-1 text-[18px]">{user.name}</span>
                                    )
                                    }
                                </button>
                            ) : (
                                <Link to="/login" className="flex gap-4 justify-center items-center">
                                    <h1 className="pt-1">
                                        Login 
                                    </h1>
                                    <img className="xl:w-6 xl:h-6 w-5 h-5" draggable="false" src="https://cdn-icons-png.flaticon.com/512/3596/3596092.png" alt="login"></img>

                                </Link>
                            )}
                            
                            {isOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1  ring-1 ring-black ring-opacity-5 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    <Link to="/profile">
                                        <span className="block px-4 py-2 text-sm text-gray-800 " role="menuitem">Your Profile</span>
                                    </Link>
                                    {user.admin && (
                                            <Link to="/dashboard">
                                                <span className="block px-4 py-2 text-sm text-gray-800 " role="menuitem">Dashboard</span>
                                            </Link>
                                    )}
                                    <Link to="/settings">
                                        <span className="block px-4 py-2 text-sm text-gray-800 " role="menuitem">Settings</span>

                                    </Link>

                                        <span className="block px-4 py-2 text-sm text-gray-800 " role="menuitem" onClick={handleLogout}>Sign out</span>
                                </div>
                            )}
                        </div>

                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none" aria-controls="mobile-menu-2" aria-expanded={isMobileMenuOpen ? "true" : "false"} onClick={toggleMobileMenu}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between w-full lg:flex  lg:w-auto lg:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`} id="mobile-menu-2">
                        <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 md:">
                            <li>
                                <Link to="/" className="block py-2 pl-3 pr-4  rounded" aria-current="page" onClick={closeMobileMenu}>Home</Link>
                            </li>
                            <li>
                                <Link to="/events" className="block py-2 pl-3 pr-4 text-gray-900 rounded " onClick={closeMobileMenu}>Events</Link>
                            </li>
                            <li>
                                <Link to="/add" className="block py-2 pl-3 pr-4 text-gray-900 rounded " onClick={closeMobileMenu}>Add An Event</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="block py-2 pl-3 pr-4 text-gray-900 rounded " onClick={closeMobileMenu}>Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default Navbar;
