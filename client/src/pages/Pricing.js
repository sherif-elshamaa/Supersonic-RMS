import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import Toaster from '../components/Toaster';
import { useDispatch, useSelector } from "react-redux";
import baseUrl from '../utils/baseUrl'
import { getprices } from '../JS/Actions/actions'
import axios from 'axios';



function Pricing() {
    const dispatch = useDispatch();
    const state = useSelector((states) => states)
    const [prices, setPrices] = useState(state.prices)
    const [formLoading, setFormLoading] = useState(false);
    useEffect(() => {
        try {
            async function get(){
                setFormLoading(true)
                const data = await axios.get(`${baseUrl}/api/plans`,
                { withCredentials: true })
                dispatch(getprices(data.data.plans))
                setFormLoading(false)
            }
            get()
        } catch (error) {
            setFormLoading(false);
            console.log(error);
        }
    }, [])

    useEffect(() => {
        setPrices(state.prices)
    }, [state])
    const pro = prices.filter(prices => prices.type === "PRO")
    return (
        <div className="h-screen">
            <Header />
            <Toaster />
            <div className="absolute hidden w-full bg-white lg:block h-96" />
            <div className="relative px-4 py-16 bg-white mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                {formLoading ?
                    <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                        <span className="text-blue-500 opacity-75 right-10 top-60 my-0 mx-auto block relative w-0 h-0">
                            <svg xmlns="http://www.w3.org/2000/svg"  >
                                <circle cx="50" cy="50" fill="none" stroke="#1d3f72" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
                                </circle>
                            </svg>
                        </span>
                    </div>
                    : ""
                }
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        <span className="relative inline-block">
                            <svg
                                viewBox="0 0 52 24"
                                fill="currentColor"
                                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                            >
                                <defs>
                                    <pattern
                                        id="2c67e949-4a23-49f7-bf27-ca140852cf21"
                                        x="0"
                                        y="0"
                                        width=".135"
                                        height=".30"
                                    >
                                        <circle cx="1" cy="1" r=".7" />
                                    </pattern>
                                </defs>
                                <rect
                                    fill="url(#2c67e949-4a23-49f7-bf27-ca140852cf21)"
                                    width="52"
                                    height="24"
                                />
                            </svg>
                            <span className="relative">Affordable</span>
                        </span>{' '}
                        for everyone
                    </h2>
                    <p className="text-base text-gray-500 md:text-lg">
                        Three flexible plans. No hidden fees.Upgrade or downgrade, add or subtracttools, and cancel your plan at any time.
                    </p>
                </div>
                <section className=" bg-coolGray-100 text-coolGray-800">
                    <div className="container px-4 mx-auto">

                        <div className="flex flex-wrap items-stretch -mx-4">
                            <div className="flex w-full justify-center mb-8  sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                                <div className="flex flex-col  p-6 space-y-6 max-w-[379px] hover:bg-gray-300 rounded shadow sm:p-8 text-coolGray-50">
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-bold">Beginner</h4>
                                    </div>
                                    <span className="text-6xl font-bold">Free</span>
                                    <p className="mt-3 leading-relaxed text-coolGray-600">Everything you need to handle day-to-day service.</p>
                                    <ul className="flex-1 mb-6 text-Gray-900">
                                        <li className="flex mb-2 space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Point of Sale</span>
                                        </li>
                                        <li className="flex mb-2 space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Team Management</span>
                                        </li>
                                        <li className="flex mb-2 space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>9am to 5pm support</span>
                                        </li>
                                    </ul>
                                    <Link to="/subscribe/free" type="button" className="hover:bg-gray-800 inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-gray-600 text-white">Get Started</Link>
                                </div>
                            </div>
                            <div className="flex w-full mb-8 justify-center mx-auto sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                                <div className="p-6 flex flex-col max-w-[379px] hover:bg-gray-300 space-y-6 rounded shadow sm:p-8 bg-coolGray-50">
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-bold">Pro</h4>
                                    </div>
                                    <span className="text-6xl font-bold">${pro[0] ? pro[0].price : ""}
                                        <span className="text-sm tracking-wide">/month</span>
                                    </span>
                                    <p className="leading-relaxed">Streamline operations and boost revenue as your needs grow more complex.</p>
                                    <ul className="flex-1 space-y-2">
                                        <li className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Advanced POS features</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Team Plus</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Live sales</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>24/7 support</span>
                                        </li>
                                    </ul>
                                    <Link to="/subscribe/pro" type="button" className="hover:bg-gray-800 inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-gray-600 text-white">Get Started</Link>                                    </div>
                            </div>
                            <div className="flex w-full mb-8 justify-center sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                                <div className="p-6 max-w-[379px] flex flex-col hover:bg-gray-300 space-y-6 rounded shadow sm:p-8 bg-coolGray-50">
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-bold">Premium</h4>
                                    </div>
                                    <span className="text-6xl font-bold">custom pricing
                                    </span>
                                    <p className="leading-relaxed text-coolGray-600">Get a custom plan that scales as you expand your footprint and your brand.</p>
                                    <ul className="space-y-2 text-coolGray-600">
                                        <li className="flex items-start space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Everything in Pro</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Advanced discounts</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Multi-device sync</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Kitchen performance reports</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 ">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>24/7 support</span>
                                        </li>
                                    </ul>
                                    <Link to="" className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded bg-gray-600 hover:bg-gray-800 text-white">Contact Sales</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}

export default Pricing
