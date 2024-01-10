import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BsArrowRight, BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const Account = () => {
    const { user, deleteAccount, isUserPaid, paidPlanType } = useContext(UserContext);

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            deleteAccount();
        }
    };


    return (
        <div className="account-container">
            {user ? (
                <div className="account-details">
                    <h2>Welcome, {user.email}</h2>
                    {paidPlanType ? <p>You are on the <span className='primary bold'>{paidPlanType}</span> plan</p>:<p>Upgrade your account</p>}
                    <button onClick={handleDeleteAccount} className="delete-account-button">
                        <BsTrash className="icon"/> Delete My Account
                    </button>
                </div>
            ) : (
                <div className="account-prompt">
                    <h2>Create an Account</h2>
                    <Link href='/register' className='flexer'>
                        <button className='btn btn-primary btn-margin'>
                            Create Now <BsArrowRight className='right-arrow'/>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Account;
