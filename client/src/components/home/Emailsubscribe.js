import React, { useState } from 'react'
import isEmail from 'validator/lib/isEmail';
import catchError from '../../utils/catchErrors';
import axios from 'axios';
import { posttoast } from '../../JS/Actions/actions'
import { useDispatch } from "react-redux";
import baseUrl from '../../utils/baseUrl'

function Emailsubscribe() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const handleCloseError = e => {
        e.preventDefault();
        setErrorMsg(null)
    }
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true)
        if (!isEmail(email)) {
            setErrorMsg("invaild Email")
            setFormLoading(false)
            return;
        }
        try {
            await axios.post(`${baseUrl}/api/emailsub`,
                { email: email }
            )
            setFormLoading(false)
            setEmail("")

            dispatch(posttoast({ toast: { state: 'success', text: 'Email subscription successful!', show: true} }))
        } catch (error) {
            setFormLoading(false);
            const errorMsg = catchError(error);
            setErrorMsg(errorMsg.msg);
        }
    }
    return (
        <div >
            <div className="w-full bg-[url('https://source.unsplash.com/random/640x480')] bg-center bg-cover">
                <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
                    <h1 className="text-5xl antialiased font-semibold leading-none text-center text-coolGray-100">Get Our Updates</h1>
                    <p className="pt-2 pb-8 text-xl antialiased text-center text-coolGray-100">Find out about events and other news</p>
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
                    <div className="flex flex-row">
                        <input type="email" value={email} onChange={handleChange} placeholder="example@email.com" className="w-3/5 p-3 rounded-l-lg sm:w-2/3" />
                        <button type="button" onClick={handleSubmit} className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-gray-400 text-coolGray-50">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Emailsubscribe
