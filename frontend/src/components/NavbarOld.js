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

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const {logout} = useLogout();
    const handleLogout = () => {
        logout();
    }
    const {user} = useAuthContext();

    return (
        <div>
            {/* <HamburgerButton /> */}

            <div className="navbar flex items-center justify-between fixed z-[99] top-0 w-screen py-4 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg">
                
            <Link to="/">
                <Logo/>
            </Link>
            <div className="navbar-links hidden flex-row 2xl:flex pr-[13vw]">
                <Link to="/home">
                    <NavbarHeading NavbarHeadingText="Home"/>
                </Link>
                <Link to="/events">
                    <NavbarHeading NavbarHeadingText="Events"/>
                </Link>
                <Link to="/add">
                    <NavbarHeading NavbarHeadingText="Add An Event"/>
                </Link>
                <Link to="/contact">
                    <NavbarHeading NavbarHeadingText="Contact Us"/>
                </Link>
            </div>
            {!user && (
                <Link to="/login" className="pr-4">
                    <NavbarHeading NavbarHeadingText="Login"/>
                </Link>
            )}
            {user && (<div></div>)}
            
        </div>
        <div>
        {user ? (
                    <  div className="z-[999] fixed lg:top-[24px] top-[16px] lg:right-10 right-2">
                        <div className="z-[999]">
                        <button
                            id="dropdownAvatarNameButton"
                            data-dropdown-toggle="dropdownAvatarName"
                            className="flex items-center justify-center text-sm font-medium text-gray-900 rounded-full hover:text-orange-400  "
                            type="button"
                            onClick={toggleDropdown}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                            className="xl:w-8 xl:h-8 w-6 h-6 mr-2 rounded-full"
                            src="https://img.icons8.com/?size=512&id=84020&format=png"
                            alt="user_photo"
                            draggable="false"
                            />
                            <span className="lg:text-2xl text-xl">{user.name}</span> 
                            <svg
                            className="w-4 h-4 mx-1.5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                            </svg>
                        </button>

                        {isOpen && (
                            <div
                            id="dropdownAvatarName"
                            className="z-10 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg divide-y divide-gray-100 rounded-lg  shadow "
                            >
                            <div className="px-4 py-3 text-sm text-gray-900 ">
                            </div>
                            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownAvatarNameButton">

                                    <li className="">
                                    <Link to="/" className="lg:text-lg text-md block px-4 py-2 hover:bg-[rgba(255,216,202,0.8)] ">
                                        Your Profile
                                    </Link>  
                                    </li>

                                <li className="">
                                    <Link to="/" className="lg:text-lg text-md block px-4 py-2 hover:bg-[rgba(255,216,202,0.8)] ">
                                        Settings
                                    </Link>  
                                </li>
                            </ul>
                            <div className="py-2">

                                    <Link onClick={handleLogout} className="lg:text-lg text-md block px-4 py-2 text-gray-700 hover:bg-[rgba(255,216,202,0.8)] ">
                                        Sign out

                                    </Link>
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    ) : (
                    <Link to="/login">
                        <NavbarHeading NavbarHeadingText="Login" />
                    </Link>
                )}
        </div>
        </div>
    )
};
export default Navbar;