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

    const { prompt } = req.body;

    // Check if prompt is provided in the request
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

        // Send the successful response back to the client
        res.status(200).json(json);
    } catch (error) {
        // Handle any other errors
        console.error('Error making API call:', error);
        res.status(500).json({ error: 'Failed to make API call' });
    }
}


// export default async function handler(req, res) {
//     console.log('IN THE API CALL');

//     // Ensure the OPENAI_API_KEY is available
//     if (!process.env.OPENAI_API_KEY) {
//         return res.status(500).json({ error: "Server configuration error: Missing OpenAI API Key." });
//     }

//     const { prompt } = req.body;

//     // Check if prompt is provided in the request
//     if (!prompt) {
//         return res.status(400).json({ error: "No prompt in the request" });
//     }
//     console.log('IN API CALL V2')
//     const payload = {
//         model: "gpt-3.5-turbo-instruct",
//         prompt,
//         temperature: 0.7,
//         max_tokens: 2000,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//     };
//     console.log('IN API CALL V3')
//     console.log(`Bearer ${process.env.OPENAI_API_KEY}`)
//     try {
//         const response = await fetch("https://api.openai.com/v1/completions", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//             },
//             body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//             console.log('MAJOR ERROR')
//             // If the API call wasn't successful, return the error from OpenAI
//             const errorData = await response.json();
//                 console.error('API response error:', errorData);
//                 return res.status(response.status).json({ error: errorData });
//         }

//         const json = await response.json();
//         console.log('You just made a call to the API');
//         console.log('RAW RESPONSE --> ', json)

//         // Send the successful response back to the client
//         res.status(200).json(json);
//     } catch (error) {
//         // Handle any other errors
//         console.error('Error making API call:', error);
//         res.status(500).json({ error: 'Failed to make API call' });
//     }
// }
