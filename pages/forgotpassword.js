import React from 'react'
import { supabase } from '../utils/supabaseClient';

const forgotpassword = () => {
    const handleResetPassword = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
      
        const { error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) {
          console.error('Error sending password reset email:', error);
        } else {
          alert('Password reset email sent!');
        }
      };


  return (
    <form onSubmit={handleResetPassword}>
    <input type="email" id="email" name="email" required placeholder='Enter the email associated with your account' />
    <button type="submit">Send Reset Link</button>
  </form>
  )
}

export default forgotpassword