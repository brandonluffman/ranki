import React, { useState, useEffect } from 'react';

const EditForm = ({ appData, onSubmit, id }) => {
    const [app, setApp] = useState({ name: '', description: '', domain: '', logo: '' });

    useEffect(() => {
      if (appData) {
        setApp(appData);
      }
    }, [appData]);
  
    const handleChange = e => {
      setApp({ ...app, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      onSubmit(app);
      // Optionally reset form after submission, or close the form
    };

    return (
      <form onSubmit={handleSubmit} className='appdash-form'>
        <h2 className='appdash-form-header'>Edit an App</h2>
        <input
          type="text"
          name="name"
          value={app.name}
          onChange={handleChange}
          placeholder="App Name"
          required
          className='appdash-input'
        />
        <input
          type="text"
          name="domain"
          value={app.domain}
          onChange={handleChange}
          placeholder="App Domain"
          required
          className='appdash-input'
        />
        <textarea
          name="description"
          value={app.description}
          onChange={handleChange}
          placeholder="App Description"
          required
          className='appdash-input appdash-description'

        />
        <br></br>
        <button type="submit" className='btn btn-primary appdash-form-btn'>Submit</button>
      </form>
    );
};

export default EditForm;
