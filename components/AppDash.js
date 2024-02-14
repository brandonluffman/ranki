import React, { useEffect, useContext, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import axios from 'axios';
import AppForm from './AppDashForm';
import EditForm from './EditForm';
import { IoMdAdd, IoMdClose, IoMdTrash } from 'react-icons/io';
import { BiMessageEdit, BiMessageSquareEdit } from 'react-icons/bi';
import { supabase } from '../utils/supabaseClient';
import Loading from './Loading';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import AbsoluteLoading from './AbsoluteLoading';
import { BsThreeDotsVertical } from "react-icons/bs";

const AppDash = ({ onRefresh }) => {
  const [apps, setApps] = useState([]);
  const [editingApp, setEditingApp] = useState(null);
  const [addingApp, setAddingApp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const { user } = useContext(UserContext);
  const router = useRouter(); // Get the router object
  const [threeDot, setThreeDot] = useState(false)

  useEffect(() => {

    const fetchUserApps = async () => {
        setIsLoading(true); // set loading to true when the fetch starts
        try {
          const { data: appsData, error } = await supabase
            .from('apps')
            .select('*')
            .eq('user_id', user.id);
      
          if (error) {
            throw error;
          }
        
          setApps(appsData);
        } catch (error) {
          console.error("Error fetching apps:", error);
          // you might want to show some error message to the user here
        } finally {
          setIsLoading(false); // set loading to false once the fetch is complete
        }
      };



    if (user) {
      fetchUserApps();
    } else {
      console.log('no user')
    }
  }, [user, setIsLoading]);





  

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
  


  // const addApp = async (name, description, domain, industry, target_audience, competitors, current_targeted_keywords, future_keyword_interests, seo_goals, current_content_type, content_objectives) => {
    const addApp = async (name, description, domain) => {

    if (!user) {
      console.error("User not authenticated");
      return null;
    }
  
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('paid_plan_type')
        .eq('auth_id', user.id)
        .single();
  
      if (userError) throw userError;
  
      const planType = userData.paid_plan_type;
      const planLimits = { null: 1, 'Starter': 1, 'Pro': 10, 'Premium': Infinity };
      const appLimit = planLimits[planType];
  
      const { count, error: countError } = await supabase
        .from('apps')
        .select('id', { count: 'exact' })
        .eq('user_id', user.id);
  
      if (countError) throw countError;
  
      if (count >= appLimit) {
        alert(`Your current plan (${planType}) allows up to ${appLimit} app(s).`);
        return null;
      }
  
      const insertResponse = await supabase
        .from('apps')
        // .insert([{ user_id: user.id, name, description, domain, industry, target_audience, competitors, current_targeted_keywords, future_keyword_interests, seo_goals, current_content_type, content_objectives }])
        .insert([{ user_id: user.id, name, description, domain }])

        .single();
  
      if (insertResponse.error) throw insertResponse.error;
  
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: false })
        .limit(1);
  
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Error in addApp:", error);
      alert('An error occurred while adding the app.');
      return null;
    }
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)

    const name = event.target.name.value;
    const domain = formatDomain(event.target.domain.value);
    const description = event.target.description.value;
    // const industry = event.target.industry.value;
    // const target_audience = event.target.target_audience.value;
    // const competitors = event.target.competitors.value;
    // const current_targeted_keywords = event.target.current_targeted_keywords.value;
    // const future_keyword_interests = event.target.future_keyword_interests.value;
    // const seo_goals = event.target.seo_goals.value;
    // const current_content_type = event.target.current_content_type.value;
    // const content_objectives = event.target.content_objectives.value;

    // const newApp = await addApp(name, description, domain, industry, target_audience, competitors, current_targeted_keywords, future_keyword_interests, seo_goals, current_content_type, content_objectives);
    const newApp = await addApp(name, description, domain);

    if (newApp) {
      setApps(currentApps => [...currentApps, newApp]);
      setIsLoading(false)
      setAddingApp(false)
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      formRef.current.reset();
    }
  };

  function formatDomain(domain) {
    if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
      // Prepend "https://" by default or use "http://" based on your requirements
      domain = `https://${domain}`;
    }
    return domain;
  }


  const handleDeleteApp = (appId) => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
        deleteApp(appId);
    }
};

  const deleteApp = async (appId) => {
    try {
      // Handle dependent records in the 'site_urls' table
      // This deletes all records in 'site_urls' that reference the app
      const { error: deleteSiteUrlsError } = await supabase
          .from('site_urls')
          .delete()
          .match({ app_id: appId });
  
      if (deleteSiteUrlsError) {
          throw deleteSiteUrlsError;
      }

      const { error: deleteBlogsError } = await supabase
      .from('blogs') // Replace 'blogs' with your actual table name
      .delete()
      .match({ app_id: appId }); // Replace 'app_id' with the actual column name that relates blogs to apps

  if (deleteBlogsError) {
      throw deleteBlogsError;
  }
  
      // Delete the app from the 'apps' table
      const { error: deleteAppError } = await supabase
          .from('apps')
          .delete()
          .match({ id: appId });
  
      if (deleteAppError) {
          throw deleteAppError;
      }

      
  
      // Update local state to reflect the deletion
      setApps(currentApps => currentApps.filter(app => app.id !== appId));
    } catch (error) {
      console.error("Error in deleting app:", error);
    }
  };
  

  const editApp = async (updatedApp) => {
    // console.log('updating');
    try {
      console.log(updatedApp.id)
        const { data, error } = await supabase
            .from('apps') // Use your actual table name
            .update({ 
                name: updatedApp.name,
                description: updatedApp.description,
                domain: updatedApp.domain
            })
            .match({ id: updatedApp.id });

        if (error) throw error;

        if (data && data.length > 0) {
          setApps(currentApps => 
            currentApps.map(app => 
                app.id === updatedApp.id ? { ...app, ...updatedData } : app
            )
        );

        setEditingApp(null)
        } else {
            console.error('No data returned from the update operation');
            setEditingApp(null)

        }
    } catch (error) {
        console.error('Error updating app:', error);
    }
};


  // apps && console.log(apps)


  return (
    <>
    {/* {isLoading ? (
        <div className='dashboard-container appdash-container'>
          <Loading />
        </div>
    ): */}
     {user?.id ? (
        <div className='dashboard-container appdash-container'>

              <div className='appdash-add-container'>
              <button className={apps.length == 0 ? 'appdash-add-btn glow-btn': 'appdash-add-btn'} onClick={toggleAddForm}><IoMdAdd /></button>
              </div>
              <div className={addingApp ? 'appdash-add-show' : 'appdash-add-none'}>
              {/* <AppForm onSubmit={handleSubmit} /> */}
              <div className='appdash-add-form-box'>
                    <h1 className='appdash-add-header'>Connect Application</h1>
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <div className='login-email-div'>
                            <input type="text" name="name" placeholder="App Name" className='login-input' required />
                        </div>
                        <div className='login-email-div'>
                            <textarea name="description" placeholder="Description" className='login-input textarea-input'></textarea>
                        </div>        
                        <div className='login-email-div domain-div'>
                            <input type="text" name="domain" placeholder="Domain" className='login-input domain-input' />
                        </div>
                        <button type="submit" className='login-button'>Add App</button>
                        {isLoading && <AbsoluteLoading />}
                    </form>

                    <button onClick={toggleAddForm} className='delete-button close-add-form-button'>
                            <IoMdClose />
                    </button>
                </div>

              </div>
              <h1 className='dashboard-header'>Projects</h1>
              {showAlert && <div className="success-alert">App created successfully!</div>}
              <div className='dashboard-grid appdash-grid'>
              {apps.map((app, index) => ( 
              <li key={app.id || index} className='appdash-item'> 
                  <h2 className='dashboard-grid-header appdash-appname'>{app.name}</h2>
                  <Link href={`/dashboard/${app.id}`}><button type='button' className='dash-button dashboard-button'>Dashboard</button></Link>
                <br></br>
                {/* <button onClick={() => handleDeleteApp(app.id)} className='dash-button delete-button'>
                  <IoMdClose />
                  </button> */}


                {/* <button onClick={() => handleToggle(app.id)} className='three-dot'><BsThreeDotsVertical /></button> */}
                {/* {threeDot && 
                <div className='editing-function-container'>
                <button onClick={() => handleDeleteApp(app.id)} className='dash-button delete-button'>
                  <IoMdTrash />
                  </button>
                  <button onClick={() => toggleEditForm(app)} className='dash-button edit-button'>
                    <BiMessageEdit />
                  </button>
                  </div>
                  } */}
                  {editingApp && editingApp.id === app.id && (
                    <div className='edit-form'>
                      <EditForm appData={editingApp} onSubmit={editApp} />
                      <button onClick={() => setEditingApp(null)} className='delete-button close-form-button'>
                        <IoMdClose />
                      </button>
                    </div>
                  )}
              

              </li>
              ))}
              </div>
              </div>
      ):(
        <div className='dashboard-container appdash-container no-user-container'>
          <div className='anti-flexer nouserflexer'>
          <h3 className='no-user-header'>Project Dashboard</h3>
          <Link href='/generatetest'><button type='button' className='margin-btm btn btn-tertiary btn-margin'>Try it for free</button></Link>
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



         {/* <h6 className='dashboard-grid-subheader'>{app.domain}</h6> */}
                  {/* <img src='/chatbot.png' className='appdash-grid-img' alt={app.name} /> */}
                  {/* <p>{app.domain}</p> */}



                          {/* <div className='appdash-img-container'>
                {app.logo && <img src={app.logo} className='appdash-grid-img' alt={`${app.name} logo`} />}
                </div> */}


  
        //         <form onSubmit={handleSubmit} ref={formRef}>
        //         <div className='login-email-div'>
        //           <input type="text" name="name" placeholder="App Name" className='login-input' required />
        //         </div>
        //         <div className='login-email-div'>
        //           <textarea name="description" placeholder="Describe your business (include main products/services)" className='login-input textarea-input'></textarea>
        //         </div>      
        //           <div className='login-email-div'>
        //           <input type="text" name="industry" placeholder="Business Industry" className='login-input' required />
        //         </div>  
        //         <div className='login-email-div'>
        //           <textarea name="target_audience" placeholder="Who is your target audience? (Be as descriptive in regards to demographics)" className='login-input textarea-input'></textarea>
        //         </div>  
        //         <div className='login-email-div'>
        //           <textarea name="competitors" placeholder="Who are your main competitors?" className='login-input textarea-input'></textarea>
        //         </div> 
        //         <div className='login-email-div'>
        //           <textarea name="current_targeted_keywords" placeholder="What keywords are you currently targeting?" className='login-input textarea-input'></textarea>
        //         </div> 
        //         <div className='login-email-div'>
        //           <textarea name="future_keyword_interests" placeholder="Which would you like to target?" className='login-input textarea-input'></textarea>
        //         </div> 
        //         <div className='login-email-div'>
        //           <textarea name="seo_goals" placeholder="What are your SEO goals? (Increase Traffic, Improve Ranking, etc..)" className='login-input textarea-input'></textarea>
        //         </div>
        //           <div className='login-email-div'>
        //           <textarea name="current_content_type" placeholder="What content have you already published?" className='login-input textarea-input'></textarea>
        //         </div>
        //         <div className='login-email-div'>
        //           <textarea name="content_objectives" placeholder="What are your objectives? (Brand awareness, leads, sales)" className='login-input textarea-input'></textarea>
        //         </div>
        //         <div className='login-email-div domain-div'>
        //           <input type="text" name="domain" placeholder="Domain" className='login-input domain-input' />
        //         </div>




        //     <button type="submit" className='login-button'>Add App</button>
        //     {isLoading && <AbsoluteLoading />}
        // </form>