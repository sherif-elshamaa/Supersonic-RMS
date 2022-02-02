import React from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Profilepage from '../components/profilepages/Profilepage'
import Toaster from '../components/Toaster';

function Profile() {
    
    
    return (
        <div>
            <Navbar />
            <Toaster />
            <Profilepage />
            <Footer />
        </div>
    )
}

export default Profile
