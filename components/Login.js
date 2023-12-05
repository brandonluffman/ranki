import { useState, useContext } from 'react';
import { supabase } from '../utils/supabaseClient';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {CiMail} from 'react-icons/ci'
import {IoIosUnlock} from 'react-icons/io'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import Link from 'next/link'
import { UserContext } from '../context/UserContext';




export default function LoginComponent() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(email, password);
  };
  return (
    <>
    <Navbar />
    <div className='login-container'>
    <div className='login-box'>
        <div className='login-avatar-div'>
        <img src='/avatar.png' width='100'></img>
        </div>
        <form onSubmit={handleLogin}>
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
        <Link href='/register'><p className='create-account'>Need to create an account?</p></Link>
        <Link href='/forgotpassword'><p className='forgot-password'>Forgot Password?</p></Link>
        <button type='submit' className='login-button'>Login</button>
        </form>
    </div>
    </div>
    <Footer />
    </>
  );
}






  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { user, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password
  //     });
  
  //     if (error) {
  //       alert('Login failed. Please check your credentials.');
  //     } else {
  //       // Update user context
  //       login(user); // Assuming the login function in context expects a user object
  
  //       alert('Login successful!');
  //       // Redirect or navigate to the profile page
  //       window.location.href = '/';
  //     }
  //   } catch (error) {
  //     console.error('Error signing in:', error.message);
  //   }
  // };