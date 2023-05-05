import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Form = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([])
    const [timeoutId, setTimeoutId] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query  == '') {
            router.push(`/`);
        } else {
        router.push(`/ranking?q=${query}`);
        }
        };

    const handleChange = async (e) => {
        if (e.target.value != ''){
            setQuery(e.target.value);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        
            // Set a new timeout to wait for 1 second before executing the event handler
            const newTimeoutId = setTimeout(async () => {
                const res = await axios.get(`http://127.0.0.1:8000/blackwidow/products/${e.target.value}`);
                const sug = await res.data;
                setSuggestions(sug)
            }, 1000);
        
            // Save the new timeout ID to the state for later use
            setTimeoutId(newTimeoutId);
        
        } else {
            setQuery('H');
            console.log('nada')
        }
    };

  return (
    <div>
        <form className='form' onSubmit={handleSubmit}>
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
                  <Link href={`product/${suggestion[0]}`} key={suggestion[0]} className='input-suggestion-div'>
                    {suggestion[1] == 'hello' ? (
                      <img src='/zon.png' width='50'></img>
                    ):(
                      <img src={suggestion[2]} width='50'></img>
                    )}
                    <p>{suggestion[1]}</p>
                    </Link>
                ))
              )}
            </div> 
        </form>
    </div>
  )
}

export default Form