import React from 'react';
import Header from '../components/Navbar';
import Getstarted from '../components/home/Getstarted';
import Features from '../components/home/Features';
import Contactus from '../components/home/Contactus'
import Testimonial from '../components/home/Testimonial'
import Footer from '../components/Footer'
import Emailsubscribe from '../components/home/Emailsubscribe'
import Toaster from '../components/Toaster';



function Home() {

    return (
        <>
            <Header />
            <Toaster />
            <Getstarted />
            <Features />
            <Emailsubscribe />
            <Testimonial />
            <Contactus />
            <Footer />
        </>
    )
}

export default Home
