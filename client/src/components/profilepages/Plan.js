import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Plancancelbox from './Plancancelbox'


function Plan() {
    const [open, setOpen] = useState(false)
    const plan = useSelector((states) => states.sub)


    const handleCancel = e => {
        e.preventDefault();
        setOpen(true)
    }

    const handleCancelfree = async (e) => {
        e.preventDefault();
        setOpen(true)
    }

    return (
        <>
            {plan.status === true ?
                plan.planType === "PRO" ?
                    <div id="plan" className="w-full h-full flex flex-col shadow overflow-hidden" >
                        <div className="flex justify-center bg-top bg-local bg-no-repeat w-full h-1/2" style={{ backgroundImage: "url(/plan.jpg" }}>
                            <h2 className="my-auto text-3xl md:text-6xl text-gray-800 ">Current Plan</h2>
                        </div>
                        <div className="mt-8 mx-auto md:ml-10 md:w-3/4 mb-8">
                            <article className="">
                                <h3 className="text-2xl text-gray-600">
                                    Plan
                                </h3>
                                <section>
                                    <table className="table-auto w-full text-gray-500">
                                        <tbody>
                                            <tr>
                                                <td className=' tdstrong'>Customer ID</td>
                                                <td>{plan.customersID}</td>
                                            </tr>
                                            <tr>
                                                <td className=' tdstrong'>Plan Type</td>
                                                <td>{plan.planType}</td>
                                            </tr>
                                            <tr>
                                                <td className=' tdstrong'>Price</td>
                                                <td>{plan.price + " Monthly"}</td>
                                            </tr>
                                            <tr>
                                                <td className=' tdstrong'>Start Date</td>
                                                <td>{plan.startDate}</td>
                                            </tr>
                                            <tr>
                                                <td className=' tdstrong'>Status</td>
                                                <td>{plan.status ? "active" : "inactive"}</td>
                                            </tr>
                                            <tr>
                                                <td className=' tdstrong'>Invoice</td>
                                                <td><a className="inline-flex items-center justify-center px-1 py-1 border border-transparent text-base font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500" target="_blank" href={plan.invoiceUrl} rel="noreferrer">View invoice</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </article>
                            <div className="flex justify-center mt-10">
                                <button onClick={handleCancel} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                                    Cancel subscription
                                </button>
                            </div>
                            <Plancancelbox open={open} setOpen={setOpen} subId={plan.stripeSubID} planType={plan.planType} />
                        </div>
                    </div>
                    :
                    <div id="plan" className="w-full h-full flex flex-col shadow overflow-hidden" >
                        <div className="flex justify-center bg-top bg-local bg-no-repeat w-full h-1/2" style={{ backgroundImage: "url(/plan.jpg" }}>
                            <h2 className="my-auto text-3xl md:text-6xl text-gray-800 ">Current Plan</h2>
                        </div>
                        <div className="mt-8 mx-auto md:ml-10 md:w-3/4 mb-8">
                            <article className="">
                                <h3 className="text-2xl text-gray-600">
                                    Plan
                                </h3>
                                <section>
                                    <table className="table-auto w-full text-gray-500">
                                        <tbody>
                                            <tr>
                                                <td className=' tdstrong'>Plan Type</td>
                                                <td>{plan.planType}</td>
                                            </tr>
                                            <tr>
                                                <td className=' tdstrong'>Price</td>
                                                <td>{plan.price + "$ Monthly"}</td>
                                            </tr>
                                            <tr>
                                                <td className=' tdstrong'>Start Date</td>
                                                <td>{plan.startDate}</td>
                                            </tr>
                                            <tr>
                                                <td className=' tdstrong'>Status</td>
                                                <td>{plan.status ? "active" : "inactive"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </article>
                            <div className="flex justify-center mt-10">
                                <button onClick={handleCancelfree} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                                    Cancel subscription
                                </button>
                                <Link to="/subscribe/pro" className="inline-flex items-center justify-center ml-4 px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700">
                                    upgrade to PRO
                                </Link>
                                <Plancancelbox open={open} setOpen={setOpen} subId={plan._id} planType={plan.planType} />
                            </div>
                        </div>
                    </div>
                :

                <div id="plan" className="w-full h-full flex flex-col shadow overflow-hidden" >
                    <div className="flex justify-center  bg-local w-full h-full" style={{ backgroundImage: "url(/noplan.jpg" }}>
                        <h2 className="my-auto   hover:skew-y-3 text-3xl md:text-6xl text-gray-800 ">No plans found</h2>
                    </div>
                    <div className="mt-8 space-y-4 mx-auto mb-8">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block">Ready to dive in?</span>
                            <span className="block text-gray-600">Start your free trial today.</span>
                        </h2>
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/pricing"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                            >
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Plan
