import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { UserContext } from '../context/UserContext';
import Loading from './Loading';
import { supabase } from '../utils/supabaseClient';
import DOMPurify from 'isomorphic-dompurify';
import TextEditor from './TextEditor';
import IntegrateDropdown from './IntegrateDropdown';
import toneOptions from '../public/toneOptions'
import { IoIosInformationCircle, IoMdClose } from 'react-icons/io'
import ToneDropdown from './ToneDropdown';
import FileDropZone from './FileDropZone';
import SmallGaugeChart from './SmallGaugeChart';
import { WiStars } from "react-icons/wi";
import GenerateGPT from './GenerateGPT';




const Generate = () => {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const { slug } = router.query;
    const slugInt = parseInt(slug, 10); // 10 is the radix, indicating base-10 number system
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [vibe, setVibe] = useState("Professional");
    const [generatedBios, setGeneratedBios] = useState("");
    const [tone, setTone] = useState('Professional');
    const [wordCount, setWordCount] = useState(0);
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
    const [title, setTitle] = useState('')
    const [images, setImages] = useState([]);
    const [quillVisibility, setQuillVisibility] = useState(false)
    const [generateForm, setGenerateForm] = useState(false)
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [appName, setAppName] = useState(null)
    const [appDomain, setAppDomain] = useState(null);




    useEffect(() => {
      if (user?.id) {
          fetchUserApps();
          fetchBlogIdeas(slug).then(setAiSuggestions);
          fetchAppName(slug);
          handleFetchCredits();
      }
  }, [user]);

  useEffect(() => {
    setMetrics({
        characters: getCharacterCount(editedContent),
        headings: getHeadingCount(editedContent),
        paragraphs: getParagraphCount(editedContent),
        images: getImageCount(editedContent),
    });
  
  }, [editedContent]);
  
  const calculateSEOScore = (metrics) => {
    const idealValues = {
      characters: 2500, // Ideal number of characters (words)
      headings: 20, // Ideal number of headings
      paragraphs: 20, // Ideal number of paragraphs
      images: 20 // Ideal number of images
    };

    const characterScore = Math.min(metrics.characters / idealValues.characters, 1);
    const headingScore = Math.min(metrics.headings / idealValues.headings, 1);
    const paragraphScore = Math.min(metrics.paragraphs / idealValues.paragraphs, 1);
    const imageScore = Math.min(metrics.images / idealValues.images, 1);
  
    const totalScore = (characterScore + headingScore + paragraphScore + imageScore) / 4;
    return totalScore * 100;
  }

  const [metrics, setMetrics] = useState({
    characters: 0,
    headings: 0,
    paragraphs: 0,
    images: 0,
  });
  
  const seoScore = calculateSEOScore(metrics);
  
  const getCharacterCount = (html) => {
    if (!html) return 0;
    // Remove HTML tags and then split by spaces to count words
    const text = html.replace(/<[^>]*>/g, '').trim();
    // Split the text by spaces and filter out empty elements
    const words = text.split(/\s+/).filter(word => word.length > 0);
    return words.length;
  };
  
  const getHeadingCount = (html) => {
    const headingMatch = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi);
    return headingMatch ? headingMatch.length : 0;
  };
  
  const getParagraphCount = (html) => {
    const paragraphMatch = html.match(/<p[^>]*>(.*?)<\/p>/gi);
    return paragraphMatch ? paragraphMatch.length : 0;
  };
  
  const getImageCount = (html) => {
    const imageMatch = html.match(/<img [^>]*src="[^"]*"[^>]*>/gi);
    return imageMatch ? imageMatch.length : 0;
  };
  
  
  const toggleGenerateForm = () => {
    setGenerateForm(!generateForm);
  };

  const handleQuillVisibility = (e) => {
    setQuillVisibility(!quillVisibility);
  }

    const createSlug = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '');
    };


    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };
      
    const resetForm = () => {
      setBio("");
      setEditedContent("");
      setCurrentInput("");
      setSavedInputs([]);
      setSelectedAppId("");
      setMetaDescription("");
      setTitle("");
    };
    // const sanitizedContent = DOMPurify.sanitize(generatedBios);

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
        setTone(selectedApp.name);
      };

      const handleDescriptionChange = (e) => {
        setMetaDescription(e.target.value);
      };

      const handleTitleChange = (e) => {
        setTitle(e.target.value);
      }

      const deleteKeyword = (indexToDelete) => {
        setSavedInputs(savedInputs.filter((_, index) => index !== indexToDelete));
      };

      const handleImageChange = (e) => {
        const files = e.target.files;
        setImages([...files]);
        const fileNames = [...files].map(file => file.name).join(', ');
        document.getElementById('file-upload-names').textContent = fileNames;
      };

      const handleFileUpload = (file) => {
        // Add the uploaded file to the images state
        setImages([file]);
        console.log('Got the image')
      };


      const uploadImagesToSupabase = async () => {
        const uploadedImagePaths = [];
      
        for (const image of images) {
            const { error, data } = await supabase.storage
                .from('blogimages')
                .upload(image.name, image);
      
            if (error) {
                console.error('Error uploading image:', error);
                return [];
            } else {
                // Assuming the bucket is public, constructing the URL
                const imagePath = `https://gnbnxykwoaijcalzbtbs.supabase.co/storage/v1/object/public/blogimages/${image.name}`;
                uploadedImagePaths.push(imagePath);
            }
        }
      
        return uploadedImagePaths;
      };


    const fetchAppName = async (appSlug) => {
      // const cachedApp = localStorage.getItem(`appDetails_${appSlug}`);
      try {
          const { data, error } = await supabase
              .from('apps')
              .select('name, domain') // Corrected select statement
              .eq('id', appSlug)
              .single();
  
          if (error) throw error;
  
          if (data) {
              setAppName(data.name);
              setAppDomain(data.domain);   
              console.log(data.domain);
          } else {
              console.log('No data found for the given appSlug');
          }     
      } catch (error) {
          console.error('Error fetching app details:', error);
      }
  };
  
    const fetchBlogIdeas = async (appId) => {
      let { data: blogIdeas, error } = await supabase
          .from('blog_ideas')
          .select('*')
          .eq('app_id', appId)
          .limit(4);
  
  
      if (error) {
          console.log('Error fetching blog ideas:', error);
          return [];
      }
  
      return blogIdeas;
  };
  
        const handleFetchCredits = async () => {
          if (user) {
            const credits = await getUserCredits(user.id);
            setUserCredits(credits);
            // setVisible(!visible)
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

    const saveBlogToDatabase = async (blogContent, metaDescription, imagePaths, publishStatus) => {
      console.log(publishStatus)
      try {
                const { data, error } = await supabase
                .from('blogs')
                .insert([
                    { 
                        content: blogContent, 
                        app_id: slugInt, 
                        meta_description: metaDescription,
                        title: title,
                        keywords: JSON.stringify(savedInputs),
                        images: JSON.stringify(imagePaths),
                        is_published: publishStatus
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
    
    const handleSaveDraft = async () => {
      const draftStatus = false;
      let imagePaths = [];
      if (images.length > 0) {
        imagePaths = await uploadImagesToSupabase();
        console.log('Image Paths, this should be first', imagePaths);
        if (imagePaths.length === 0) {
            alert('Failed to upload images.');
            return;
        }
      } else {
        console.log('No images to upload');
      }
    
      if (!metaDescription.trim()) {
        alert('Please enter a meta description for the article.');
        return;
      }
    
      saveBlogToDatabase(editedContent, metaDescription, imagePaths);
      console.log('Saved Blog')
    };
    
    const handleSavePublish = async () => {
      let imagePaths = [];
      if (images.length > 0) {
        imagePaths = await uploadImagesToSupabase();
        console.log('Image Paths, this should be first', imagePaths);
        if (imagePaths.length === 0) {
            alert('Failed to upload images.');
            return;
        }
      } else {
        console.log('No images to upload');
      }
      const publishStatus = true; // Explicitly setting publish status
    
      if (!metaDescription.trim()) {
        alert('Please enter a meta description for the article.');
        return;
      }
      saveBlogToDatabase(editedContent, metaDescription, imagePaths, publishStatus);
    
      console.log('Saved Blog')
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
  
      const generateBlogPost = async (e, suggestion = null) => {
        e.preventDefault();
        setGenerateForm(false)
        setLoading(true);
        let prompt;
        
        if (suggestion) {
            prompt = `Pretend you are an expert SEO Blog writer tasked with generating an SEO Optimized blog post titled: ${suggestion.title}. 
            ${suggestion.description} in a ${tone} tone, using the following keywords: ${suggestion.keywords}. 
            Send back in HTML Code Format (ie, using h1, h2, h3, p, a, elements). 
            Please format the response as follows:
              Title: ${suggestion.title}
              Meta Description: [Put the meta description of the blog post here]
              Content: [Put the HTML formatted blog content here]
            Aim for 1,500-2,500 words (longer the better), one h1 tag, 3-6 h2 tags, 1-3 h3 tags under h2 tags if applicable. `;
        } else {
            // If not using a suggested idea, construct the prompt as before
            const keywordsString = savedInputs.join(", ");
            prompt = `Pretend you are an expert SEO Blog writer tasked with generating an SEO Optimized 
            blog post about ${bio} in a ${tone} tone, using the following keywords: ${keywordsString}. 
            Send back in HTML Code Format (ie, using h1, h2, h3, p, a, elements). 
            Please format the response as follows:
              Title: [Put the title of the blog post here]
              Meta Description: [Put the meta description of the blog post here]
              Content: [Put the HTML formatted blog content here]
            Aim for 1,500-2,500 words (longer the better), one h1 tag, 3-6 h2 tags, 1-3 h3 tags under h2 tags if applicable.`;
        }
          console.log('prompt', prompt)

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

            const fullText = answer.choices[0].text;

            // Extract Title
            const titleMatch = fullText.match(/Title: (.*)\n/);
            const title = titleMatch ? titleMatch[1].trim() : '';
    
            // Extract Meta Description
            const metaMatch = fullText.match(/Meta Description: (.*)\n/);
            const metaDescription = metaMatch ? metaMatch[1].trim() : '';
    
            // Find index positions for title, meta description, and content markers
            const contentStartMarker = "\nContent:\n";
            const contentStartIndex = fullText.indexOf(contentStartMarker) + contentStartMarker.length;

            // Extract content starting after "Content:\n"
            let content = fullText.substring(contentStartIndex).trim();

    
            setTitle(title);
            setMetaDescription(metaDescription);
            setEditedContent(DOMPurify.sanitize(content));

            const success = await decrementUserCredits(user.id);
            console.log('Credits decremented:', success); // Debugging log

            if (suggestion) {

            const { data, error } = await supabase
            .from('blog_ideas')
            .delete()
            .match({ id: suggestion.id });  // Assuming each suggestion has a unique 'id'
                if (error) {
                  console.error('Error deleting suggestion:', error.message);
                  // You might want to alert the user or handle this silently
              } else {
                  console.log('Suggestion deleted:', data);
                  // Optionally, you can handle the successful deletion here
              }
            } else {
              console.log('No Suggestion to delete')
            }
           
            if (!success) {
              alert('Failed to update credits. Please try again.');
          } else {
              // Fetch the updated user credits and update the state
              const updatedCredits = await getUserCredits(user.id); // Re-use your existing function to fetch credits
              setUserCredits(updatedCredits); // Update the state to reflect the new credits
          }
          } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to generate bio. Please try again.');
          } finally {
            setLoading(false);
          }
        }
  


  return (
    <>
    {user?.id ? (
      <div className='generate-wrapper'>
        <div className='generate-credits-container'>
           {userCredits > 0 ? <p className='ai-gradient'>AI Credits: <span className='credits'>{userCredits}</span></p> : <p className='ai-gradient'>AI Credits: <span className='credits credits-red'>{userCredits}</span></p>}
           </div>
                <h1 className="generate-header ai-gradient2">Generate Blog</h1>
                {!loading && (
    <button className="btn btn-primary gpt-button" onClick={toggleGenerateForm}>
    {generateForm ? <IoMdClose /> : <>Generate with AI <WiStars className='ai-stars'/></>}
  </button>
            // <button className="btn btn-primary gpt-button" onClick={(e) => generateBio(e)} >Generate with AI <WiStars className='ai-stars'/></button>
        )}
      

        {generateForm && 
            <form className='generate-form'>
                          <div className='antiflexer generate-custom-form'>

            <h2 className='appdash-form-header'>Custom</h2>
                <h6 className='gpt-label'>Describe Your Topic</h6>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="gpt-textarea"
                    placeholder={
                    "What would you like the article to be about?"
                    }
                />
        
        
                <h6 className='gpt-label'>Select Keywords (Up to 4)</h6>
        
                       {savedInputs.length < 4 && (
                                <input
                                    type="text"
                                    value={currentInput}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder='Keywords...'
                                    className='keywords-input generate-input'
                                />
                            )}
        
                            <div className='keyword-render-container'>
                                {savedInputs.map((input, index) => (
                                    <div key={index} className='keyword-render-div'>
                                        {input}
                                        <button onClick={() => deleteKeyword(index)} className='delete-btn'><IoMdClose /></button>
        
                                    </div>
                                ))}
                            </div>
        
                            <h6 className='gpt-label'>Select Your Articles Tone</h6>
                            <ToneDropdown options={toneOptions} onOptionSelected={handleAppSelection} /> 
                            {!loading && (
             <button className="btn btn-primary gpt-button" onClick={(e) => generateBlogPost(e)} >Generate <WiStars className='ai-stars'/></button>

        )}
            {/* {showAlert && <div className="success-alert">App created successfully!</div>} */}
            </div>
            <div className='antiflexer generate-suggestions-container'>
              <h2><span className='ai-gradient'>AI</span> Blog Suggestions</h2>
              <div className='generate-suggestions'>
                            {/* <button className='btn btn-tertiary btn-margin'>Create Suggestions</button> */}
                            {aiSuggestions.length > 0 ? (
                    <div className='dash-content-grid-small'>
                        {aiSuggestions.map(idea => (
                            <div key={idea.id} className='dash-content-grid-item searchresult grid-item-suggestion generate-suggestion-container'>
                                    {/* <div className='flexer search-result-flexer'>
                                        <img src='/ranki-logo.png' className='serp-favicon'></img>
                                        <div className='antiflexer'>
                                            {appName && <h6 className='serp-name'>{appName}</h6>}
                                            {appDomain && idea.title && <a className='dash-content-link' rel='noreferrer' target="_blank" >{truncateText(`https://${appDomain}/blog/${createSlug(idea.title)}`, 35)}</a>}
                                        </div>
                                        </div> */}
                                <h2 className='content-item-header'>{idea.title}</h2>
                                <p>{idea.description}</p>
                            <button className="btn btn-primary ai-suggestion-generate" onClick={(e) => generateBlogPost(e, idea)}>Generate <WiStars className='ai-stars'/></button>

                                {/* Render other details as needed */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='no-suggestions'><p>No AI suggestions found.</p></div>
                )}
              </div>
            </div>
          </form>
        }

{loading && (
            <Loading />
        )}
          <h2 className='generate-content-container-header'>Blog</h2>

        <div className="generate-container">
          <div className='generate-form-data'>
        <div className="gpt-form">
        {/* <h6 className='gpt-label'>Select a Tone</h6>
 
     



{/* <h6 className='gpt-label'>Title</h6> */}
        <input type='text' className='title-input generate-input' placeholder='Enter your articles title' onChange={handleTitleChange} value={title} required/>
        {/* <h6 className='gpt-label'>Meta Description</h6> */}
        <input type='text' className='description-input generate-input' placeholder='Enter your articles description' onChange={handleDescriptionChange}  value={metaDescription} required />
        <TextEditor value={editedContent} onChange={handleEditorChange} />
           
       
        </div>

        </div>

        <div className='generate-metrics-container'>

        <div className='blog-metrics-container'>
                <h2 className='blog-metrics-header'>Content SEO Score <IoIosInformationCircle className='info-icon'/></h2>
                <SmallGaugeChart percent={seoScore} />
                <div className='blog-metrics-grid'>
                <div className='blog-metrics-grid-item'>
                        <h6>Words</h6>
                        <p className={metrics.characters > 2000 ? 'green-text': 'red-text'}>{metrics.characters}</p>
                        <p className='blog-metrics-range'>2010-2660</p>

                    </div>
                    <div className='blog-metrics-grid-item'>
                        <h6>Headings</h6>
                        <p className={metrics.headings > 18 ? 'green-text': 'red-text'}>{metrics.headings}</p>
                        <p className='blog-metrics-range'>18-24</p>

                    </div>
                    <div className='blog-metrics-grid-item'>
                        <h6>Paragraphs</h6>
                        <p className={metrics.paragraphs > 15 ? 'green-text': 'red-text'}>{metrics.paragraphs}</p>
                        <p className='blog-metrics-range'>15-21</p>

                    </div>
                    <div className='blog-metrics-grid-item'>
                        <h6>Images</h6>
                        <p className={metrics.images > 5 ? 'green-text': 'red-text'}>{metrics.images}</p>
                        <p className='blog-metrics-range'>12-17</p>
                    </div>
                </div>
          </div>

              {/* <div className='blog-metrics-suggested'>
                    <h2>Suggestions</h2>
              </div> */}
                      <div className='blog-metrics-container'>
        <h2 className='blog-metrics-header'>Competitor Keywords <IoIosInformationCircle className='info-icon'/></h2>
        </div>
        </div>
      </div>  

{/* 
      <h6 className='gpt-label project-label'>Which Project Is This For?</h6>

      <div className="app-selection">
          {userApps.map(app => (
              <div key={app.id} className="radio-container">
                  <input
                      type="radio"
                      id={`app-${app.id}`}
                      name="app"
                      value={app.id}
                      onChange={(e) => setSelectedAppId(e.target.value)}
                  />
                  <label htmlFor={`app-${app.id}`}>
                      {app.name}
                  </label>
              </div>
          ))}
      </div> */}

      <div className='flexer'>
      <button className="btn btn-primary save-draft-btn" onClick={handleSaveDraft}>Save As Draft</button>
      <button className="btn btn-tertiary save-draft-btn" onClick={handleSavePublish}>Publish</button>
        </div>
      {showSuccessMessage && (
                  <div className="success-message">
                      Blog saved successfully!
                  </div>
        )}
      </div>  
    ):(
      <div className='flexer page-flexer'>
        <div className='antiflexer align-center'>
          <h2 className='nouser-login'>Generating Blogs is for users only, please login before continuing.</h2>
          <button className='btn btn-primary btn-margin'>Login</button>
          </div>
      </div>
    )}
    </>   
  )
}

export default Generate



        {/* {sanitizedContent && <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>} */}
        // <button className="btn btn-tertiary btn-margin generate-btn" onClick={handleFetchCredits}>Check Credits</button>
        // {visible && (userCredits > 0 ? <p className='primary-banner'>You have {userCredits} credits</p> : <p className='red'>You are out of credits</p>)}


         //       const handleValueChange = (event) => {
  //     const newValue = parseInt(event.target.value, 10);
  //       if (!isNaN(newValue) && newValue <= MAX_VALUE) {
  //         setWordCount(newValue);
  //     }
  // };


          {/* <input type='number'
                onChange={handleValueChange}
                placeholder="Article Word Count" 
                className="gpt-wordcount"

                /> */}



      
        {/* <h6 className='gpt-label'>Describe Your Topic</h6>
        <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="gpt-textarea"
            placeholder={
            "What would you like the article to be about?"
            }
        />
        <h6 className='gpt-label'>Insert Primary Image</h6>

        <FileDropZone onFileUpload={handleFileUpload} handleImageChange={handleImageChange} />


        <h6 className='gpt-label'>Select Keywords (Up to 4)</h6>

               {savedInputs.length < 4 && (
                        <input
                            type="text"
                            value={currentInput}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder='Keywords...'
                            className='keywords-input generate-input'
                        />
                    )}

                    <div className='keyword-render-container'>
                        {savedInputs.map((input, index) => (
                            <div key={index} className='keyword-render-div'>
                                {input}
                                <button onClick={() => deleteKeyword(index)} className='delete-btn'><IoMdClose /></button>

                            </div>
                        ))}
                    </div> */}


       {/* <button onClick={handleQuillVisibility} className='btn btn-tertiary btn-margin no-gpt-btn'>Generate without GPT</button> */}

        {/* {quillVisibility && 
       <div className='sanitized-content-div'>
        <hr className="" />
        <h2 className='generate-header'>Generated Article:</h2>
         <TextEditor 
                value={editedContent} 
                onChange={handleEditorChange} 
            />
 
        <h6 className='gpt-label'>Which Project Is This For?</h6>
        <div className="app-selection">
            {userApps.map(app => (
                <div key={app.id} className="radio-container">
                    <input
                        type="radio"
                        id={`app-${app.id}`}
                        name="app"
                        value={app.id}
                        onChange={(e) => setSelectedAppId(e.target.value)}
                    />
                    <label htmlFor={`app-${app.id}`}>
                        {app.name}
                    </label>
                </div>
            ))}
        </div>

        <button className="btn btn-primary btn-margin save-draft-btn" onClick={handleSaveDraft}>Save Draft</button>
        {showSuccessMessage && (
                    <div className="success-message">
                        Blog saved successfully!
                    </div>
          )}
        </div>
        } */}

        {/* {sanitizedContent && 
       <div className='santitized-content-div'>
        <hr className="" />
        <h2 className='generate-header'>Generated Article:</h2>
         <TextEditor 
                value={editedContent} 
                onChange={handleEditorChange} 
            />
 
        <h6 className='gpt-label'>Which Project Is This For?</h6>
        <div className="app-selection">
            {userApps.map(app => (
                <div key={app.id} className="radio-container">
                    <input
                        type="radio"
                        id={`app-${app.id}`}
                        name="app"
                        value={app.id}
                        onChange={(e) => setSelectedAppId(e.target.value)}
                    />
                    <label htmlFor={`app-${app.id}`}>
                        {app.name}
                    </label>
                </div>
            ))}
        </div>

        <button className="btn btn-primary btn-margin save-draft-btn" onClick={handleSaveDraft}>Save Draft</button>
        {showSuccessMessage && (
                    <div className="success-message">
                        Blog saved successfully!
                    </div>
          )}
        

        </div>
        } */}