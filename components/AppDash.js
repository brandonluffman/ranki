import React, { useEffect, useContext, useState, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import AppForm from './AppDashForm';
import EditForm from './EditForm';
import { IoMdAdd, IoMdClose, IoMdTrash } from 'react-icons/io';
import { BiMessageEdit, BiMessageSquareEdit } from 'react-icons/bi';
import { supabase } from '../utils/supabaseClient';
import Loading from './Loading';
import { UserContext } from '../context/UserContext';

const AppDash = ({ onRefresh }) => {
  const [apps, setApps] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [addingApp, setAddingApp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const { user, login, logout } = useContext(UserContext);


  const fetchUserApps = async () => {
    if (!user) {
      console.error("User not authenticated");
      setIsLoading(false);
      return;
    }
  
    setIsLoading(true);
    const cachedApps = localStorage.getItem(`userApps_${user.id}`);
    
    if (cachedApps) {
      // If there is cached data, use it
      setApps(JSON.parse(cachedApps));
      setIsLoading(false);
    } else {
      // If there is no cached data, fetch from the API
      try {
        const { data: apps, error } = await supabase
          .from('apps')
          .select('*')
          .eq('user_id', user.id);
  
        if (error) throw error;
        setApps(apps);
        localStorage.setItem(`userApps_${user.id}`, JSON.stringify(apps)); // Cache the fetched data
      } catch (error) {
        console.error("Error fetching apps:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  useEffect(() => {

    fetchUserApps();
  }, [user, onRefresh]);



  const toggleAddForm = () => {
    setAddingApp(!addingApp);
  };

  const toggleEditForm = (app) => {
    if (editingApp && editingApp.id === app.id) {
      setEditingApp(null); // Close the form if it's the same app
    } else {
      setEditingApp(app); // Set the new app to edit
    }
  };
  


  const addApp = async (name, description, domain) => {
    if (!user) {
      console.error("User not authenticated");
      return null;
    }
  
    try {
      // Call the API route to check the domain status
      const checkDomainResponse = await fetch(`/api/checkDomain?domain=${encodeURIComponent(domain)}`);
      const checkDomainResult = await checkDomainResponse.json();
  
      if (!checkDomainResponse.ok) {
        alert(checkDomainResult.error || 'Error checking domain status');
        return null;
      }
  
      // Insert a new app into the database
      const insertResponse = await supabase
        .from('apps')
        .insert([{ user_id: user.id, name, description, domain }])
        .single();
  
      if (insertResponse.error) throw insertResponse.error;
  
      // Fetch the most recently added app
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: false })
        .limit(1);
  
      if (error) throw error;
      return data[0]; // Get the most recently added app
    } catch (error) {
      alert('Your Domain wasn\'t received by our servers, please try another domain or check yours to make sure it is up.');
      console.error("Error in addApp:", error);
      return null;
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;
    const domain = event.target.domain.value;
    console.log('Finding New App......')
    const newApp = await addApp(name, description, domain);
    console.log('Found New App!')
    if (newApp) {
      console.log('Made it through the loop')
      // Update apps state directly with the new app
      setApps(currentApps => [...currentApps, newApp]);
      console.log('Supposed to show alert?')
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      formRef.current.reset();
  
      // Optionally, re-fetch all apps
      // fetchUserApps();
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

  const editApp = async (updatedApp) => {
    console.log('updating');
    try {
        const { data, error } = await supabase
            .from('apps') // Use your actual table name
            .update({ 
                name: updatedApp.name,
                description: updatedApp.description,
                domain: updatedApp.domain
            })
            .match({ id: updatedApp.id });

        if (error) throw error;

        setApps(currentApps => 
            currentApps.map(app => 
                app.id === updatedApp.id ? { ...app, ...data[0] } : app
            )
        );
    } catch (error) {
        console.error('Error updating app:', error);
    }
};


  return (
    <>
    {isLoading ? (
        <div className='dashboard-container appdash-container'>
          <Loading />
        </div>
    ): user ? (
        <div className='dashboard-container appdash-container'>

              <div className='appdash-add-container'>
              <button className='appdash-add-btn' onClick={toggleAddForm}><IoMdAdd /></button>
              </div>
              <div className={addingApp ? 'appdash-add-show' : 'appdash-add-none'}>
              {/* <AppForm onSubmit={handleSubmit} /> */}
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

                    <input type="text" name="domain" placeholder="Domain" className='login-input domain-input' />
                    </div>
                    <button type="submit" className='btn btn-primary'>Add App</button>
                </form>
                {showAlert && <div className="success-alert">App created successfully!</div>}
                <button onClick={toggleAddForm} className='delete-button close-add-form-button'>
                        <IoMdClose />
                      </button>
                </div>
           
              </div>
              <h1 className='dashboard-header'>Web Dashboard</h1>

              <div className='dashboard-grid appdash-grid'>
              {apps.map((app, index) => ( // index is used only as a fallback
              <li key={app.id || index} className='appdash-item'> {/* Prefer app.id */}
                  <div className='appdash-img-container'>
                {/* {app.logo && <img src={app.logo} className='appdash-grid-img' alt={`${app.name} logo`} />} */}
                </div>
                  <h2 className='dashboard-grid-header'>{app.name}</h2>
                  {/* <h6 className='dashboard-grid-subheader'>{app.domain}</h6> */}
                  {/* <img src='/chatbot.png' className='appdash-grid-img' alt={app.name} /> */}
                  {/* <p>{app.domain}</p> */}
                  <Link href={`/dashboard/${app.id}`}><button type='button' className='dash-button dashboard-button'>Dashboard</button></Link>

                <br></br>
                <button onClick={() => deleteApp(app.id)} className='dash-button delete-button'>
                  <IoMdTrash />
                  </button>
                  <button onClick={() => toggleEditForm(app)} className='dash-button edit-button'>
                    <BiMessageEdit />
                  </button>
                  {editingApp && editingApp.id === app.id && (
              <div className='edit-form'>
                <EditForm appData={editingApp} onSubmit={editApp} />
                <button onClick={() => setEditingApp(null)} className='delete-button close-form-button'>
                  Close
                </button>
              </div>
            )}

              </li>
              ))}
              </div>
              </div>
      ):(
        <div className='dashboard-container appdash-container no-user-container'>
          <div className='anti-flexer'>
          <h3>No User Found, Log in to view dashboard</h3>
          <Link href='/login'><button type='button' className='login-btn btn btn-primary'>Login</button></Link>
          </div>
          </div>
      )}  
</>
  );
}

export default AppDash;








// const fetchGA4Data = async () => {
//   console.log('running')
//   try {
//       const response = await axios.get('/api/analytics');
//       // const response = await axios.get('/api/hello');

//       // console.log(`Response from Google Analytics: ${response}`)
//       console.log(response)

//       // Process the GA4 data
//   } catch (error) {
//       console.error('Error fetching GA4 data:', error);
//   }
// };

// useEffect(() => {
//   fetchGA4Data();
// }, []);
