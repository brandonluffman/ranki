import React, { useState, useEffect, useContext } from 'react';
// import { supabase } from '../utils/auth';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { GiGrowth } from 'react-icons/gi';
import { MdVerified } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';


const Pricing = () => {
    const { user, login, logout, updateUser } = useContext(UserContext);
    const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);

    const [active, setActive] = useState('monthly');
    const [teamMembers, setTeamMembers] = useState('25');

    const nonAlert = (event) => {
        alert('We currently do not accept Enterprise Accounts, please come back later.')
    }
        const handleCheckout = async (plan) => {
        if (user.email != 'brandonluff10@gmail.com') {
            alert('We are not currently accepting any new customers!')
            return
        }
        if (user) {
          const stripe = await stripePromise;
          const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.id, userEmail: user.email, plan }),
          });
          const session = await response.json();
        //   console.log("Checkout session response:", session);

          const result = await stripe.redirectToCheckout({
            sessionId: session.sessionId,
          });
          if (result.error) {
            console.error(result.error.message);
          }
        } else {
          // Redirect to login or registration if no user is logged in
        //   console.log('NO')
        }
      };
      

    const addMember = () => {
        const currentMembers = teamMembers === '' ? 0 : parseInt(teamMembers, 10);
        setTeamMembers(String(currentMembers + 1));
    };
    
    const subtractMember = () => {
        const currentMembers = teamMembers === '' ? 0 : parseInt(teamMembers, 10);
        setTeamMembers(String(Math.max(currentMembers - 1, 0)));
    };

    // Function to handle button clicks
    const handleToggle = (plan) => {
      setActive(plan);
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if (newValue === '' || !isNaN(newValue)) {
            setTeamMembers(newValue);
        }
    };

    function calculateTotalCost(numberOfPeople) {
        const basePrice = 20; // Price for 25 people is $800
        let discount = 0;
    
        // Convert to number and handle empty case
        const numPeople = numberOfPeople === '' ? 0 : parseInt(numberOfPeople, 10);
    
        if (numPeople >= 250) {
            discount = 0.50; // 50% discount
        } else if (numPeople >= 100) {
            discount = 0.30; // 30% discount
        } else if (numPeople >= 25) {
            discount = 0.20; // 20% discount
        }
    
        const totalCostWithoutDiscount = basePrice * numPeople;
        const discountedCost = totalCostWithoutDiscount * (1 - discount);
    
        return { discountedCost, totalCostWithoutDiscount };
    }
    
    const result = calculateTotalCost(teamMembers);
    const discountedCost = result.discountedCost;
    const trueCost = result.totalCostWithoutDiscount;
    
    // console.log(`Discounted cost: $${discountedCost.toFixed(2)}`);
    // console.log(`True cost without discount: $${trueCost.toFixed(2)}`);
    return (
      <div className='pricing-container'>
      <h3 className='pricing-header'><span className='gradient-text'>Premium quality</span> without the premium price</h3>
      <p className='pricing-subheader'>Grow & Maintain your website on Cruise Control with our tailored plans. Start saving time and growing traffic with RankiAI.</p>
        <div className='pricing-grid-toggle-container'>
            <button
                className={`pricing-grid-toggle-btn ${active === 'monthly' ? 'toggle-active' : ''}`}
                onClick={() => handleToggle('monthly')}
            >
                Individual
            </button>
            <button
                className={`pricing-grid-toggle-btn ${active === 'yearly' ? 'toggle-active' : ''}`}
                onClick={() => handleToggle('yearly')}
            >
                Team
            </button>
            </div>

            <div className='div-content'>
                {active === 'monthly' ? (
                <div className='pricing-grid'>
                    <div className='pricing-grid-item'>
                        <h3 className='pricing-grid-header'>Free</h3>
                        <div className='pricing-grid-p-container'>
                            <div className='anti-flexer'>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />1 Project</p>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />1 AI Credit</p>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />No Content Automation</p>

                        {/* <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' /></p> */}
                        </div>
                        </div>                        <hr className='pricing-grid-hr'></hr>
                        <h2 className='pricing-grid-plan blue-pricing-header'>Starter</h2>
                        {user ? ( <Link href='/dashboard'><button className='pricing-grid-btn btn-tertiary' type='button'>Get Started</button></Link>):(<Link href='/register'><button className='btn-tertiary pricing-grid-btn' type='button'>Get Started</button></Link>)}
                    </div>
                    <div className='pricing-grid-item'>
                        <h3 className='pricing-grid-header'>$9.99</h3>
                        <div className='pricing-grid-p-container'>
                            <div className='anti-flexer'>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />10 Projects</p>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />15 AI Credits</p>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />Scheduled Content Automation</p>
                        </div>
                        </div>                        <hr className='pricing-grid-hr'></hr>
                        <h2 className='pricing-grid-plan'>Pro</h2>
                        {
                            user ? (
                                user.isPaid ? (
                                <p>You already have access to our premium features!</p>
                                ) : (
                                <button className='btn pricing-grid-btn btn-primary' onClick={() => handleCheckout('pro')}>
                                    Checkout
                                </button>
                                )
                            ) : (
                                <Link href='/register'>
                                <button className='btn-white pricing-grid-btn btn-tertiary' type='button'>Get Started</button>
                                </Link>
                            )
                            }
                    </div>
                    <div className='pricing-grid-item'>
                        <h3 className='pricing-grid-header'>$29.99</h3>
                        <div className='pricing-grid-p-container'>
                            <div className='anti-flexer'>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />Unlimited Projects</p>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />50 AI Credits</p>
                        <p className='pricing-grid-p'><MdVerified className='pricing-grid-icon' />Scheduled Content Automation</p>
                        </div>
                        </div>
                                                <hr className='pricing-grid-hr'></hr>
                        <h2 className='pricing-grid-plan platinum-header'>Premium</h2>
                        {
                            user ? (
                                user.isPaid ? (
                                <p>You already have access to our premium features!</p>
                                ) : (
                                    <button className='btn pricing-grid-btn btn-tertiary' onClick={() => handleCheckout('premium')}>
                                    Checkout
                                </button>
                                )
                            ) : (
                                <Link href='/register'>
                                <button className='btn-white pricing-grid-btn' type='button'>Get Started</button>
                                </Link>
                            )
                            }
                    </div>
            </div>
        ) : (
            <div className='pricing-grid team-grid'>
                    <div className='pricing-grid-item'>
                        <h3 className='pricing-grid-header'>Team Size</h3>
                        <div className='pricing-grid-p-container'>
                        <div className='anti-flexer'>

                        <p className='pricing-grid-p'>25+ people <BsArrowRight className='team-arrow'/> <span className='blue'>20% OFF</span></p>
                        <p className='pricing-grid-p'>100+ people <BsArrowRight className='team-arrow'/> <span className='blue'>30% OFF</span></p>
                        <p className='pricing-grid-p'>250+ people <BsArrowRight className='team-arrow'/> <span className='blue'>50% OFF</span></p>
                        </div>
                        </div>
                        <hr className='pricing-grid-hr'></hr>
                        <h2 className='pricing-grid-toggle-header'>Team Members</h2>
                        <div className='member-toggle-container'><button type='button' className='team-toggle-btn minus-btn' onClick={subtractMember}>-</button><input type='number' className='members-count' placeholder='25' value={teamMembers} onChange={handleInputChange} /><button type='button' className='team-toggle-btn plus-btn' onClick={addMember}>+</button></div>
                        {/* {user?.user ? ( <Link href='/test'><button className='pricing-grid-btn btn-tertiary' type='button'>Get Started</button></Link>):(<Link href='/register'><button className='btn-tertiary pricing-grid-btn' type='button'>Get Started</button></Link>)} */}
                    </div>
                    <div className='pricing-grid-item'>
                    <h3 className='pricing-grid-header true-cost-header'>${trueCost}</h3>
                        <h3 className='pricing-grid-header discounted-header'>${discountedCost.toFixed(0)}</h3>
                        <div className='pricing-grid-p-container'>
                            <div className='anti-flexer'>
                        <p className='pricing-grid-p'><MdVerified className='team-icon' />100 AI Blog Generated Posts</p>
                        <p className='pricing-grid-p'><MdVerified className='team-icon' />75+ different styles</p>
                        <p className='pricing-grid-p'><MdVerified className='team-icon' />Scheduled Content Automation</p>
                        </div>
                        </div>
                        <button onClick={() => nonAlert()} className='btn-white pricing-grid-btn' type='button'>Get Started</button>

                        {/* {user ? ( <Link href='https://buy.stripe.com/test_5kAfZWfRO11B8c89AA'><button className='btn-white pricing-grid-btn' type='button'>Get Started</button></Link>):(<Link href='/register'><button className='btn-white pricing-grid-btn' type='button'>Get Started</button></Link>)} */}
                    </div>
      
        </div>
        )
        }
      </div>     
    </div>
    );
};

export default Pricing;




    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const { data, error } = await supabase.auth.getUser();
    //         if (data) {
    //             setUser(data);
    //             console.log(data);
    //         } else {
    //             console.error('Error fetching user:', error);
    //         }
    //     };
    //     fetchUser();
    // }, []);