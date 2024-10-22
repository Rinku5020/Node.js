import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('http://localhost:5000/api/blogs/posts');
            setPosts(response.data);
            console.log(response.data.data)
        };
        fetchPosts();
    }, []);

    return (
        <div className="container">
            <h2>Blog Posts</h2>
            <Link to="/create-blog" className="button">Create New Post</Link>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                Array.isArray(posts) && posts.map((post) => (
                    <div key={post._id} className="blog-post">
                        <h3>{post.title}</h3>
                        <p>By: {post.author}</p>
                        <p>{post.content}</p>
                        <Link to={`/edit/${post._id}`} className="button">Edit</Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default BlogList;
