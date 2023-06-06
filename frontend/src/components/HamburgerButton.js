export const HamburgerButton  = () => {
    return (
        <div className="z-[111] flex items-center justify-end fixed top-0 pr-6 w-screen py-3 ">
            <button className="group relative xl:invisible">
                <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-gradient-to-b from-[#00ff9e] to-[#2cf6e6] ring-0 ring-gray-300 hover:ring-4 group-focus:ring-4 ring-opacity-20 duration-200 shadow-md">
                    <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                        <div className="bg-[#fbfbfb] h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10"></div>
                        <div className="bg-[#fbfbfb] h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75"></div>
                        <div className="bg-[#fbfbfb] h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150"></div>

                        <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                        <div className="absolute bg-[#fbfbfb] h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
                        <div className="absolute bg-[#fbfbfb] h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
};
