import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const Generate = () => {
    const { user } = useContext(UserContext);

  return (
    <div className="generate-container">
    <h1 className="generate-header">Generate your SEO-Optimized Article</h1>
    </div>
  )
}

export default Generate