import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/Blog/BlogList';
import BlogForm from './components/Blog/BlogForm';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import "../src/styles.css";

const App = () => {
    return (
        <Router>
            <header>
                <h1>Blog Management System</h1>
                <nav className="navbar">
                    <a href="/">Home</a>
                    <a href="/signup">Sign Up</a>
                    <a href="/login">Login</a>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-blog" element={<BlogForm />} />
                <Route path="/edit/:id" element={<BlogForm />} />
            </Routes>
        </Router>
    );
};

export default App;
