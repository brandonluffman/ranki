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
import AlertBanner from './AlertBanner';
import AlertBanner2 from './AlertBanner2';




const GenerateTest = () => {
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
    const [alertMessage, setAlertMessage] = useState('');
    const [alertMessage2, setAlertMessage2] = useState('');



//     useEffect(() => {
//       if (user?.id) {
//           fetchUserApps();
//           fetchBlogIdeas(slug).then(setAiSuggestions);
//           fetchAppName(slug);
//           handleFetchCredits();
//       }
//   }, [user]);

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
          
 

      const handleSaveDraft = (e) => {
        e.preventDefault();
        setAlertMessage('Register for an account to use our AI Features!');
      };
    
      const handleSavePublish = (e) => {
        e.preventDefault();
        setAlertMessage2('Register for an account save your progress!');
      };


  return (
    <>
      <div className='generate-wrapper'>

        <div className='generate-credits-container'>
           {userCredits > 0 ? <p className='ai-gradient'>Credits: <span className='credits'>{userCredits}</span></p> : <p className='ai-gradient'>Credits: <span className='credits credits-red'>{userCredits}</span></p>}
           </div>
                <h1 className="generate-header ai-gradient2">Generate Blog</h1>
                {!loading && (
    <button className="btn btn-primary gpt-button" onClick={toggleGenerateForm}>
    {generateForm ? <IoMdClose /> : <>Generate with AI <WiStars className='ai-stars'/></>}
  </button>
        )}
      

        {generateForm && 
            <form className='generate-form'>
                    <AlertBanner message={alertMessage} onClose={() => setAlertMessage('')} />

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
             <button className="btn btn-primary gpt-button" onClick={handleSaveDraft}>Generate <WiStars className='ai-stars'/></button>

        )}
            </div>
            <div className='antiflexer generate-suggestions-container'>
              <h2><span className='ai-gradient'>AI</span> Blog Suggestions</h2>
              <div className='generate-suggestions'>
                            {aiSuggestions.length > 0 ? (
                    <div className='dash-content-grid-small'>
                        {aiSuggestions.map(idea => (
                            <div key={idea.id} className='dash-content-grid-item searchresult grid-item-suggestion generate-suggestion-container'>
                                <h2 className='content-item-header'>{idea.title}</h2>
                                <p>{idea.description}</p>
                            {/* <button className="btn btn-primary ai-suggestion-generate" onClick={(e) => generateBlogPost(e, idea)}>Generate <WiStars className='ai-stars'/></button> */}
                            <button className="btn btn-primary ai-suggestion-generate" onClick={handleSaveDraft}>Generate <WiStars className='ai-stars'/></button>

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='no-suggestions'>
                        <p>No AI suggestions found.</p>
                        <button className='btn btn-tertiary btn-margin' onClick={handleSaveDraft}>Generate Suggestions <WiStars className='ai-stars'/></button>
                        </div>
                )}
              </div>
            </div>
          </form>
        }

        {loading && (
            <Loading />
        )}
          {/* <h2 className='generate-content-container-header'>Blog</h2> */}

        <div className="generate-container">
          <div className='generate-form-data'>
        <div className="gpt-form">
        <input type='text' className='title-input generate-input' placeholder='Enter your articles title' onChange={handleTitleChange} value={title} required/>
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
                      <div className='blog-metrics-container'>
        <h2 className='blog-metrics-header'>Competitor Keywords <IoIosInformationCircle className='info-icon'/></h2>
        </div>
        </div>
      </div>  

      <div className='flexer flexer-relative'>
      <AlertBanner2 message={alertMessage2} onClose={() => setAlertMessage2('')} />

        <button className="btn btn-primary save-draft-btn" onClick={handleSavePublish}>Save As Draft</button>
        <button className="btn btn-tertiary save-draft-btn" onClick={handleSavePublish}>Publish</button>
      </div>
      {showSuccessMessage && (
                  <div className="success-message">
                      Blog saved successfully!
                  </div>
        )}
      </div>  
    </>   
  )
}

export default GenerateTest