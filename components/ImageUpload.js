// components/ImageUploadTest.js
import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('No image selected');
      return;
    }

    try {
    //   const fileExt = image.name.split('.').pop();
    //   const fileName = `${Date.now()}.${fileExt}`;
    //   console.log(fileName)
      let { error } = await supabase.storage
        .from('blogimages')
        .upload(image.name, image);

      if (error) throw error;

      alert('Upload successful');
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
