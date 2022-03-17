import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import catchError from '../../utils/catchErrors';
import axios from 'axios';
import { getinfo, posttoast } from '../../JS/Actions/actions'
import baseUrl from '../../utils/baseUrl'




function Getinfo() {
    const dispatch = useDispatch();
    const state = useSelector((states) => states)
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [businessType, setBusinessType] = useState("Restaurant");
    const [employessNumber, setEmployessNumber] = useState("");
    const [businessNumber, setBusinessNumber] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");


    const handleCloseError = e => {
        e.preventDefault();
        setErrorMsg(null)
    }
    const handleCompanyName = e => {
        setCompanyName(e.target.value)
    }
    const handleBusinessType = e => {
        setBusinessType(e.target.value)
    }
    const handleEmployessNumber = e => {
        setEmployessNumber(e.target.value)
    }
    const handleBusinessNumber = e => {
        setBusinessNumber(e.target.value)
    }
    const handleAddress = e => {
        setAddress(e.target.value)
    }
    const handleCountry = e => {
        setCountry(e.target.value)
    }
    const handleCity = e => {
        setCity(e.target.value)
    }
    const handleZipCode = e => {
        setZipCode(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/checkAuthentication`,
                { withCredentials: true }
            )
            const subscriberData = {
                userId: state.status.user.ID,
                companyName: companyName,
                businessType: businessType,
                numberOfEmployees: employessNumber,
                businessNumber: businessNumber,
                address: address,
                country: country,
                city: city,
                zipCode: zipCode,
            }
            if (data.authenticated === true) {
                await axios.post(
                    `${baseUrl}/api/subscriberdata`,
                    subscriberData,
                    { withCredentials: true }
                )
            }
            // dispatch subscription data to state 
            dispatch(posttoast({ toast: { state: 'success', text: 'Company data saved successful!', show: true } }))
            setFormLoading(false)
            dispatch(getinfo({info: subscriberData}))
        } catch (error) {
            setFormLoading(false);
            const errorMsg = catchError(error);
            setErrorMsg(errorMsg.msg);
        }
    }

    return (
        <div className="mt-8 w-full md:w-3/4 mx-auto mb-8">
            <h1 className="text-center text-gray-900 text-2xl mb-4">Tell us more about your business.</h1>
            <form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6 ">
                        {formLoading ?
                            <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-10">
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
                        <div className="space-y-3 md:w-3/4">
                            <div>
                                {errorMsg !== null ?
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <strong className="font-bold">Holy smokes!</strong>
                                        <span className="block sm:inline"> {errorMsg}</span>
                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                            <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={handleCloseError} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                        </span>
                                    </div>
                                    :
                                    ""}
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                                    Company name
                                </label>
                                <input
                                    type="text"
                                    name="company-name"
                                    id="company-name"
                                    value={companyName}
                                    onChange={handleCompanyName}
                                    autoComplete="given-name"
                                    required
                                    className="mt-1  focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="business-type" className="block text-sm font-medium text-gray-700">
                                    Business type
                                </label>
                                <select
                                    type="text"
                                    name="business-type"
                                    id="business-type"
                                    value={businessType}
                                    onChange={handleBusinessType}
                                    required
                                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Food truck">Food truck</option>
                                    <option value="Coffee shop">Coffee shop</option>
                                </select>
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="number-of-employess" className="block text-sm font-medium text-gray-700">
                                    Number of employees
                                </label>
                                <input
                                    type="number"
                                    name="number-of-employess"
                                    id="number-of-employess"
                                    value={employessNumber}
                                    onChange={handleEmployessNumber}
                                    required
                                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="business-number" className="block text-sm font-medium text-gray-700">
                                    Business Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="business-number"
                                    id="business-number"
                                    value={businessNumber}
                                    onChange={handleBusinessNumber}
                                    required
                                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <br />
                            <hr className="border-gray-200  " />

                            <div className="shadow overflow-hidden sm:rounded-md ">
                                <div className="px-4 py-5 bg-white sm:p-6 space-y-3">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={address}
                                        onChange={handleAddress}
                                        required
                                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="Country"
                                        id="Country"
                                        value={country}
                                        onChange={handleCountry}
                                        required
                                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="City"
                                        id="City"
                                        value={city}
                                        onChange={handleCity}
                                        required
                                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">
                                        ZIP Code
                                    </label>
                                    <input
                                        type="text"
                                        name="zip-code"
                                        id="zip-code"
                                        value={zipCode}
                                        onChange={handleZipCode}
                                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Go to Checkout
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Getinfo
