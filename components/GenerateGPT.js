import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { WiStars } from 'react-icons/wi';
import ToneDropdown from './ToneDropdown';
import toneOptions from '../public/toneOptions'

const GenerateGPT = ({ generateBio }) => {
    const [savedInputs, setSavedInputs] = useState([]);
    const [currentInput, setCurrentInput] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [bio, setBio] = useState("");

    const testing = () => {
        console.log('Form Submitted')
    }

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

    const deleteKeyword = (indexToDelete) => {
        setSavedInputs(savedInputs.filter((_, index) => index !== indexToDelete));
      };

      const handleAppSelection = (selectedApp) => {
        // Update the state or perform any action required when an app is selected
        setTone(selectedApp.name);
        // ... other actions based on selected app ...
      };
  return (
    <form className='generate-form'>
    <h2 className='appdash-form-header'>Generate Blog with AI</h2>

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

     <button className="btn btn-primary gpt-button" onClick={(e) => generateBio(e)} >Generate <WiStars className='ai-stars'/></button>
    {/* {showAlert && <div className="success-alert">App created successfully!</div>} */}

  </form>
  )
}

export default GenerateGPT