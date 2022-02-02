import React from 'react'
import { Link } from 'react-router-dom'

function Eventpage() {
    return (

        <div className="max-w-7xl mx-auto my-2.5 h-full flex flex-col shadow overflow-hidden">
            <section className="w-full py-12 flex flex-col justify-center hover:bg-gray-100">
                <div className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:h-48">
                    <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 ">
                        <div className="px-6 py-6 md:px-8 md:py-0">
                            <h2 className="text-lg font-bold text-gray-700  md:text-gray-100">Sign Up For <span className="text-black">Events</span> Updates</h2>

                            <p className="mt-2 text-sm text-gray-600  md:text-gray-400">See what meet-ups and other events we might be planning near you.</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
                        <form>
                            <div className="flex flex-col p-1 overflow-hidden border rounded-lg  lg:flex-row  focus-within:ring focus-within:ring-opacity-40 focus-within:border-gray-400 focus-within:ring-gray-300">
                                <input className="px-6 py-2 border text-gray-700 placeholder-gray-500 bg-white outline-none  focus:placeholder-transparent " type="text" name="email" placeholder="Enter your email" aria-label="Enter your email" />
                                <button className="px-4 py-3  text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mx-auto mt-12 ">
                    <img src="/events.jpg" />
                </div>
            </section>
            
        </div>
    )
}

export default Eventpage
