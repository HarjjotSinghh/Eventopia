import logoSvg from "../assets/svg/Eventopia Logo Black Text2.svg"

const Logo = () => {
    return (
        <div className="logo">
            <img className="xl:h-[50px] h-[30px] w-auto" src={logoSvg} alt="" draggable="false"></img>
        </div>
    )
}
export default Logo;