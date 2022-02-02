import React from 'react'
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom'
import Toaster from '../components/Toaster';


function Solutions() {
    return (
        <>
            <Header />
            <Toaster />
            <div className="max-w-7xl mx-auto my-2.5 h-full flex flex-col shadow overflow-hidden">
                <section id="analytics" className="hover:bg-gray-100  lg:py-12 flex lg:flex-row justify-center">
                    <div className="bg-white  lg:mx-8 flex-row lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                        <div className="lg:w-[512px]">
                            <img src="/analytics.jpg" />
                        </div>
                        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-[512px]">
                            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">Analytics</h2>
                            <p className="mt-4 text-gray-600 ">Get a better understanding of where your traffic is coming from. Track all sales data -such as top menu items, busiest selling times, best-performing team members and profits and get detailed records for tax reporting purposes.</p>

                            <div className="mt-8">
                                <Link to="/pricing" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="engagement" className="hover:bg-gray-100  lg:py-12 flex lg:flex-row justify-center">
                    <div className="mx-auto bg-white  lg:mx-8 justify-center flex-row lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                        <div className="lg:w-[512px] ">
                            <img src="/engagement.jpg" />
                        </div>
                        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-[512px]">
                            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">Engagement</h2>
                            <p className="mt-4 text-gray-600 ">Speak directly to your customers in a more meaningful way. Track and filter your sales and customer data, you'll have access to a wealth of information to help you grow your business and make better marketing decisions.</p>

                            <div className="mt-8">
                                <Link to="/pricing" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="security" className="hover:bg-gray-100  lg:py-12 flex lg:flex-row justify-center">
                    <div className="bg-white  lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                        <div className="lg:w-[512px]">
                            <img src="/security.jfif" />
                        </div>
                        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-[512px] ">
                            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">Security</h2>
                            <p className="mt-4 text-gray-600 ">Your customers' data will be safe and secure.</p>

                            <div className="mt-8">
                                <Link to="/pricing" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="integrations" className="hover:bg-gray-100  lg:py-12 flex lg:flex-row justify-center">
                    <div className="bg-white  lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                        <div className="lg:w-[512px]">
                            <img src="/integration.jpg" />
                        </div>
                        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-[512px]">
                            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">Integrations</h2>
                            <p className="mt-4 text-gray-600 ">Connect with third-party tools that you're already using.</p>

                            <div className="mt-8">
                                <Link to="/pricing" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="automations" className="hover:bg-gray-100  lg:py-12 flex lg:flex-row justify-center">
                    <div className="bg-white  lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                        <div className="lg:w-[512px]">
                            <img src="automation.jpg" />
                        </div>
                        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-[512px]">
                            <h2 className="text-2xl font-bold text-gray-800  md:text-3xl">Automations</h2>
                            <p className="mt-4 text-gray-600 ">Build strategic funnels that will drive your customers to convert.</p>

                            <div className="mt-8">
                                <Link to="/pricing" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Solutions
