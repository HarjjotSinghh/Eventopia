const NavbarHeading = ({NavbarHeadingText}) => {
    return (
        <div className="NavbarHeadingText text-2xl text-gray-950 select-none px-12 transition-all hover:text-teal-200 hover:scale-[1.02] origin-center hover:opacity-70 hover:underline-offset-4" style={{transitionTimingFunction: "cubic-bezier(.62,.04,.51,.98) !important", transitionDuration: "1s !important"}}>
            <h2 className={NavbarHeadingText}>{NavbarHeadingText}</h2>
        </div>
    )
}
export default NavbarHeading;