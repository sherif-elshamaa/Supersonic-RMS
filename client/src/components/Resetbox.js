import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import catchError from '../utils/catchErrors'
import isEmail from 'validator/lib/isEmail';
import baseUrl from '../utils/baseUrl';
import { useDispatch } from "react-redux";
import { posttoast } from "../JS/Actions/actions";

function Resetbox() {

    const history = useNavigate()
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const handleCloseError = e => {
        e.preventDefault();
        setErrorMsg(null)
    }

    const handleChange = e => {
        const value = e.target.value;
        setEmail(value)
        setSubmitDisabled(true)
        if (isEmail(value)) {
            setSubmitDisabled(false);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setFormLoading(true);
        if (!isEmail(email)) {
            setErrorMsg("invaild Email")
            return;
        }
        try {
            let reset = {
                email: email, 
            }
            const { data } = await axios.post(
                `${baseUrl}/api/reset`,
                reset,
                { withCredentials: true }
            );
            history('/')
            console.log(data.msg);
            dispatch(posttoast({toast:{state: 'success', text: `Password Reset Success. Check your email`, show: true}}))
        } catch (error) {
            const errorMsg = catchError(error);
            
            setErrorMsg(errorMsg.msg);
            setFormLoading(false);
        }
    }
    return <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
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
                    <Link to="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src="/supersonic solutions-logos_black.png"
                            alt="Workflow"
                        />

                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your Password</h2>

                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
                        <form onSubmit={handleSubmit}>
                            <div className="flex-col">
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
                                <div>
                                    <label className="text-gray-700 " htmlFor="emailAddress">Email Address</label>
                                    <input
                                        id="emailAddress"
                                        type="email"
                                        onChange={handleChange}
                                        value={email}
                                        className={`${submitDisabled?"focus:border-red-400 focus:ring-red-300":"focus:border-blue-400 focus:ring-blue-300"} block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:ring-opacity-40  focus:outline-none focus:ring`} />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button disabled={submitDisabled} type="submit" className={`${submitDisabled ? "cursor-not-allowed" : ""} px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600`}>Reset Password</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </>;
}

export default Resetbox;
