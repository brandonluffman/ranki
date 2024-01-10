import React, { useState, useEffect, useContext } from 'react';
import { IoMdAdd, IoMdClose } from 'react-icons/io';
import GaugeChartComponent from './GaugeChartComponent';
import MultiStepForm from './MultiStepForm';
import { BsArrowRight } from 'react-icons/bs';
import SmallGaugeChart from './SmallGaugeChart';
import { MdCheckCircleOutline, MdRadioButtonUnchecked } from 'react-icons/md';
import TextEditor from '../components/TextEditor';
import DOMPurify from 'dompurify';
import Loading from './Loading';
import { UserContext } from '../context/UserContext';


const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className="step-indicator-container">
            {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className={`step-indicator ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}>
                    {index < currentStep ? <MdCheckCircleOutline /> : (index === currentStep ? index +1 : <MdRadioButtonUnchecked />)}
                </div>
            ))}
        </div>
    );
};


const StepOne = ({ nextStep, choice, setChoice, currentInput, handleInputChange, handleKeyPress, savedInputs, toggle }) => {
    const isAI = choice === 'AI Generated';
    const MAX_VALUE = 100; // Set your max value here
    const { user } = useContext(UserContext);
  
    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState("");
    const [vibe, setVibe] = useState("Professional");
    const [generatedBios, setGeneratedBios] = useState("");
    const [tone, setTone] = useState('Professional');
    const [wordCount, setWordCount] = useState(0);
    const [articleKeywords, setArticleKeywords] = useState([]);
    const [globalArticleCount, setGlobalArticleCount] = useState(256475);

    const prompt = `Generate an SEO optimized article with ${articleKeywords} as the keywords and a max of ${wordCount} words. The tone of the article will be ${vibe}`;
    const handleValueChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
    
        // Check if the new value is not NaN and less than or equal to MAX_VALUE
        if (!isNaN(newValue) && newValue <= MAX_VALUE) {
            setWordCount(newValue);
        }
    };

    const generateBio = async (e) => {
        e.preventDefault();
        setGeneratedBios("");
        setLoading(true);
        try {

        const response = await fetch("/api/gpt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        });
    
        if (!response.ok) {
          throw new Error(response.statusText);
        }
    
        let answer = await response.json();
        setGeneratedBios(answer.choices[0].text);
        // console.log("Generated Bios Updated:", answer.choices[0].text);
    } catch(error) {
        console.error('Api call failed', error)
        alert('Failed to generate content. Please try again.')
    } finally {
        setLoading(false);
    }
      };


    const handleNextStep = async () => {
        if (isAI && savedInputs.length > 0) {
            const content = await generateBlogContent(savedInputs);
            setFormData({ title: '', content }); // Update form data with generated content
            nextStep();
        } else {
            nextStep(); // Proceed without generating content
        }
    };
    
    return (
        <div className='step-container'>
            {/* <button onClick={toggle} className="close-btn"><IoMdClose /></button> */}
            {/* <h2>Content Editor</h2> */}

            <div className='step-toggle-container'>
            <button
                    className={!isAI ? 'step-toggle active' : 'step-toggle nonactive'}
                    onClick={() => setChoice('Write Yourself')}
                >
                    Write Yourself
                </button>

                <button
                    className={isAI ? 'step-toggle active' : 'step-toggle nonactive'}
                    onClick={() => setChoice('AI Generated')}
                >
                    AI Generated
                </button>
             
            </div>

            {isAI ? (
                <div>
                <div className='keyword-input-container'>

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
                            placeholder="Article Word Count" 
                            className="gpt-wordcount"

                    />

                            {!loading && (
                        <button className="btn btn-primary gpt-button" onClick={(e) => generateBio(e)} >Generate for 1 Credit &rarr;</button>
                    )}
                    {loading && (
                        <button className="btn btn-primary" disabled><Loading /></button>
                    )}
                    {generatedBios && (
                                <div
                                    className=""
                                    onClick={() => {
                                        navigator.clipboard.writeText(generatedBios);
                                        toast("Bio copied to clipboard", { icon: "✂️" });
                                    }}
                                >
                                    <p>{generatedBios}</p>
                                </div>
                            )}

                    {/* {savedInputs.length < 4 && (
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
                    </div> */}
                </div>
                 <div>
                 <button className='next-btn' type="button" onClick={handleNextStep}>
               Preview <BsArrowRight className='arrow-right'/>
            </button>
                         </div>
             </div>
            ): (
                <div>
                <button className='next-btn' type="button" onClick={nextStep}>Create <BsArrowRight className='arrow-right'/></button>
            </div>
            )
            }

           
        </div>
    );
};
const StepTwo = ({ nextStep, prevStep, toggle, handleFormDataChange, generatedBios }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState("");
    // generatedBios && console.log(generatedBios)
    useEffect(() => {
        setContent(generatedBios || "");
    }, [generatedBios]);
    const handleNext = () => {
        if (!title.trim() || !content.trim()) {
            alert('Title and content are required.');
            return;
        }
        handleFormDataChange({ title, content });
        nextStep();
    };

    const [metrics, setMetrics] = useState({
        characters: 0,
        headings: 0,
        paragraphs: 0,
        images: 0,
    });

    useEffect(() => {
        setMetrics({
            characters: getCharacterCount(content),
            headings: getHeadingCount(content),
            paragraphs: getParagraphCount(content),
            images: getImageCount(content),
        });
    }, [content]);

    const getCharacterCount = (html) => {
        if (!html) return 0;
        const text = html.replace(/<[^>]*>/g, '');
        return text.length;
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

    return (
        <div className='step-container'> {/* Added class for consistent styling */}
            {/* <h2 className='blog-add-header'>Blog Builder</h2> */}
            <div className='classic-flexer'>
                <button className='close-btn' type='button' onClick={toggle}><IoMdClose /></button>
                <form className='blog-add-form'>
                    <input 
                        type='text' 
                        className='dashboard-addform-input' 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder='Title' 
                        required 
                    />
                 <TextEditor 
                            value={content} 
                            onChange={setContent} // Pass setContent directly
                        />
                </form>
                <div className='blog-metrics-container'>
                                    <h2 className='blog-metrics-header'>Content</h2>
                                    <SmallGaugeChart score={30} />
                                    <div className='blog-metrics-grid'>
                                    <div className='blog-metrics-grid-item'>
                                            <h6>Characters</h6>
                                            <p>{metrics.characters}</p>
                                        </div>
                                        <div className='blog-metrics-grid-item'>
                                            <h6>Headings</h6>
                                            <p>{metrics.headings}</p>
                                        </div>
                                        <div className='blog-metrics-grid-item'>
                                            <h6>Paragraphs</h6>
                                            <p>{metrics.paragraphs}</p>
                                        </div>
                                        <div className='blog-metrics-grid-item'>
                                            <h6>Images</h6>
                                            <p>{metrics.images}</p>
                                        </div>
                                    </div>
                                </div>
                               
            </div>
            <div className='flexer step-flexer'>
                <button onClick={prevStep} className='next-btn'>Previous</button>
                <button onClick={handleNext} className='next-btn'>Next</button>
            </div>
        </div>
    );
};



const HTMLContent = ({ html }) => {
    return <div className='blog-content' dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const StepThree = ({ prevStep, formData, submitForm, toggle }) => {
    // Sanitize the content outside the JSX return
    const sanitizedContent = formData ? DOMPurify.sanitize(formData.content) : '';

    return (
        <div className='step-container'>
            <div>
                <h3>{formData.title}</h3>
                {/* The below line might not be needed as HTMLContent is being used */}
                {/* <p>{formData.content}</p> */}
                <HTMLContent html={sanitizedContent} />
            </div>
            <button onClick={() => submitForm(formData)} className='btn btn-primary'>Publish</button>
            <div className='flexer step-flexer'>
                <button onClick={prevStep} className='next-btn'>Previous</button>
            </div>
        </div>
    );
};

const AddBlog = ({ submitForm, toggle }) => {
    const [step, setStep] = useState(1);
    const [choice, setChoice] = useState('Write Yourself'); // Default to 'Write Yourself'
    const [currentInput, setCurrentInput] = useState('');
    const [savedInputs, setSavedInputs] = useState([]);
    const [isAI, setIsAI] = useState(false); // Default to 'Write Yourself'
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [generatedBios, setGeneratedBios] = useState("");



    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
    };
    const handleFormDataChange = (newData) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            ...newData
        }));
    };

    const handleKeyPress = (e) => {
        // Check for 'Enter' key press without submitting the form
        if (e.key === 'Enter' && currentInput.trim() !== '' && savedInputs.length < 4) {
            e.preventDefault(); // Prevent the default form submission on enter key
            setSavedInputs(prev => [...prev, currentInput.trim()]);
            setCurrentInput('');
        }
    };
    
    const handleRadioChange = (e) => {
        setChoice(e.target.value);
    };
    
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);



let renderStep;
    switch (step) {
        case 1:
            renderStep = (
                <StepOne
                nextStep={nextStep}
                handleRadioChange={handleRadioChange}
                handleInputChange={handleInputChange}
                handleKeyPress={handleKeyPress}
                choice={choice}
                currentInput={currentInput}
                savedInputs={savedInputs}
                // closeForm={resetForm}
                toggle={toggle}
                setChoice={setChoice}
                />
            );
            break;
        case 2:
            renderStep = (
                <StepTwo
                    nextStep={nextStep}
                    prevStep={prevStep}
                    toggle={toggle}
                    handleFormDataChange={handleFormDataChange}
                    generatedBios={generatedBios}

                />
            );
            break;
        case 3:
            renderStep = (
                <StepThree
                    prevStep={prevStep}
                    formData={formData}
                    submitForm={submitForm}
                    toggle={toggle}
                />
            );
            break;
        default:
            renderStep = <div>Invalid Step</div>;
    }

    return (
        <div className='blog-dashboard-addform-container'>
                        <button onClick={toggle} className="close-btn"><IoMdClose /></button>

            <h2 className='blog-add-header'>Blog Builder</h2>
            <StepIndicator currentStep={step - 1} totalSteps={3} />
            {renderStep}
        </div>
    );

};

export default AddBlog;


// const [isBlock, isBlockOpen] = useState(false);
// const [inputs, setInputs] = useState([]);
// const [previewContent, setPreviewContent] = useState([]);


    // const resetForm = () => {
    //     setStep(1);
    //     setChoice('');
    //     setCurrentInput('');
    //     setSavedInputs([]);
        
    // };
   // const toggleAddBlock = () => {
    //     isBlockOpen(!isBlock);
    // };

    // const handleAddInput = (value) => {
    //     if (!inputs.includes(value)) {
    //         setInputs([...inputs, value]);
    //         setPreviewContent([...previewContent, { tag: value, text: '' }]);
    //     }
    // };

    // const handleInputChangeForPreview = (tag, text) => {
    //     const index = previewContent.findIndex(content => content.tag === tag);
    //     const newPreviewContent = [...previewContent];
    //     if (index !== -1) {
    //         newPreviewContent[index] = { tag, text };
    //         setPreviewContent(newPreviewContent);
    //     }
    // };

    // const renderPreview = () => {
    //     return previewContent.map((content, index) => {
    //         if (content.tag === 'img') {
    //             return <img key={index} src={content.text} alt="Blog Image" />;
    //         } else {
    //             const Tag = content.tag;
    //             return <Tag key={index}>{content.text}</Tag>;
    //         }
    //     });
    // };

     {/* <div className='classic-flexer'>
            <form onSubmit={submitForm} className='blog-add-form'>
                <input type='text' className='dashboard-addform-input' name='title' placeholder='Title' required />
                <input type='text' className='dashboard-addform-input' name='content' placeholder='Content' required />
                <input type='file' className='dashboard-addform-input' name='content' placeholder='Feature Img' required />
                <input type='text' className='dashboard-addform-input' name='content' placeholder='Introduction' required />

                <div>
                    <button onClick={toggleAddBlock} type='button' className='add-btn'><IoMdAdd /></button>
                </div>
                <div className={isBlock ? 'blog-add-block-container' : 'blog-add-block-container-noshow'}>
                    <ul className='blog-add-block-list'>
                        {['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'img'].map(tag => (
                            <li key={tag} onClick={() => handleAddInput(tag)}>{tag}</li>
                        ))}
                    </ul>
                </div>
          

                {inputs.map((input, index) => (
                    <input
                        key={index}
                        type='text'
                        className='dashboard-addform-input'
                        name={input}
                        placeholder={`${input} content`}
                        required
                        onChange={(e) => handleInputChangeForPreview(input, e.target.value, index)}
                    />
                ))}
                <button type='submit' className='dashboard-addform-btn btn btn-primary'>Add Blog</button>
                <button className='close-btn' type='button' onClick={toggle}><IoMdClose /></button>
            </form>


                <div className='blog-add-render-container'>
                    {renderPreview()}
                </div>
                </div> */}