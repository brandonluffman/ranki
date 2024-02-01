import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import TextEditor from './TextEditor';
import { supabase } from '../utils/supabaseClient';

const BlogEditForm = ({ blog, toggle, submitForm }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editedContent, setEditedContent] = useState('')
    const [metaDescription, setMetaDescription] = useState('');
    const [loading, setLoading] = useState(false);


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

    const handlePublish = async () => {
        if (blog && blog.is_published) {
            alert('This blog is already published.');
            return;
        }
    
        setLoading(true); // Assuming you have a loading state
    
        try {
            const { data, error } = await supabase
                .from('blogs')
                .update({ is_published: true }) // Setting is_published to true
                .eq('id', blog.id); // Assuming your blog has an id field
    
            if (error) {
                throw new Error(error.message);
            }
    
            if (data) {
                console.log('Blog published successfully:', data);
                alert('Blog published successfully!');
                // Update local state to reflect the change, if necessary
                blog.is_published = true; // Be careful with directly mutating state like this
                // It might be better to fetch the blog again or use a state updater function
            }
        } catch (error) {
            console.error('Error publishing blog:', error);
            alert('Failed to publish the blog. Please try again.');
        } finally {
            setLoading(false); // Assuming you have a loading state
        }
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
                <button type="button" className='btn btn-tertiary btn-margin blogpost-publish-btn' onClick={handlePublish}>Publish</button>

            </form>
        </div>
    )
}

export default BlogEditForm;
