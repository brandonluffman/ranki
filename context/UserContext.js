// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Checking stored user in localStorage");
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
        // console.log("Stored User found", storedUser);
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          // Handle the error, maybe clear the localStorage item if it's corrupted
          localStorage.removeItem('user');
        }
      } else {
        console.log("No stored user found");
      }
  }, []);

  useEffect(() => {
    // Subscribe to auth state changes
    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
      if (session) {
        localStorage.setItem('user', JSON.stringify(session.user));
      } else {
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

  const login = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
  
      if (error) {
        alert('Login failed. Please check your credentials.');
      } else {
        setUser(user); // Set user in state
        localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage
        alert('Login successful!');
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
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
  
      // Optionally redirect the user to the login page or home page
      window.location.href = '/login'; // Adjust the path as necessary
    } catch (error) {
      console.error("Logout error:", error);
      // Handle any errors
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
