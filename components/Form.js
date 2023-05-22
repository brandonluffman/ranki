import axios from 'axios'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { useState } from 'react'
import { BsDot, BsSearch } from 'react-icons/bs'

const Form = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([])
    const [timeoutId, setTimeoutId] = useState(null);
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query  == '') {
          router.push(`/`);
        } else {
          router.push(`/ranking?q=${query}`);
        }
        };
      const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
    
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
    
        if (!value) {
          setSuggestions([]);
          return;
        }
    
        // Set a new timeout to wait for 300ms before executing the event handler
        const newTimeoutId = setTimeout(async () => {
          try {
            const res = await axios.get(`https://grsvumxr5onti4rnxgin73azyq0fgqvy.lambda-url.us-east-2.on.aws/blackwidow/products/${value}/`);
            const sug = await res.data;
            console.log(sug)
            setSuggestions(sug);
          } catch (error) {
            // Handle the error here (e.g. log it, display a message to the user)
          }
        }, 100);
    
        // Save the new timeout ID to the state for later use
        setTimeoutId(newTimeoutId);
      };
      
  return (
    <div>
        <form className='form' onSubmit={handleSubmit} autoComplete='off'>
             <input
              type="text"
              id="query"
              value={query}
              onChange={handleChange}
              // onClick={searchToggle}
              className='landing-input'
              placeholder='What&apos;re you looking for? ...'
            />
           <button className='landing-btn' type="submit"><BsSearch className='input-search-icon'/></button>
           
             <div className='input-suggestions'>
              {Array.isArray(suggestions) && (
                suggestions.slice(0,10).map((suggestion,i) => (
                  suggestion.length == 4 ? (
                    <Link href={`product/${suggestion[0]}`} key={suggestion[0]} className='input-suggestion-div'>
                      {suggestion[2] == 'hello' ? (
                        <img src='/logos/1.png' width='50'></img>
                      ):(
                        <img src={suggestion[2]} width='50'></img>
                      )}
                      <p>{suggestion[1]}</p>
                      <p className='kind-color-product'><BsDot /> PRODUCT</p>
                      </Link>
                    ): (
                      <Link href={`/ranking?q=${suggestion}`} key={suggestion} className='input-suggestion-div'>
                      <p>{suggestion}</p><p className='kind-color-query'><BsDot /> QUERY</p>
                      </Link>
                    )
                ))
              )}
            </div> 
        </form>
    </div>
  )
}

export default Form