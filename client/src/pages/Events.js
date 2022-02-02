import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Eventpage from '../components/Eventpage'
import Toaster from '../components/Toaster';

function Events() {
    return (
        <div className="flex flex-col h-screen ">
            <div className="h-20">
                <Navbar />
            </div>
            <div className="grow">
                <Toaster />
                <Eventpage />
            </div>
            <div className="h-[144px]">
                <Footer />
            </div>
        </div>
    )
}

export default Events
