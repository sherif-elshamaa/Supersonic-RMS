import React from 'react'
import Header from '../components/Navbar';
import Footer from '../components/Footer';
import Getinfo from '../components/subscripe/Getinfo';
import Checkout from '../components/subscripe/Checkout'
import { useSelector } from 'react-redux'
import Toaster from '../components/Toaster';

function Subscribe() {

    const info = useSelector((states) => states.info)

    return (
        <div className="flex flex-col h-screen ">
            <div className="h-20">
                <Header />
            </div>
            <div className="grow">
                <Toaster />
                {info?.companyName ?
                    <>
                        <div className="max-w-7xl mx-auto mt-2.5 flex flex-col shadow overflow-hidden">
                            <div className="mt-8 mx-auto md:w-3/4 mb-8">

                                <section>
                                    <span className="text-black text-2xl ml-5">Company name: </span>
                                    <span className="text-gray-500 text-xl">{info.companyName}</span>
                                </section>

                                <Checkout />
                            </div>
                        </div>
                    </>
                    :
                    <div className="max-w-7xl mx-auto my-2.5 h-full flex flex-col shadow overflow-hidden">
                        <Getinfo />
                    </div>
                }
            </div>
            <div className="h-[144px]">
                <Footer />
            </div>
        </div>
    )
}

export default Subscribe
