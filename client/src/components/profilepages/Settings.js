import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import catchError from '../../utils/catchErrors';
import axios from 'axios';
import { getnotification, posttoast } from '../../JS/Actions/actions'
import baseUrl from '../../utils/baseUrl'

function Settings() {
    const notifications = useSelector((states) => states.notification);
    const dispatch = useDispatch();
    const history = useNavigate()
    const [offers, setOffers] = useState(notifications.offers);
    const [subscriptions, setSubscriptions] = useState(notifications.subscriptions);
    const [profileUpdate, setProfileUpdate] = useState(notifications.profileUpdate);
    const [sms, setSms] = useState(notifications.smsNotification);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        
        
    }, [notifications])
    const handleCloseError = e => {
        e.preventDefault();
        setErrorMsg(null)
    }
    const handleOffers = (e) => {
        setOffers(!offers)
    }
    const handleSubscriptions = (e) => {
        setSubscriptions(!subscriptions)
    }
    const handleProfileUpdate = (e) => {
        setProfileUpdate(!profileUpdate)
    }
    const handleSms = (e) => {
        setSms(e.target.id);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const  { data }  = await axios.get(
                `${baseUrl}/api/checkAuthentication`,
                { withCredentials: true }
            )
            const update = {
                userId: data.id,
                offers: offers,
                subscriptions: subscriptions,
                profileUpdate: profileUpdate,
                smsNotification: sms,
                updateDate: Date.now()
            }
            if (data.authenticated === true) {
                const notification = await axios.put(
                    `${baseUrl}/api/notification`,
                    update,
                    { withCredentials: true }
                )
                dispatch(getnotification({ notification: notification.data.notification }))
            }
            setFormLoading(false)
            dispatch(posttoast({ toast: { state: 'success', text: 'Settings saved successful!', show: true } }))
            history('/')
        } catch (error) {
            setFormLoading(false);
            const errorMsg = catchError(error);
            setErrorMsg(errorMsg.msg);
        }
    }
    return (
        <div className="w-full h-full flex flex-col shadow overflow-hidden">
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
            <div className="mt-8 mx-auto md:ml-10 md:w-3/4 mb-8">
                <div className="">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                                <p className="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form onSubmit={handleSubmit}>
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <fieldset>
                                            <legend className="text-base font-medium text-gray-900">By Email</legend>
                                            <div className="mt-4 space-y-4">
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            id="offers"
                                                            name="offers"
                                                            type="checkbox"
                                                            checked={offers}
                                                            onChange={handleOffers}
                                                            className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="offers" className="font-medium text-gray-700">
                                                            Offers
                                                        </label>
                                                        <p className="text-gray-500">Get notified for new offers and prices update.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            id="Subscriptions"
                                                            name="Subscriptions"
                                                            type="checkbox"
                                                            checked={subscriptions}
                                                            onChange={handleSubscriptions}
                                                            className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="Subscriptions" className="font-medium text-gray-700">
                                                            Subscriptions
                                                        </label>
                                                        <p className="text-gray-500">Get notified on any subscription event.</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            id="Profile update"
                                                            name="Profile update"
                                                            type="checkbox"
                                                            checked={profileUpdate}
                                                            onChange={handleProfileUpdate}
                                                            className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="Profile update" className="font-medium text-gray-700">
                                                            Profile update
                                                        </label>
                                                        <p className="text-gray-500">Get notified on any profile and password updates.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <div>
                                                <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                                                <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                            </div>
                                            <div className="mt-4 space-y-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-everything"
                                                        name="push-notifications"
                                                        type="radio"
                                                        onChange={handleSms}
                                                        checked={sms === "push-everything" ? true : false}
                                                        className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"
                                                    />
                                                    <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                                        Everything
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-email"
                                                        name="push-notifications"
                                                        type="radio"
                                                        onChange={handleSms}
                                                        checked={sms === "push-email" ? true : false}
                                                        className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"
                                                    />
                                                    <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                                        Same as email
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="push-nothing"
                                                        name="push-notifications"
                                                        type="radio"
                                                        onChange={handleSms}
                                                        checked={sms === "push-nothing" ? true : false}
                                                        className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300"
                                                    />
                                                    <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                                        No push notifications
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
