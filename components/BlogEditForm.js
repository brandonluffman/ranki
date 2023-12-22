import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

const BlogEditForm = ({ blog, toggle, submitForm }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            console.log(blog)
        } else {
            console.log('No Blog')
        }
    }, [blog]);

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert('Just submitted. Sike, this is a placeholder.');
    //     // Here, handle the actual update logic
    // }

    return (
        <div className='blog-edit-container'>
            <h2 className='blog-add-header'>Blog Editor</h2>
            
            <button className='close-btn' type='button' onClick={toggle}><IoMdClose /></button>
            <form onSubmit={submitForm} className='blog-edit-form'>
                <input 
                    type='text' 
                    className='blog-edit-input' 
                    name='title' 
                    placeholder='Title' 
                    required 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                    className='blog-edit-input' 
                    name='content' 
                    placeholder='Content' 
                    required 
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button type='submit' className='btn btn-primary blogpost-edit-btn'>Publish</button>
            </form>
        </div>
    )
}

export default BlogEditForm;
