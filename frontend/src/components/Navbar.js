import Logo from "./Logo";
import NavbarHeading from "./NavbarHeading";
import { Link } from "react-router-dom";
// import { HamburgerButton } from "./HamburgerButton";

const Navbar = () => {
    const clientToken = localStorage.getItem("token");
    const clientName = localStorage.getItem("name");
    const clientEmail = localStorage.getItem("email");
    const clientUserName = localStorage.getItem("userName");


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
                <Link to="/apply">
                    <NavbarHeading NavbarHeadingText="Add An Event"/>
                </Link>
                <Link to="/contact">
                    <NavbarHeading NavbarHeadingText="Contact Us"/>
                </Link>
                {!clientToken && <Link to="/login">
                    <NavbarHeading NavbarHeadingText="Login"/>
                </Link>
                }
                {clientToken && <NavbarHeading NavbarHeadingText={clientName}/>}
                
            </div>
        </header>
        </div>
        

    )
};
export default Navbar;