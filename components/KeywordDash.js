import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { supabase } from '../utils/supabaseClient';
import Loading from './Loading';
import { IoMdAdd, IoMdClose } from 'react-icons/io';

const KeywordDash = ({ length }) => {
    const router = useRouter();
    const { slug } = router.query;

    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [keywords, setKeywords] = useState([]);
    const [newKeyword, setNewKeyword] = useState(''); // State to store the new keyword
    const [visible, handleVisible] = useState(false);
    useEffect(() => {
        if (user) {
            fetchUserApps();
        } else {
            // handle the scenario when the user is not logged in
            console.log('no user');
        }
    }, [user]);

    const fetchUserApps = async () => {
        if (!user) {
            console.error("User not authenticated");
            router.push('/login');
            return;
        }

        setIsLoading(true); // set loading to true when the fetch starts
        try {
            const { data: appsData, error } = await supabase
                .from('apps')
                .select('targeted_keywords')
                .eq('id', slug);

            if (error) {
                throw error;
            }

            setKeywords(appsData.map(app => app.targeted_keywords).flat());
        } catch (error) {
            console.error("Error fetching apps:", error);
            // you might want to show some error message to the user here
        } finally {
            setIsLoading(false); // set loading to false once the fetch is complete
        }
    };

    const handleKeywordChange = (e) => {
        setNewKeyword(e.target.value);
    };

    const handleAddKeyword = async (e) => {
        e.preventDefault();
        if (!newKeyword) return;
    
        setIsLoading(true);
    
        try {
            // Assuming 'currentAppId' is the ID of the app you want to update
            const { data: appData, error: fetchError } = await supabase
                .from('apps')
                .select('targeted_keywords')
                .eq('id', slug) // Use the specific app ID here
                .single();
    
            if (fetchError) throw fetchError;
    
            // Check if targeted_keywords is an array, if not, treat it as an empty array
            let keywordsArray = appData.targeted_keywords ? appData.targeted_keywords : [];
            if (typeof keywordsArray === 'string') {
                keywordsArray = JSON.parse(keywordsArray); // Parse stringified JSON if necessary
            }
            const updatedKeywords = Array.from(new Set([...keywordsArray, newKeyword]));
    
            const { error: updateError } = await supabase
                .from('apps')
                .update({ targeted_keywords: updatedKeywords })
                .eq('id', slug);
    
            if (updateError) throw updateError;
    
            // Update local state
            setKeywords(updatedKeywords);
        } catch (error) {
            console.error("Error updating keywords:", error);
        } finally {
            setIsLoading(false);
            setNewKeyword(''); // Reset input field
        }
    };
    
    
    

    const toggleKeywordAdd = () => {
        handleVisible(!visible)
    }

    const handleDeleteKeyword = async (keywordToDelete, appId) => {
        setIsLoading(true);
    
        try {
            // Fetch the current targeted_keywords for the specific app
            const { data: appData, error: fetchError } = await supabase
                .from('apps')
                .select('targeted_keywords')
                .eq('id', appId)
                .single();
    
            if (fetchError) throw fetchError;
    
            // Filter out the keyword to delete
            const updatedKeywords = appData.targeted_keywords.filter(keyword => keyword !== keywordToDelete);
    
            // Update the database
            const { error: updateError } = await supabase
                .from('apps')
                .update({ targeted_keywords: updatedKeywords })
                .eq('id', appId);
    
            if (updateError) throw updateError;
    
            // Update local state
            setKeywords(prevKeywords => prevKeywords.filter(keyword => keyword !== keywordToDelete));
        } catch (error) {
            console.error("Error deleting keyword:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
            <div className='keyword-dash-container'>
                <h2>Ranking Keywords</h2>
                {/* Optional descriptive paragraph can be uncommented if needed */}
                {/* <p>Here, we will determine your website's most optimal keywords. Keywords are what people search into google. Ranking for these particular keywords will grant more traffic to your website.</p> */}

                <button onClick={toggleKeywordAdd} className='btn-add add-btn addnew-keyword-btn'>
                    <IoMdAdd />
                </button>
                {visible && (
                    <form onSubmit={handleAddKeyword} className='add-keyword-form'>
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={handleKeywordChange}
                            placeholder="Enter a new keyword"
                            className='keywords-container-input'
                        />
                        <button type="submit"><IoMdAdd /></button>
                    </form>
                )}

                {isLoading ? <Loading /> : (
                    <ul className='keywords-menu'>
                        {length ? (
                            keywords.filter(keyword => keyword).slice(0, length).map((keyword, index) => (
                                <li className='keywords-li' key={index}>
                                    {keyword} 
                                    <button onClick={() => handleDeleteKeyword(keyword, slug)} className='delete-btn keyword-delete'>
                                        <IoMdClose />
                                    </button>
                                </li>
                            ))
                        ) : (
                            keywords.filter(keyword => keyword).map((keyword, index) => (
                                <li className='keywords-li' key={index}>
                                    {keyword} 
                                    <button onClick={() => handleDeleteKeyword(keyword, slug)} className='delete-btn keyword-delete'>
                                        <IoMdClose />
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                )}

            </div>

    )
}

export default KeywordDash;
