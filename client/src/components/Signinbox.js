import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import catchError from '../utils/catchErrors';
import { useDispatch } from "react-redux";
import { authorization, getinfo, getsub, getnotification, posttoast } from '../JS/Actions/actions'
import baseUrl from '../utils/baseUrl'
import cookie from 'cookiejs';

export default function Signupbox() {
  const dispatch = useDispatch();
  const location = localStorage.getItem('location');
  const history = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [info, setInfo] = useState({});
  const { email, password } = user;

  const handleChange = e => {
    const { name, value } = e.target;


    setUser(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isUser = Object.values(user).every(item =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const handleShow = e => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }
  const handleCloseError = e => {
    e.preventDefault();
    setErrorMsg(null)
  }
  const handleSubmit = async e => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/login`,
        user,
        { withCredentials: true }
      );
      if (data.user) {
        const object = {
          isauthorized: true,
          user: {
            'ID': data.user._id,
            'firstname': data.user.firstName.toUpperCase(),
            'lastname': data.user.lastName.toUpperCase(),
            'email': data.user.email,
            'phone': data.user.phone || "N/A",
            'balance': data.user.accountbalance || "0"
          },
        }
        cookie.set('fullname', object.user.firstname + ' ' + object.user.lastname)
        cookie.set('id', object.user.ID)
        dispatch(authorization(object));
      }

      await axios.get(
        `${baseUrl}/api/subscriberdata`,
        { params: { id: cookie.get('id') } }
      ).then((response) => {
        const info = response.data.info
        dispatch(getinfo({ info: info }))

      }).catch((error) => {
        setFormLoading(false);
        console.log(error);
        dispatch(getinfo({ info: {} }))
      })

      await axios.get(
        `${baseUrl}/api/sub`,
        { params: { id: cookie.get('id') } }
      ).then((response) => {
        const sub = response.data.sub
        if (sub) {
          dispatch(getsub({ sub: sub }))
        } else {
          dispatch(getsub({ sub: { status: false } }))
        }

      }).catch((error) => {
        setFormLoading(false);
        console.log(error);
      })

      await axios.get(
        `${baseUrl}/api/notification`,
        { params: { id: cookie.get('id') } }
      ).then((response) => {
        const notification = response.data.notification
        if (notification) {
          dispatch(getnotification({ notification: notification }))
        } else {
          dispatch(getnotification({ notification: {} }))
        }

      }).catch((error) => {
        setFormLoading(false);
        console.log(error);
      })

      dispatch(posttoast({toast:{state: 'success', text: 'Login successful', show: true}}))
      history(location?location:"/")
    } catch (error) {
      setFormLoading(false);
      const errorMsg = catchError(error);
      setErrorMsg(errorMsg.slice(104,-23));
    }
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to="/">
              <img
                className="mx-auto h-20 w-auto"
                src="/supersonic solutions-logos_black.png"
                alt="Workflow"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/Signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                start your 14-day free trial
              </Link>
            </p>
          </div>
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
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
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
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="flex items-center justify-center">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <div onClick={handleShow} className='relative right-6 -m-2.5'>
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/reset" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className=" disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={submitDisabled}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
