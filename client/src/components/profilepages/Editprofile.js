import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import catchError from '../../utils/catchErrors';
import axios from 'axios';
import { update, posttoast } from '../../JS/Actions/actions'
import baseUrl from '../../utils/baseUrl'


function Editprofile() {
    const user = useSelector((states) => states.status.user)
    const dispatch = useDispatch();
    const history = useNavigate()
    const [fn, setFn] = useState(user.firstname);
    const [ln, setLn] = useState(user.lastname);
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [oldPassword, setOldpassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [toggle, setToggle] = useState(false)
    const [disable, setDisable] = useState(false)
    const toggleBackground = toggle ? "bg-white" : "bg-gray-200 text-gray-600 cursor-not-allowed"
    // email checher
    useEffect(() => {
        if (toggle === true) {
            if (password === "" || confirmpassword === "" || oldPassword === "") {
                setDisable(true)
            }else{
                setDisable(false)
            }
        }
    }, [toggle,confirmpassword,password,oldPassword])
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    // phone checher
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    const handleToggleChange = (e) => {
        setToggle(!toggle);

    }
    const handleCloseError = e => {
        e.preventDefault();
        setErrorMsg(null)
    }
    const handleShow = e => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }
    const handleoldPasswordChange = (e) => {
        setOldpassword(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handlePasswordConfirmChange = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            if (password !== confirmpassword) {
                setErrorMsg("Password and confirm password do not match")
                setFormLoading(false)
                return
            }
            const { data } = await axios.get(
                `${baseUrl}/api/checkAuthentication`,
                { withCredentials: true }
            )
            const newuser = {

                email: email,
                phone: phone,
                id: data.id,
            }
            if (toggle === true) {
                newuser.oldPassword = oldPassword;
                newuser.password = confirmpassword;
            }
            if (data.authenticated === true) {
                const { updatedUser } = await axios.put(
                    `${baseUrl}/api/update`,
                    newuser,
                    { withCredentials: true }
                )
                dispatch(posttoast({ toast: { state: 'success', text: 'Profile updated successful!', show: true } }))
                const object = {
                    isauthorized: true,
                    user: {
                        'ID': newuser.id,
                        'firstname': fn,
                        'lastname': ln,
                        'email': newuser.email,
                        'phone': newuser.phone || "N/A",
                        'balance': user.accountbalance || "0"
                    },
                }
                dispatch(update(object))
            }
            //dispatch updated user to state
            setFormLoading(false)
            history('/')
        } catch (error) {
            setFormLoading(false);
            const errorMsg = catchError(error);
            setErrorMsg(errorMsg.msg);
        }
    }

    return (
        <div>
            <div className="mt-5 md:mt-0">
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
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        value={fn}
                                        disabled
                                        autoComplete="given-name"
                                        className="mt-1 cursor-not-allowed bg-gray-200 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        value={ln}
                                        disabled
                                        autoComplete="family-name"
                                        className="mt-1 cursor-not-allowed bg-gray-200 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <input
                                        type="text"
                                        name="email-address"
                                        id="email-address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        autoComplete="email"
                                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-4">
                                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone-number"
                                        id="phone-number"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <br />
                                <hr className="border-gray-200  " />
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

                                <div className="shadow overflow-hidden sm:rounded-md ">
                                    <div className="px-4 py-5 bg-white sm:p-6 space-y-3">
                                        <div className="mb-3">
                                            <div>
                                                <span className="text-black-400 font-medium">
                                                    Change Password
                                                </span>
                                                <div className="relative inline-block w-10 mr-2 ml-2 align-middle select-none">
                                                    <input type="checkbox" onChange={handleToggleChange} checked={toggle} name="toggle" id="Gray" className="checked:bg-gray-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                                                    <label htmlFor="Gray" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Old Password
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="oldPassword"
                                                    id="oldPassword"
                                                    value={oldPassword}
                                                    disabled={!toggle}
                                                    onChange={handleoldPasswordChange}
                                                    className={`mt-1 ${toggleBackground} focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                                                />
                                                <button onClick={handleShow} className='relative right-6 -m-2.5'>
                                                    {showPassword ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor " >
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    id="password"
                                                    value={password}
                                                    disabled={!toggle}
                                                    onChange={handlePasswordChange}
                                                    className={`mt-1 ${toggleBackground} focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                                                />
                                                <div onClick={handleShow} className='relative right-6 mt-3 -m-2.5'>
                                                    {showPassword ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor " >
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4 ">
                                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                                Confirm Password
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="confirm-password"
                                                    id="confirm-password"
                                                    value={confirmpassword}
                                                    disabled={!toggle}
                                                    onChange={handlePasswordConfirmChange}
                                                    className={`mt-1 ${toggleBackground} focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                                                />
                                                <button onClick={handleShow} className='relative right-6 -m-2.5'>
                                                    {showPassword ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " viewBox="0 0 20 20" fill="currentColor " >
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    }
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                disabled={disable}
                                type="submit"
                                className={`${disable ? "cursor-not-allowed" : ""} inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Editprofile
