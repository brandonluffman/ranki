import { useState } from 'react';
import Image from 'next/image';

const IntegrateDropdown = ({ options, onOptionSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onOptionSelected) {
            onOptionSelected(option); // Call the callback function
        }
    };


    return (
        <div className="dropdown-container">
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedOption.imgSrc && (
                    <img src={selectedOption.imgSrc} alt="" className='dropdown-img' />
                )}
                {selectedOption.name}
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {options.map((option, index) => (
                        <div key={index} className="dropdown-item" onClick={() => handleOptionClick(option)}>
                            {option.imgSrc && (
                                <img src={option.imgSrc} alt="" />
                            )}
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default IntegrateDropdown;
