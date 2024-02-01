import { supabase } from '../../utils/supabaseClient'

export const config = {
    maxDuration: 300,
};

// Define a single handler function
export default async function handler(req, res) {
    console.log('IN THE API CALL');

    // Ensure the OPENAI_API_KEY is available
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Server configuration error: Missing OpenAI API Key." });
    }

    const { appsData } = req.body;

    if (!appsData || typeof appsData !== 'object') {
        return res.status(400).json({ message: 'Invalid apps data' });
    }
    const app = appsData[0];

    const removeQuotes = str => str.replace(/["']/g, '');

    // Concatenating the fields into a single string after removing quotes
    const business = [
        removeQuotes(app.description),
        removeQuotes(app.industry),
        removeQuotes(app.target_audience),
        removeQuotes(app.competitors),
        removeQuotes(app.current_targeted_keywords),
        removeQuotes(app.future_keyword_interests),
        removeQuotes(app.seo_goals),
        removeQuotes(app.current_content_type),
        removeQuotes(app.content_objectives)
    ].filter(Boolean).join(' ');

    const prompt = `For the business with the following details: ${business}, generate detailed 2 blog post ideas. For each idea, provide a title, a short description, and a few relevant keywords. This will be inserted into a DB so it is crucial that is it formatted in order exactly as: Title, Description, Keywords`;

    if (!prompt) {
        return res.status(400).json({ error: "No prompt in the request" });
    }
    console.log('IN API CALL V2');

    const payload = {
        model: "gpt-3.5-turbo-instruct",
        prompt,
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    };
    console.log('IN API CALL V3');
    
    try {
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.log('MAJOR ERROR');
            // If the API call wasn't successful, return the error from OpenAI
            const errorData = await response.json();
            console.error('API response error:', errorData);
            return res.status(response.status).json({ error: errorData });
        }

        const json = await response.json();
        console.log('You just made a call to the API');
        console.log('RAW RESPONSE --> ', json);

        const blogIdeasText = json.choices[0].text.trim();
        const blogIdeas = [];
        const ideaParts = blogIdeasText.split('\n').filter(Boolean);
        for (let i = 0; i < ideaParts.length; i += 3) {
            blogIdeas.push({
                title: ideaParts[i],
                description: ideaParts[i + 1],
                keywords: ideaParts[i + 2],
            });
        }

        for (const idea of blogIdeas) {
            const { error } = await supabase
                .from('blog_ideas')
                .insert([{
                    app_id: app.id, // Assuming app.id is the ID of the app
                    title: idea.title,
                    description: idea.description,
                    keywords: idea.keywords
                }]);
        
            if (error) {
                console.error('Error inserting idea into Supabase:', error);
                // Optionally handle partial insertion errors
            }
        }

    // Send the successful response back to the client
    res.status(200).json({ blogIdeas });
    } catch (error) {
        // Handle any other errors
        console.error('Error making API call:', error);
        res.status(500).json({ error: 'Failed to make API call' });
    }
}



    // const { appsData } = req.body;

    // const prompt = `Generate blog ideas for the following apps: ${appsData.map(app => app.name).join(', ')}`;

    // try {
    //     const gptResponse = await openai.createCompletion("text-davinci-003", {
    //         prompt: prompt,
    //         max_tokens: 100
    //     });

    //     const blogIdeas = gptResponse.data.choices[0].text.trim().split('\n');

    //     await Promise.all(blogIdeas.map(async (idea) => {
    //         await supabase.from('blog_ideas').insert([{ idea }]);
    //     }));

    //     res.status(200).json(blogIdeas);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }