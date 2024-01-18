import React, { useState, useRef } from 'react';

const FileDropZone = ({ onFileUpload, handleImageChange }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      onFileUpload(files[0]); // Assuming single file upload
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div 
    className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
  >
    Drag and drop a file here, or click to select a file
    <input
      type="file"
      onChange={(e) => {
        handleImageChange(e);
        onFileUpload(e.target.files[0]);
      }}
      style={{ display: 'none' }}
    />
  </div>
  );
};

export default FileDropZone;
