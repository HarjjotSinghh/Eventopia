import { useAuthContext } from "../hooks/useAuthContext";

export const Button = ({ButtonText}) => {
    const { user } = useAuthContext()
    const redirectToLogin = () => {
        if (!user) {
            window.location= "/login";

        }
        if (user) {
            window.location = "/events";
        }
    }
    return (
        <div className="pt-16">
            <button onClick={redirectToLogin} id='main-button' className="relative inline-flex items-center justify-center p-[2px]  overflow-hidden xl:text-3xl text-[18px] font-medium text-gray-900 rounded-[100px] group bg-gradient-to-br from-[#ff9a7b] to-[#ff6739] group-hover:from-[#00ff9e] group-hover:to-[#2cf6e6] hover:text-gray-900 focus:ring-[0.5px] focus:outline-none focus:ring-[#00ff9e] dark:focus:ring-[#2cf6e6]">
                <span className="relative px-8 py-4 transition-all ease-[cubic-bezier(.5,0,.5,1)] duration-300 bg-[#fbfbfb] rounded-[100px] group-hover:bg-opacity-0 hover:text-[#fbfbfb]">
                    {ButtonText}
                </span>
            </button>
        </div>
        
    )
}
