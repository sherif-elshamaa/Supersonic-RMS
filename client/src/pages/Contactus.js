import React from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Contact from '../components/home/Contactus'
import Toaster from '../components/Toaster';

function Contactus() {
    return (
        <div className="flex flex-col h-screen ">
            <div className="h-20">
                <Navbar />
            </div>
            <div className="grow">
                <Contact />
                <Toaster />
            </div>
            <div className="h-[144px]">
                <Footer />
            </div>
        </div>
    )
}

export default Contactus
