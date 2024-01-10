import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../utils/supabaseClient'; // Adjust the path as needed

const SuccessPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Extract session_id from URL
    const sessionId = router.query.session_id;

    if (sessionId) {
      verifySession(sessionId);
    }
  }, [router.query.session_id]);

  const verifySession = async (sessionId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
      const data = await response.json();
      setSession(data);
    } catch (error) {
      console.error('Error verifying session:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const sessionId = router.query.session_id;
    console.log("Session ID:", sessionId); // Check the session ID value
    if (sessionId) {
      verifySession(sessionId);
    }
  }, [router.query.session_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Navbar />
        <div className='pricing-container'>
      <h1>Payment Successful!</h1>
      {session && (
        <div>
          <p>Thank you for your payment. User # {session.id}</p>

          {/* Display more information from the session as needed */}
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
