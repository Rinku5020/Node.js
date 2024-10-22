import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/blogs/posts/${id}`, {
                        withCredentials: true,  // Include credentials for cookie-based auth
                    });
                    setTitle(response.data.data.title);
                    setContent(response.data.data.content);
                    setIsEditing(true);
                } catch (error) {
                    console.error('Error fetching post:', error.response ? error.response.data : error.message);
                }
            };
            fetchPost();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content };

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/blogs/posts/${id}`, postData, {
                    withCredentials: true,  
                });
            } else {
                await axios.post('http://localhost:5000/api/blogs/posts', postData, {
                    withCredentials: true,  
                });
            }
            navigate('/');  // Navigate to the posts list after submission
        } catch (error) {
            console.error('Error submitting post:', error.response ? error.response.data : error.message);
            // Optionally, display a user-friendly message here
        }
    };

    return (
        <div className="container">
            <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="form-control"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit" className="button">{isEditing ? 'Update Post' : 'Create Post'}</button>
            </form>
        </div>
    );
};

export default BlogForm;
