import React from 'react'
import Header from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Toaster from '../components/Toaster';

function More() {
    return (
        <div>
            <Header />
            <Toaster />
            <div className="max-w-7xl mx-auto my-2.5 h-full flex flex-col shadow overflow-hidden">
                <section id="analytics" className="hover:bg-gray-100  lg:py-12 flex lg:flex-row justify-center">
                    <div className="bg-white  lg:mx-8 flex-row lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                        <div className="lg:w-[512px]">
                            <img src="/helpcenter.jpg" />
                        </div>
                        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-[512px]">
                            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">Help Center</h2>
                            <p className="mt-4 text-gray-600 ">Get all of your questions answered in our forums or contact support.</p>

                            <div className="mt-8">
                                <Link to="/contactus" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="analytics" className="hover:bg-gray-100  lg:py-12 flex lg:flex-row justify-center">
                    <div className="bg-white  lg:mx-8 flex-row lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                        <div className="lg:w-[512px]">
                            <img src="/helpcenter.jpg" />
                        </div>
                        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-[512px]">
                            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">Events</h2>
                            <p className="mt-4 text-gray-600 ">See what meet-ups and other events we might be planning near you.</p>

                            <div className="mt-8">
                                <Link to="/events" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Check out our event</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default More
