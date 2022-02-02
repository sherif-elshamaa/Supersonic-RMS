import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import Subscribe from './pages/Subscribe';
import Error404 from './pages/Error404';
import Solutions from './pages/Solutions';
import More from './pages/More';
import Contactus from './pages/Contactus';
import Events from './pages/Events';
import Reset from './pages/Reset';
import { useSelector } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
const stripePromise = loadStripe("pk_test_51KI3O7Ii8THaABrOxbArj0vuc4dBcKswh6mlDSV1JXdSuliBrrT3BOyY8lF1JPn6Iop67Lfu3d6oBGItOBXfPeRw00efHgmSxJ")

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile/" element={
        <Auth redirectTo="/Signin">
          <Profile />
        </Auth>
      }
      />
      <Route path="/subscribe/:plan" element={
        <Auth redirectTo="/Signin">
          <Elements stripe={stripePromise}>
            <Subscribe />
          </Elements>
        </Auth>
      }
      />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/more" element={<More />} />
      <Route path="/contactus" element={<Contactus />} />
      <Route path="/events" element={<Events />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

function Auth({ children, redirectTo }) {
  const history = useLocation();
  localStorage.setItem('location', history.pathname);
  const auth = useSelector((state) => state.status.isauthorized);
  return auth ? children : <Navigate to={redirectTo} />
}

export default App;
