import { Button } from "./Button";
import Logo from "./Logo";
import NavbarHeading from "./NavbarHeading";
import { Link } from "react-router-dom";
// import { HamburgerButton } from "./HamburgerButton";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const clientToken = localStorage.getItem("token");
    console.log(clientToken)
    const clientName = localStorage.getItem("name");
    const clientEmail = localStorage.getItem("email");
    const clientUserName = localStorage.getItem("userName");
    const {logout} = useLogout();
    const handleLogout = () => {
        logout();
    }
    const {user} = useAuthContext();

    return (
        <div>
            {/* <HamburgerButton /> */}

            <header className="navbar flex items-center justify-between fixed z-[99] top-0 w-screen py-4 bg-transparent backdrop-blur-lg backdrop-brightness-[0.99]">
            <Link to="/">
                <Logo/>
            </Link>
            <div className="navbar-links hidden flex-row xl:flex ">
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
                {user ? (
                    <button onClick={handleLogout}>
                        <NavbarHeading NavbarHeadingText="Log Out" />
                    </button>
                    ) : (
                    <Link to="/login">
                        <NavbarHeading NavbarHeadingText="Login" />
                    </Link>
                )}
                
            </div>
        </header>
        </div>
    )
};
export default Navbar;