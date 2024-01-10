import React, {useState, useEffect, useContext} from 'react'
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
// import DropDown from "../components/DropDown";
import Footer from "../components/Footer";
// import Github from "../components/GitHub";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import ResizablePanel from "../components/ResizablePanel";
import { UserContext } from '../context/UserContext';

const GPTForm = () => {
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
    setLoading(false);
  };

  return (

    <div className="gpt-container">
      {user ? (
        <div>
                  <h1 className="gpt-header">Generate your SEO-Optimized Article</h1>
        <p className="gpt-subheader">{globalArticleCount.toLocaleString()} articles generated so far.</p>
        <div className="">
    
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

          <div className="gpt-dropdown-container">
            {/* <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} /> */}
            <input />
          </div>

          {!loading && (
            <button className="btn btn-primary gpt-button" onClick={(e) => generateBio(e)} >Generate your bio &rarr;</button>
          )}
          {loading && (
            <button className="btn btn-primary" disabled><Loading /></button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="" />

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
        </div>
      ):(
        <div>Login</div>
      )}


      </div>
 
  );
};

export default GPTForm;

