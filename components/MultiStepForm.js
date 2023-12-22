import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import GaugeChartComponent from './GaugeChartComponent';
import SmallGaugeChart from './SmallGaugeChart';
import { MdCheckCircleOutline, MdRadioButtonUnchecked } from 'react-icons/md';


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

    return (
        <div className='step-container'>
            <button onClick={toggle} className="close-btn"><IoMdClose /></button>
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
                </div>
                 <div>
                 <button className='next-btn' type="button" onClick={nextStep}>Create for 1 Credit <BsArrowRight className='arrow-right'/></button>
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
const StepTwo = ({ nextStep, prevStep, toggle, handleFormDataChange }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleNext = () => {
        handleFormDataChange({ title, content });
        nextStep();
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
                    <input 
                        type='text' 
                        className='dashboard-addform-input' 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder='Content' 
                        required 
                    />
                </form>
                <div className='blog-metrics-container'>
                                    <h2 className='blog-metrics-header'>Content</h2>
                                    <SmallGaugeChart score={30} />
                                    <div className='blog-metrics-grid'>
                                        <div className='blog-metrics-grid-item'>
                                            <h6>Words</h6>
                                            <p>1,542</p>
                                        </div>
                                        <div className='blog-metrics-grid-item'>
                                            <h6>Headings</h6>
                                            <p>2</p>
                                        </div>
                                        <div className='blog-metrics-grid-item'>
                                            <h6>Paragraphs</h6>
                                            <p>17</p>
                                        </div>
                                        <div className='blog-metrics-grid-item'>
                                            <h6>Images</h6>
                                            <p>0</p>
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





const StepThree = ({ prevStep, formData, submitForm, toggle }) => (
    <div className='step-container'>
        {/* <h2>Preview & Publish</h2> */}
        <div>
            <h3>{formData.title}</h3>
            <p>{formData.content}</p>
        </div>
        <button onClick={() => submitForm(formData)} className='btn btn-primary'>Publish</button>
    </div>
);

// MultiStepForm component
const MultiStepForm = ({ toggle, submitForm }) => {
    const [step, setStep] = useState(1);
    const [choice, setChoice] = useState('Write Yourself'); // Default to 'Write Yourself'
    const [currentInput, setCurrentInput] = useState('');
    const [savedInputs, setSavedInputs] = useState([]);
    const [isAI, setIsAI] = useState(false); // Default to 'Write Yourself'
    const [formData, setFormData] = useState({ title: '', content: '' });


    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
    };

    const handleFormDataChange = (newData) => {
        setFormData(newData);
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected choice:', choice); // Process the choice here
    };
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    // const submitForm = () => {
    //     // Handle form submission
    //     console.log("Form Submitted");
    // };

    const resetForm = () => {
        setStep(1);
        setChoice('');
        setCurrentInput('');
        setSavedInputs([]);
        
    };

    switch (step) {
        case 1:
            return (
                <>
                           <h2 className='blog-add-header'>Blog Builder</h2>

               <StepIndicator currentStep={step-1} totalSteps={3} />

                <StepOne
                    nextStep={nextStep}
                    handleRadioChange={handleRadioChange}
                    handleInputChange={handleInputChange}
                    handleKeyPress={handleKeyPress}
                    choice={choice}
                    currentInput={currentInput}
                    savedInputs={savedInputs}
                    closeForm={resetForm}
                    toggle={toggle}
                    setChoice={setChoice}
                />
             </>

            );
        case 2:
            return (
                <>
                                           <h2 className='blog-add-header'>Blog Builder</h2>

               <StepIndicator currentStep={step-1} totalSteps={3} />

               <StepTwo nextStep={nextStep} prevStep={prevStep}  toggle={toggle}                     handleFormDataChange={handleFormDataChange}   />;

             </>

            );
        case 3:
            return (
                <>
                                           <h2 className='blog-add-header'>Blog Builder</h2>

               <StepIndicator currentStep={step-1} totalSteps={3} />

               <StepThree 
            prevStep={prevStep} 
            formData={formData}
            submitForm={submitForm} 
            toggle={toggle} 
        />
                 </>

            );
        default:
            return <div>Invalid Step</div>;
    }
};

export default MultiStepForm;
