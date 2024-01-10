import React, {useContext, useState, useEffect} from 'react'
import { Toaster } from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io'
import Loading from './Loading';
import { UserContext } from '../context/UserContext';
import { supabase } from '../utils/supabaseClient'; // Import your initialized Supabase client
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

// const AddBlogOfficial = ({ submitForm, toggle }) => {
  const AddBlogOfficial = () => {
    const { user } = useContext(UserContext);
  
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [vibe, setVibe] = useState("Professional");
    const [generatedBios, setGeneratedBios] = useState("");
    const [tone, setTone] = useState('Professional');
    const [wordCount, setWordCount] = useState(0);
    const [articleKeywords, setArticleKeywords] = useState([]);
    const [globalArticleCount, setGlobalArticleCount] = useState(256475);
    const [userCredits, setUserCredits] = useState(0);
    const MAX_VALUE = 100;


    const prompt = `Generate an SEO optimized article about ${bio} in HTML Code Format with a max of ${wordCount} words. The tone of the article will be ${vibe}`;
  
    const handleValueChange = (event) => {
      const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue) && newValue <= MAX_VALUE) {
          setWordCount(newValue);
      }
  };

  // getUserCredits(user.id).then(credits => {
  //   setUserCredits(credits);
  // });
  
  const handleFetchCredits = async () => {
    const credits = await getUserCredits(user.id);
    setUserCredits(credits);
  };
    const generateBio = async (e) => {
      e.preventDefault();
      setGeneratedBios("");
      setLoading(true);
  
      try {
        const hasCredits = await checkUserCredits(user.id);
        // console.log('User has credits:', hasCredits); // Debugging log
        if (!hasCredits) {
          alert('You do not have enough credits to generate a bio.');
          setLoading(false);
          return;
        } else {
            console.log('User has credits')
        }
    
        const response = await fetch("/api/gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });
    
        if (!response.ok) {
          throw new Error(`API response error: ${response.statusText}`);
        }
    
        const answer = await response.json();
        setGeneratedBios(answer.choices[0].text);
    
        const success = await decrementUserCredits(user.id);
        console.log('Credits decremented:', success); // Debugging log
        if (!success) {
          alert('Failed to update credits. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error.message);
        alert('Failed to generate bio. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    const getUserCredits = async (userId) => {
        const { data, error } = await supabase
          .from('users')
          .select('api_credits')
          .eq('auth_id', userId)
          .single();
      
        if (error || !data) {
          console.error('Error fetching user credits:', error);
          return 0; // Return 0 if there's an error or no data
        }
      
        return data.api_credits;
      };

      

    const checkUserCredits = async (userId) => {
        const { data, error } = await supabase
          .from('users')
          .select('api_credits')
          .eq('auth_id', userId)
          .single();
      
        if (error || !data) {
          console.error('Error fetching user credits:', error);
          return false;  // Assuming error or no data means no credits
        }
      
        return data.api_credits > 0;
      };
      
      const decrementUserCredits = async (userId) => {
        // First, retrieve the current credit count
        let { data: userData, error: fetchError } = await supabase
          .from('users')
          .select('api_credits')
          .eq('auth_id', userId)
          .single();
      
        if (fetchError) {
          console.error('Error fetching user credits:', fetchError);
          return false;
        }
      
        // Check if the user has enough credits
        if (userData.api_credits <= 0) {
          console.error('User does not have enough credits');
          return false;
        }
      
        // Decrement the credits
        const { error: updateError } = await supabase
          .from('users')
          .update({ api_credits: userData.api_credits - 1 })
          .eq('auth_id', userId);
      
        if (updateError) {
          console.error('Error updating credits:', updateError);
          return false;
        }
      
        return true;
      };
      const sanitizedContent = DOMPurify.sanitize(generatedBios);
      
  return (
            <div className="gpt-container">
                  <h1 className="gpt-header">Generate your SEO-Optimized Article</h1>
        <button className="btn btn-primary btn-margin" onClick={handleFetchCredits}>Check Credits</button>
            {userCredits && <p>You have {userCredits} credits</p>}
        <div className="gpt-form">
    
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="gpt-textarea"
            placeholder={
              "What would you like the article to be about?"
            }
          />

          <input type='number'
                onChange={handleValueChange}
                placeholder="Article Word Count ** 100 Word MAX" 
                  className="gpt-wordcount"

                  />

          {!loading && (
            <button className="btn btn-primary gpt-button" onClick={(e) => generateBio(e)} >Generate your article &rarr;</button>
          )}
          {loading && (
            <button className="btn btn-primary" disabled><Loading /></button>
          )}
        </div>

      
        <hr className="" />
        <h2 className='gpt-header'>Generated Article:</h2>
        {sanitizedContent && <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>}
        </div>
  )
}

export default AddBlogOfficial;




        {/* <p className="gpt-subheader">{globalArticleCount.toLocaleString()} articles generated so far.</p> */}
        {/* <p className="gpt-subheader">You have <span className='primary'>{userCredits}</span> credits available.</p> */}
        {/* <Link href='/pricing'><button className='btn btn-tertiary gpt-button'>Get More Credits</button></Link> */}