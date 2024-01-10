import React, { useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { UserContext } from '../context/UserContext';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed

const PricingOfficial = () => {
    const { user, login, logout } = useContext(UserContext);


    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);

const handleCheckout = async (userId, userEmail) => {


  const stripe = await stripePromise;
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, userEmail }),
  });
  const session = await response.json();
  const result = await stripe.redirectToCheckout({
    sessionId: session.sessionId,
  });
  if (result.error) {
    // Handle any errors that occur during redirect
    console.error(result.error.message);
  }
};


  return (
    <div className='pricing-container'>
<button onClick={() => handleCheckout(user.id, user.email)}>Checkout</button>
        </div>
  )
}

export default PricingOfficial