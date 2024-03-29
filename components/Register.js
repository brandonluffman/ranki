import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {CiMail} from 'react-icons/ci'
import {IoIosUnlock} from 'react-icons/io'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function RegisterComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const Router = useRouter(); // Get the router object

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert('Registration failed. Please try again.');
        // console.log(error)
      } else {
        alert('Registration successful!');
        Router.push('/dashboard')
        // Redirect or navigate to the login page
      }
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };    

  return (
    <>
    {/* <Navbar /> */}
    <div className='login-container'>
    <div className='login-box'>
    <h1>Register</h1>

        <div className='login-avatar-div'>
        <img src='/avatar.png' className='login-avatar-img'></img>
        </div>
        <form onSubmit={handleRegister}>
        <div className='login-email-div'>
            <CiMail  className='login-icon mail-icon'/>
            <input className='login-input login-email-input' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} ></input>
            {/* <button className='email-vis-button'></button>   */}
        </div>
        <div className='login-password-div'>
            <IoIosUnlock className='login-icon lock-icon'/>
            <input className='login-input login-password-input' placeholder='Password' type={visible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button className='password-vis-button' type='button' onClick={() => setVisible(!visible)}><AiFillEye className='visibility-icon'/></button>  
        </div>
        <Link href='/login'><p className='create-account'>Already have an account?</p></Link>

        <button type='submit' className='login-button'>Register</button>
        </form>
    </div>
    </div>
    {/* <Footer /> */}
    </>
  );
}
