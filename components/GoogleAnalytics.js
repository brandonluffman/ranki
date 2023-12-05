// In a component or page
import React, { useEffect, useState } from 'react';

const AnalyticsComponent = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//         console.log('Made it x1')
//       const response = await fetch('/api/hello');
//       console.log('Tried')
//       const data = await response.json();
//       setAnalyticsData(data);
//     };

//     fetchData();
//   }, []);

useEffect(() => {
    fetch('/api/analytics')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}, []);
// useEffect(() => {
//     fetch('/api/searchConsole')
//     .then(response => {
//         if (response.headers.get("content-type").includes("application/json")) {
//           return response.json();
//         } else {
//           throw new Error('Not a JSON response');
//         }
//       })
//       .then(data => {
//         // Process JSON data here
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
  
//     // fetchData();
//   }, []);
  return (
    <div>
      <h1>Google Analytics Data</h1>
      <ul>
        {/* {analyticsData.map((item, index) => (
          <li key={index}>City: {item.city}, Active Users: {item.activeUsers}</li>
        ))} */}
        <li>Hello</li>
      </ul>
    </div>
  );
};

export default AnalyticsComponent;
