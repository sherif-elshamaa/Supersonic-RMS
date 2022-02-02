import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getsub, posttoast } from '../../JS/Actions/actions'
import { useLocation, useNavigate } from 'react-router-dom';
import catchError from '../../utils/catchErrors';
import baseUrl from '../../utils/baseUrl'
// stripe
import { useStripe, useElements } from '@stripe/react-stripe-js';

// Custom Components
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            'color': '#ffffff',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};


function Checkout() {
    const dispatch = useDispatch();
    const history = useNavigate()
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const state = useSelector((states) => states)
    const [user, setUser] = useState(state.status.user)
    const location = useLocation();


    useEffect(() => {
        if (state.sub) {
            if (state.sub.status === true && state.sub.planType === "PRO") {
                history('/profile#plan')
            }
            if (state.sub.planType === "free" && location.pathname === "/subscribe/free") {
                history('/profile#plan')
            }
        }
    }, [state])

    const stripe = useStripe();
    const elements = useElements();


    const handleCloseError = e => {
        e.preventDefault();
        setErrorMsg(null)
    }

    const handleFreeSub = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const res = await axios.post(`${baseUrl}/api/freesub`, { 'email': user.email });
            const { subscription } = res.data;
            dispatch(getsub({ sub: subscription }))
            dispatch(posttoast({ toast: { state: 'success', text: 'Subscribe successful!', show: true } }))

            setFormLoading(false)
            history('/profile#plan')
        } catch (error) {
            setFormLoading(false);
            const errorMsg = catchError(error);
            setErrorMsg(errorMsg.msg)
        }
    }
    const handleSubmitSub = async (event) => {
        event.preventDefault();
        // 4000 0000 0000 9995
        // 4242 4242 4242 4242
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.

            return;
        }
        setFormLoading(true);
        try {
            const result = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    email: user.email,
                },
            });

            if (result.error) {
                console.log(result.error.message, 'hi');
                const errorMsg = catchError(result.error);
                setErrorMsg(errorMsg);
                setFormLoading(false);
                return
            } else {

                const res = await axios.post(`${baseUrl}/api/sub`, { 'payment_method': result.paymentMethod.id, 'email': user.email, 'id': user.ID });
                const { client_secret, status, subscription } = res.data;
                dispatch(getsub({ sub: subscription }))
                dispatch(posttoast({ toast: { state: 'success', text: 'Subscribe successful!', show: true } }))
                if (status === 'requires_action') {
                    stripe.confirmCardPayment(client_secret).then(function (result) {
                        if (result.error) {
                            console.log('There was an issue!');
                            console.log(result.error);
                            const errorMsg = catchError(result.error);
                            setErrorMsg(errorMsg);
                            setFormLoading(false);
                            // Display error message in your UI.
                            // The card was declined (i.e. insufficient funds, card has expired, etc)
                        } else {
                            console.log('subscription success');
                            setErrorMsg(null)
                            // Show a success message to your customer
                        }
                    });
                } else {
                    console.log('subscription success');
                    setErrorMsg(null)
                    // No additional information was needed
                    // Show a success message to your customer
                }

            }
            setFormLoading(false)
            if (errorMsg === null) {
                history('/profile#plan')
            }
        } catch (error) {
            setFormLoading(false);
            const errorMsg = catchError(error);

            if (errorMsg.error === undefined) {
                setErrorMsg(errorMsg.msg)
            } else {

                setErrorMsg(errorMsg.error.decline_code);
            }
        }
    };

    return (
        <>
            {location.pathname === "/subscribe/pro" ?

                <div>
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
                    <div className="rounded-2xl overflow-hidden shadow-lg mt-10">
                        <div className="flex w-full justify-center my-8  sm:px-4 ">
                            <div className="p-6 flex hover:bg-gray-300 space-y-6 rounded shadow sm:p-8 bg-coolGray-50">
                                <div className="">
                                    <h4 className="text-2xl font-bold">Pro</h4>
                                    <span className="text-2xl font-bold">$60
                                        <span className="text-sm tracking-wide">/month</span>
                                    </span>
                                    <p className="leading-relaxed">Streamline operations and boost revenue as your needs grow more complex.</p>
                                    <ul className="lg:flex lg:space-x-2 ">
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
                                </div>
                            </div>
                        </div>
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
                        <div
                            className="flex justify-center p-10 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                        >
                            <div
                                className="w-64 h-40 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-between m-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="34"
                                        height="34"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="#ffffff"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <rect x="3" y="5" width="18" height="14" rx="3" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                        <line x1="7" y1="15" x2="7.01" y2="15" />
                                        <line x1="11" y1="15" x2="13" y2="15" />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="34"
                                        height="34"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="#ffffff"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <circle cx="9.5" cy="9.5" r="5.5" fill="#fff" />
                                        <circle cx="14.5" cy="14.5" r="5.5" />
                                    </svg>
                                </div>
                                <div className="mx-[50px] my-5">
                                    <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                                </div>
                                <div
                                    className="flex flex-col justfiy-end mt-4 p-4 text-gray-400 font-quick"
                                >
                                    <div className="flex">
                                        <div className="w-full">
                                            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                                        </div>
                                        <div className="w-full">
                                            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                                        </div>
                                    </div>
                                    <h4 className="uppercase tracking-wider font-semibold text-xs">
                                        {user.firstname + " " + user.lastname}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 flex justify-center">
                            <button
                                onClick={handleSubmitSub}
                                className="inset-y-1 p-3 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white"
                            >
                                Supscribe Now!
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div>
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
                    <div className="rounded-2xl overflow-hidden shadow-lg mt-10">
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
                        <div className="flex w-full justify-center my-8  sm:px-4 ">
                            <div className="p-6 flex hover:bg-gray-300 space-y-6 rounded shadow sm:p-8 bg-coolGray-50">
                                <div className="">
                                    <h4 className="text-2xl font-bold">Beginner</h4>
                                    <span className="text-2xl font-bold">Free
                                    </span>
                                    <p className="leading-relaxed">Everything you need to handle day-to-day service.</p>
                                    <ul className="lg:flex lg:space-x-2 ">
                                        <li className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Point of Sale</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>Team Management</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                            </svg>
                                            <span>9am to 5pm support</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex justify-center p-10 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                        >
                            <div className="p-8 flex justify-center">
                                <button
                                    onClick={handleFreeSub}
                                    className="inset-y-1 p-3 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white"
                                >
                                    Supscribe Now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Checkout
