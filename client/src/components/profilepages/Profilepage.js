import React, { useState} from 'react'
import Acountoverview from './Acountoverview';
import Plans from './Plan';
import Editprofile from './Editprofile';
import Tickets from './Tickets';
import Settings from './Settings';
import { useLocation } from 'react-router-dom';



function Profilepage() {
    const location = useLocation();
    const [page, setPage] = useState(location.hash === "#plan" ? "Plans" : "Account overview");
    const [show, setShow] = useState(false)
    
    const handleShow = (e) => {
        e.preventDefault();
        setShow(!show);
    }

    const Switch = (page) => {
        switch (page) {
            case "Account overview":
                return <Acountoverview />;
            case "Plans":
                return <Plans />;
            case "Edit Profile":
                return <Editprofile />;
            case "Tickets":
                return <Tickets />;
            case "Settings":
                return <Settings />;
            default:
                return <></>

        }
    };
    const isActive = "bg-gray-200"

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="container lg:flex max-w-7xl mx-auto">
                    <div className="flex flex-col invisible -mt-[471px] lg:mt-0 lg:visible w-[340px]  px-4 py-8 bg-white   ">
                        <div className="relative mt-6">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>

                            <input type="text" className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md      focus:outline-none focus:ring focus:ring-gray-300" placeholder="Search" />
                        </div>

                        <div className="flex flex-col justify-between flex-1 mt-6">
                            <nav>
                                <button onClick={()=>{setPage("Account overview");setShow(!show)}} className={` ${page === "Account overview" ? isActive : ""}  flex items-center px-4 py-2  text-gray-600 transition-colors duration-200 transform rounded-md  hover:bg-gray-100  hover:text-gray-700`} href="">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="mx-4 font-medium">Account overview</span>
                                </button>

                                <button onClick={()=>{setPage("Plans");setShow(!show)}} className={` ${page === "Plans" ? isActive : ""} flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md  hover:bg-gray-100  hover:text-gray-700`} href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>

                                    <span className="mx-4 font-medium">Plans</span>
                                </button>

                                <button onClick={()=>{setPage("Tickets");setShow(!show)}} className={`${page === "Tickets" ? isActive : ""} flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md  hover:bg-gray-100 hover:text-gray-700`} href="">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="mx-4 font-medium">Tickets</span>
                                </button>

                                <hr className="my-6 border-gray-200 " />

                                <button onClick={()=>{setPage("Edit Profile");setShow(!show)}} className={`${page === "Edit Profile" ? isActive : ""} flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md  hover:bg-gray-100  hover:text-gray-700`} href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>

                                    <span className="mx-4 font-medium">Edit Profile</span>
                                </button>

                                <button onClick={()=>{setPage("Settings");setShow(!show)}} className={`${page === "Settings" ? isActive : ""} flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md  hover:bg-gray-100  hover:text-gray-700`} href="">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="mx-4 font-medium">Settings</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                    <div className=" relative inline-block lg:hidden w-full z-10">

                        <button onClick={handleShow} className="relative flex  w-full items-center p-2 text-sm text-gray-600 bg-white border border-gray-500 rounded-md focus:border-gray-600 focus:ring-opacity-40  focus:ring-gray-600  focus:ring   focus:outline-none">
                            <span className="mx-1 grow">{page}</span>
                            <svg className="w-5 h-5 -ml-[40px] " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                            </svg>
                        </button>


                        <div className={`${show ? "" : "hidden"}  absolute right-0  w-full border border-gray-500 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl `}>
                            <button onClick={()=>{setPage("Account overview");setShow(!show)}} className="w-full flex items-center justify-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform  hover:bg-gray-100 ">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="mx-1">
                                    Account overview
                                </span>
                            </button>


                            <button onClick={()=>{setPage("Plans");setShow(!show)}} className="w-full flex items-center justify-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>

                                <span className="mx-1">
                                    Plans
                                </span>
                            </button>

                            <button onClick={()=>{setPage("Tickets");setShow(!show)}} className="w-full flex items-center justify-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100  ">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className="mx-1">
                                    Tickets
                                </span>
                            </button>

                            <hr className="border-gray-200  " />

                            <button onClick={()=>{setPage("Edit Profile");setShow(!show)}} className="w-full flex items-center justify-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100  ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>

                                <span className="mx-1">Edit Profile</span>
                            </button>
                            <button onClick={()=>{setPage("Settings");setShow(!show)}} className="w-full flex items-center justify-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100  ">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <span className="mx-1">
                                    Settings
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className=" flex flex-col w-full min-h-[83vh]  md:px-4 py-8   ">
                        {Switch(page)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profilepage