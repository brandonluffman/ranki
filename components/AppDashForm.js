import React, { useState, useEffect } from 'react';

const AppForm = ({ appData, onSubmit }) => {
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
      setApp({ name: '', description: '' }); // Reset form after submission
    };

    return (
      <form onSubmit={handleSubmit} className='appdash-form'>
        <h2 className='appdash-form-header'>Add an App</h2>
        <input
          type="text"
          name="name"
          value={app.name}
          onChange={handleChange}
          placeholder="Project Name"
          required
          className='appdash-input'
        />
        <input
          type="text"
          name="domain"
          value={app.domain}
          onChange={handleChange}
          placeholder="Domain"
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
        {showAlert && <div className="success-alert">App created successfully!</div>}

      </form>
    );
};

export default AppForm;
