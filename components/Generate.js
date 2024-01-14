import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserContext';
import Loading from './Loading';
import { supabase } from '../utils/supabaseClient';
import DOMPurify from 'isomorphic-dompurify';
import TextEditor from './TextEditor';
import IntegrateDropdown from './IntegrateDropdown';
import toneOptions from '../public/toneOptions'

const Generate = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [vibe, setVibe] = useState("Professional");
    const [generatedBios, setGeneratedBios] = useState("");
    const [tone, setTone] = useState('Professional');
    const [wordCount, setWordCount] = useState(0);
    // const [articleKeywords, setArticleKeywords] = useState([]);
    // const [globalArticleCount, setGlobalArticleCount] = useState(256475);
    const [userCredits, setUserCredits] = useState(0);
    const MAX_VALUE = 100;
    const [visible, setVisible] = useState(false)
    const [editedContent, setEditedContent] = useState('')
    const [currentInput, setCurrentInput] = useState('');
    const [savedInputs, setSavedInputs] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [userApps, setUserApps] = useState([]);
    const [selectedAppId, setSelectedAppId] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const prompt = `Generate a blog post about ${bio} in HTML Code Format optimized for SEO. The tone of the article will be ${tone}`;


    useEffect(() => {
      if (user?.id) {
          fetchUserApps();
      }
  }, [user]);

      const handleFetchCredits = async () => {
        if (user) {
          const credits = await getUserCredits(user.id);
          setUserCredits(credits);
          setVisible(!visible)
        } else {
          alert('You are not signed in')
        }
            
    };

    const fetchUserApps = async () => {
      try {
          const { data, error } = await supabase
              .from('apps') // Assuming 'apps' is your table name
              .select('*')
              .eq('user_id', user.id);
  
          if (error) throw error;
          setUserApps(data);
      } catch (error) {
          console.error('Error fetching apps:', error);
      }
  };


  //       const handleValueChange = (event) => {
  //     const newValue = parseInt(event.target.value, 10);
  //       if (!isNaN(newValue) && newValue <= MAX_VALUE) {
  //         setWordCount(newValue);
  //     }
  // };
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
        setEditedContent(DOMPurify.sanitize(answer.choices[0].text));

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
    const resetForm = () => {
      setBio("");
      setEditedContent("");
      setCurrentInput("");
      setSavedInputs([]);
      setSelectedAppId("");
      setMetaDescription("");
      // Reset any other states you need to
  };
    // Function to insert a new blog into the Supabase database
const saveBlogToDatabase = async (blogContent, appId, metaDescription) => {
  try {
            const { data, error } = await supabase
            .from('blogs')
            .insert([
                { 
                    content: blogContent, 
                    app_id: appId, 
                    meta_description: metaDescription
                }
            ]);

      if (error) {
          console.error('Error inserting blog into database:', error);
          alert('Failed to save the blog. Please try again. ERROR 1');
      } else {
          console.log('Blog saved successfully:', data);
          setShowSuccessMessage(true);
          resetForm(); // Reset the form fields

          setTimeout(() => {
              setShowSuccessMessage(false);
          }, 3000);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to save the blog. Please try again. ERROR 2');
  }
};




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
      // console.log(generatedBios)
      // console.log(sanitizedContent)
      const handleEditorChange = (newContent) => {
        setEditedContent(newContent);
    };

    const handleKeyPress = (e) => {
      // Check for 'Enter' key press without submitting the form
      if (e.key === 'Enter' && currentInput.trim() !== '' && savedInputs.length < 4) {
          e.preventDefault(); // Prevent the default form submission on enter key
          setSavedInputs(prev => [...prev, currentInput.trim()]);
          setCurrentInput('');
      }
  };

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
};
const handleAppSelection = (selectedApp) => {
  // Update the state or perform any action required when an app is selected
  setTone(selectedApp.name);
  // ... other actions based on selected app ...
};

const handleDescriptionChange = (e) => {
  setMetaDescription(e.target.value);
};

const handleSaveDraft = () => {
  if (!selectedAppId) {
      alert('Please select an app to save the draft.');
      return;
  }
  if (!metaDescription.trim()) {
    alert('Please enter a meta description for the article.');
    return;
}
  saveBlogToDatabase(editedContent, selectedAppId, metaDescription);
};

  return (
<>
    {user?.id ? (
        <div className="generate-container">
        <h1 className="generate-header">Generate Article</h1>
    <button className="btn btn-tertiary btn-margin generate-btn" onClick={handleFetchCredits}>Check Credits</button>
    {visible && (userCredits > 0 ? <p className='primary-banner'>You have {userCredits} credits</p> : <p className='red'>You are out of credits</p>)}
    <div className="gpt-form">
        <label className='generate-label'>Describe your topic</label>
        <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="gpt-textarea"
            placeholder={
            "What would you like the article to be about?"
            }
        />
                  <label className='generate-label'>Primary Keywords</label>

               {savedInputs.length < 4 && (
                        <input
                            type="text"
                            value={currentInput}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder='Keywords...'
                            className='keywords-input'
                        />
                    )}

                    <div className='keyword-render-container'>
                        {savedInputs.map((input, index) => (
                            <div key={index} style={{ color: 'grey' }} className='keyword-render-div'>
                                {input}
                            </div>
                        ))}
                    </div>
                    <label className='generate-label'>Select a Tone</label>
                    <IntegrateDropdown options={toneOptions} onOptionSelected={handleAppSelection} />
                    <label>Meta Description</label>
                    <input type='text' className='description-input' placeholder='Enter your articles description' onChange={handleDescriptionChange}     value={metaDescription} required/>
                          
        {/* <input type='number'
                onChange={handleValueChange}
                placeholder="Article Word Count" 
                className="gpt-wordcount"

                /> */}

        {!loading && (
            <button className="btn btn-primary gpt-button" onClick={(e) => generateBio(e)} >Generate your article &rarr;</button>
        )}
        {loading && (
            <Loading />
        )}
</div>
<hr className="" />
        <h2 className='generate-header'>Generated Article:</h2>
        {/* {sanitizedContent && <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>} */}
        {sanitizedContent &&   <TextEditor 
                value={editedContent} 
                onChange={handleEditorChange} 
            />}
 
        <label>Select A Project</label>
        <div className="app-selection">
    {userApps.map(app => (
        <label key={app.id}>
            <input
                type="radio"
                name="app"
                value={app.id}
                onChange={(e) => setSelectedAppId(e.target.value)}
            />
            {app.name}
        </label>
    ))}
</div>

        <button className="btn btn-primary btn-margin" onClick={handleSaveDraft}>Save Draft</button>
        {showSuccessMessage && (
                    <div className="success-message">
                        Blog saved successfully!
                    </div>
                )}
</div>

    ): (
<h2>Login</h2>
    )}
     </>   
  )
}

export default Generate