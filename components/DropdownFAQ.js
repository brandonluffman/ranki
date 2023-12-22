import React, { useState } from 'react';
import {RiArrowDropDownLine} from 'react-icons/ri'

const DropdownFAQ = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={`faq-item`} onClick={toggleDropdown}>
        <h2 className='faq-header'>{title}</h2><RiArrowDropDownLine className='dropdown-icon'/>
    </div>
       <div className={`${isOpen ? 'faq-dropdown-content' : 'faq-dropdown-content-closed'}`}>
          {content}
          </div> 
          </>
  );
};

export default DropdownFAQ;
