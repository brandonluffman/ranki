import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import AppForm from './AppDashForm';
import EditForm from './EditForm';
import { IoMdAdd, IoMdClose, IoMdTrash } from 'react-icons/io';
import { BiMessageEdit, BiMessageSquareEdit } from 'react-icons/bi';
import { supabase } from '../utils/supabaseClient';

const AppDashOld = () => {
  const [apps, setApps] = useState([]);
  const [isActive, setActive] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [addingApp, setAddingApp] = useState(null);
  const [user, setUser] = useState('');

    apps && console.log(apps);
  // Fetch apps initially and when there's a change
  useEffect(() => {
    axios.get('/api/apps')
      .then(response => {
        setApps(response.data);
      })
      .catch(error => {
        console.error('Error fetching apps:', error);
      });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data) {
        setUser(data);
        console.log(data)
      } else {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

 
  const toggleEditForm = (app) => {
    setEditingApp(app);
  };
   
  const toggleAddForm = (app) => {
    setAddingApp(app);
  };

  const closeEditForm = () => {
    setEditingApp(null);
  };

  const closeAddForm = () => {
    setAddingApp(null);
  };

  const addApp = newApp => {
    axios.post('/api/create', newApp) // Adjust to your actual API endpoint
      .then(response => {
        // Assuming the response includes the new app data or just the ID
        const addedApp = response.data;
        console.log(addedApp)
        console.log("Before adding:", apps);

        setApps(currentApps => [...currentApps, addedApp]);
        console.log("After adding:", apps);

      })
      .catch(error => console.error('Error adding app:', error));
  };

  const deleteApp = appId => {
    console.log('Deleting')
    axios.delete(`/api/delete?id=${appId}`)
    .then(response => {
      // Remove the app from the state
      setApps(currentApps => currentApps.filter(app => app.id !== appId));
    })
    .catch(error => {
      console.error('Error deleting app:', error);
    });
  };

  const editApp = async (updatedApp) => {
    console.log('updating')
    try {
        const response = await axios.put(`/api/update?id=${updatedApp.id}`, updatedApp);
        const updatedAppData = response.data;
  
      setApps(currentApps => currentApps.map(app => app.id === updatedAppData.id ? updatedAppData : app));
    } catch (error) {
      console.error('Error updating app:', error);
    }
  };

  return (
    <>
      {user?.user ? (
        <div className='dashboard-container appdash-container'>

              <div className='appdash-add-container'>
              <button className='appdash-add-btn' onClick={toggleAddForm}><IoMdAdd /></button>
              </div>
              <div className={addingApp ? 'appdash-add-show' : 'appdash-add-none'}>
              <AppForm onSubmit={addApp} />
              <button onClick={closeAddForm} className='delete-button close-add-form-button'>
                        <IoMdClose />
                      </button>
              </div>
              <h1 className='dashboard-header'>SaaS Dashboard</h1>

              <div className='dashboard-grid appdash-grid'>
              {apps.map((app, index) => ( // index is used only as a fallback
              <li key={app.id || index} className='appdash-item'> {/* Prefer app.id */}
                  <div className='appdash-img-container'>
                {app.logo && <img src={app.logo} className='appdash-grid-img' alt={`${app.name} logo`} />}
                </div>
                  <h2 className='dashboard-grid-header'>{app.name}</h2>
                  {/* <h6 className='dashboard-grid-subheader'>{app.description}</h6> */}
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
                      <button onClick={closeEditForm} className='delete-button close-form-button'>
                        Close
                      </button>
                    </div>
                  )}

              </li>
              ))}
              </div>
              </div>
      ):(
        <div className='dashboard-container appdash-container'>
          No User Found, Log in to view dashboard
          </div>
      )}
</>
  );
}

export default AppDashOld;
