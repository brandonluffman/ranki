// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../utils/supabaseClient';
import Router from 'next/router';
// import { useRouter } from 'next/router';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserPaid, setIsUserPaid] = useState(false); // New state for paid status
  const [paidPlanType, setPaidPlanType] = useState('');


  useEffect(() => {
    console.log("Checking stored user in localStorage");
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setPaidPlanType(parsedUser.planType || ''); // Update the paidPlanType state
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem('user');
      }
    } 
    else {
      console.log("No stored user found");
    }
  }, []);

  useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const userPlanType = await fetchUserPlanType(session.user.id);
        const updatedUser = { ...session.user, planType: userPlanType };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
  
    // Cleanup function to unsubscribe
    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, []);

  async function fetchUserPlanType(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('paid_plan_type') // Ensure this matches your table's column name
      .eq('auth_id', userId)
      .single();
  
    if (error) {
      console.error('Error fetching user plan type:', error);
      return '';
    }
  
    return data ? data.paid_plan_type : ''; // Make sure this matches the selected column
  }
  

  async function fetchUserPaidStatus(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('paid_user')
      .eq('auth_id', userId)
      .single();
  
    if (error) {
      console.error('Error fetching user paid status:', error);
      return false;
    }
  
    return data ? data.paid_user : false;
  }
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
};

// In UserContext.js

// const login = async (email, password, callback) => {
//   try {
//     const { user, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//       alert('Login failed. Please check your credentials.');
//     } else {
//       setUser(user); // Update user state
//       localStorage.setItem('user', JSON.stringify(user));
//       alert('Login successful!');
//       console.log("Logged in user:", user);

//     }
//   } catch (error) {
//     console.error('Error signing in:', error.message);
//   }
// };

const login = async (email, password) => {
  try {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please check your credentials.');
      return false;
    } else {
      const userPlanType = await fetchUserPlanType(user.id);
      const updatedUser = { ...user, planType: userPlanType };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    }
  } catch (error) {
    console.error('Error signing in:', error.message);
    return false;
  }
};

  


  const logout = async () => {
    try {
      // End the session with Supabase
      await supabase.auth.signOut();
  
      // Remove user information from local storage
      localStorage.removeItem('user');
  
      // Update the user state to null
      setUser(null);
      Router.push('/login')
      // alert('Logout Successful')
      // Router.push('/login')
      // Optionally redirect the user to the login page or home page
      // window.location.href = '/login'; // Adjust the path as necessary
    } catch (error) {
      console.error("Logout error:", error);
      // Handle any errors
    }
  };


  const deleteAccount = async () => {
    if (!user) {
      console.error("No user is logged in.");
      return;
    }
  
    try {
      await deleteUserRelatedData(user.id);
  
      const response = await fetch('/api/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete the user.');
      }
  
      await logout(); // Assuming you have a logout function in your context
  
      // Clear user data from the context and local storage
      localStorage.removeItem('user');
      setUser(null);
  
      // Redirect or perform other actions as necessary
      // e.g., Router.push('/login');
    } catch (error) {
      console.error("Error deleting account:", error.message);
      // Handle any errors, such as showing an alert to the user
    }
  };
  
  const deleteUserRelatedData = async (userId) => {
    try {

      let { data: appIds, error: appIdsError } = await supabase
      .from('apps')
      .select('id')
      .eq('user_id', userId);
    if (appIdsError) throw appIdsError;

    // Extract the ids from the data
    const ids = appIds.map(app => app.id);

    if (ids.length > 0) {
      // Delete user data from the 'site_urls' table
      let { error: siteUrlsError } = await supabase
        .from('site_urls')
        .delete()
        .in('app_id', ids);
      if (siteUrlsError) throw siteUrlsError;
    }
      // Delete user data from the 'apps' table
      let { error: appsError } = await supabase
        .from('apps')
        .delete()
        .match({ user_id: userId });
      if (appsError) throw appsError;
  
      // Delete user data from the 'blogs' table
      let { error: blogsError } = await supabase
        .from('blogs')
        .delete()
        .match({ user_id: userId });
      if (blogsError) throw blogsError;
  
      // Delete user data from the 'users' table
      let { error: usersError } = await supabase
        .from('users')
        .delete()
        .match({ auth_id: userId });
      if (usersError) throw usersError;
  
    } catch (error) {
      console.error("Error deleting user data:", error);
      throw error; // Re-throw the error to be caught by the calling function

      // Handle any errors
    }
  };


  return (
    <UserContext.Provider value={{ user, isUserPaid, login, logout, updateUser, deleteAccount, setUser, paidPlanType }}>
      {children}
    </UserContext.Provider>
  );
};
