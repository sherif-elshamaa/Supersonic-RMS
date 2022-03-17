import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import catchError from '../../utils/catchErrors';
import axios from 'axios';
import { posttoast } from '../../JS/Actions/actions'
import baseUrl from '../../utils/baseUrl'

function Tickets() {
    const user = useSelector((states) => states.status.user)
    const history = useNavigate()
    const dispatch = useDispatch();
    const [formLoading, setFormLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [ticketType, setTicketType] = useState("General inquiries")
    const [ticket, setTicket] = useState("")

    const handleCloseError = e => {
        e.preventDefault();
        setErrorMsg(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true)
        try {
            const data = {
                id: user.ID,
                ticketType: ticketType,
                ticket: ticket

            }
            await axios.post(
                `${baseUrl}/api/ticket`,
                data,
                { withCredentials: true }
            )
            

            setFormLoading(false)
            dispatch(posttoast({ toast: { state: 'success', text: 'Ticket submited successful!', show: true } }))
            history('/')
        } catch (error) {
            setFormLoading(false) 
            const errorMsg = catchError(error);
            setErrorMsg(errorMsg.msg);
        }

    }
    const handleTicketType = (e) => {
        setTicketType(e.target.value)
    }
    const handleTicket = (e) => {
        setTicket(e.target.value)
    }

    return (
        <div className="w-full h-full flex flex-col shadow overflow-hidden">
            <img src='/ticket.jpg' className="" />
            <div className="mt-8 space-y-4 mx-auto mb-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <span className="block">Need help?</span>
                    <span className="block text-gray-600">Get all of your questions answered.</span>
                </h2>
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
                                <div className="space-y-3 ">
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
                                        <select
                                            type="text"
                                            name="business-type"
                                            id="business-type"
                                            value={ticketType}
                                            onChange={handleTicketType}
                                            required
                                            className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                            <option value="General inquiries">General inquiries</option>
                                            <option value="Subscription inquiries">Subscription inquiries</option>
                                            <option value="Feedback">Feedback</option>
                                        </select>

                                        <textarea
                                            type="textarea"
                                            name="ticket"
                                            id="ticket"
                                            rows="10"
                                            value={ticket}
                                            onChange={handleTicket}
                                            className="mt-1  focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Tickets
