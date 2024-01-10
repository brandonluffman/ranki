import React, {useContext} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserContext } from '../context/UserContext';
import { supabase } from '../utils/supabaseClient';
import Account from '../components/Account';

const account = () => {

  return (
    <>
    <Navbar />

    <div className='account-page-container'>
       <Account />
    </div>

    <Footer />
    </>
  )
}

export default account