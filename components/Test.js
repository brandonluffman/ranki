import React, {useState, useEffect, useRef} from 'react'
import {supabase} from '../utils/supabaseClient'

const Test = ({ onRefresh }) => {
    const [apps, setApps] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const formRef = useRef(null);

    const fetchUserApps = async () => {
        const response = await supabase.auth.getUser();
        const user = response.data.user; // Correctly extracting the user object
        console.log('fetching')
        if ( !user) {
            console.error("User not authenticated");
            return;
        }

        const { data: apps, error } = await supabase
            .from('apps')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            console.error("Error fetching apps:", error);
            return;
        }

        setApps(apps);
        console.log(`Apps ${apps}`)
    };

    useEffect(() => {
        fetchUserApps();
    }, [onRefresh]);

    const addApp = async (name, description, domain, dueDate) => {
        const response = await supabase.auth.getUser();
        const user = response.data.user;
        if (!user) {
            console.error("User not authenticated");
            return null;
        }

        console.log("Inserting:", { user_id: user.id, name, description, domain, due_date: dueDate });
        const { data, error } = await supabase
            .from('apps')
            .insert([{ user_id: user.id, name, description, domain, due_date: dueDate }])
            .single() // Use .single() if you are inserting only one record
            .select('*'); // Select to retrieve the inserted data

        if (error) {
            console.error("Error adding app:", error);
            return null;
        }

        return data;
    };

    const handleSubmit = async (event) => {
        console.log('Clicked')
        event.preventDefault();
        const name = event.target.name.value;
        const description = event.target.description.value;
        const domain = event.target.domain.value;
        const dueDate = event.target.dueDate.value;

        const newApp = await addApp(name, description, domain, dueDate);
        console.log(newApp)
        if (newApp) {
            setApps(currentApps => [...currentApps, newApp]);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            formRef.current.reset();
        }
    };

    const deleteApp = async (appId) => {
        const { error } = await supabase
            .from('apps')
            .delete()
            .match({ id: appId });

        if (error) {
            console.error("Error deleting app:", error);
            return;
        }

        setApps(currentApps => currentApps.filter(app => app.id !== appId));
    };
    
    
  return (
    <div className='test-container'>
    <div className='login-box'>
    <h1 className='test-header'>Connect Application</h1>
    <div className='login-avatar-div'>
        <img src='/avatar.png' width='100'></img>
        </div>
    <form onSubmit={handleSubmit} ref={formRef}>
        <div className='login-email-div'>
    <input type="text" name="name" placeholder="App Name" className='login-input' required />
    </div>
    <div className='login-email-div'>

    <textarea name="description" placeholder="Description" className='login-input textarea-input'></textarea>
    </div>        
    <div className='login-email-div'>

    <input type="text" name="domain" placeholder="Domain" className='login-input' />
    </div>
    <div className='login-email-div'>

    <input type="date" name="dueDate" className='login-input' />
    </div>
    <button type="submit" className='btn btn-primary'>Add App</button>
</form>
{showAlert && <div className="success-alert">App created successfully!</div>}

</div>



             <div className="apps-list">
                {apps && apps.map(app => (
                    <div key={app.id} className="app">
                        <h3>{app.name}</h3>
                        <p>{app.description}</p>
                        <a href={app.domain}>{app.domain}</a>
                        <p>Due Date: {app.due_date}</p>
                        <button onClick={() => deleteApp(app.id)}>Delete</button>

                    </div>
                ))}
            </div>
    </div>
  )
}

export default Test