import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import TextEditor from './TextEditor';

const BlogEditForm = ({ blog, toggle, submitForm }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editedContent, setEditedContent] = useState('')
    const [metaDescription, setMetaDescription] = useState('');


    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setEditedContent(blog.content);
            setMetaDescription(blog.meta_description);
            // console.log(blog)
        } else {
            // console.log('No Blog')
        }
    }, [blog]);

    const handleEditorChange = (newContent) => {
        setEditedContent(newContent);
    };



    return (
        <div className='blog-edit-container'>
            <h2 className='blog-add-header'>Blog Editor</h2>
            
            <button className='close-btn blog-edit-close' type='button' onClick={toggle}><IoMdClose /></button>
            <form onSubmit={submitForm} className='blog-edit-form'>
                <div className='antiflexer'>
                <label className='generate-label blog-edit-title-label'>Title</label>
                <input 
                    type='text' 
                    className='blog-edit-input' 
                    name='title' 
                    placeholder='Title' 
                    required 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                </div>

                <div className='antiflexer'>
                <label className='generate-label blog-edit-title-label'>Meta Description</label>
                <input 
                    type='text' 
                    className='blog-edit-input' 
                    name='metaDescription' 
                    placeholder='Meta Description' 
                    required 
                    value={metaDescription}
                    onChange={e => setMetaDescription(e.target.value)}
                />
                </div>
                {/* <textarea 
                    className='blog-edit-input' 
                    name='content' 
                    placeholder='Content' 
                    required 
                    value={content}
                    onChange={e => setContent(e.target.value)}
                /> */}
                 <TextEditor value={editedContent} onChange={handleEditorChange} />
                <button type='submit' className='btn btn-primary blogpost-edit-btn'>Save Changes</button>
            </form>
        </div>
    )
}

export default BlogEditForm;
