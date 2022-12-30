import React, { useState } from 'react'
import styles from './layout.module.css';
import Router from 'next/router';

function FormBlog() {
    const [formContent, setformContent] = useState({
        title: '',
        content: '',
    })

    const handleChange= (e) => {
        setformContent((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/hello', {
            method: 'POST',
            body: JSON.stringify({
                title: formContent.title,
                content: formContent.content,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json()).then(result => console.log(result)).catch(err => console.log(err));
        setformContent({
            title: '',
            content: '',
        })
        Router.push('/');
    }

    return (
        <div className={styles.createBlog}>
            <h2>Create a Blog</h2>
            <form onSubmit={handleSubmit} action="/">
                <label htmlFor="title">Tell us your Title:</label>
                <input type="text" name="title" className={styles.title} value={formContent.title} onChange={handleChange} placeholder="Enter the blog title" />
                <label htmlFor="content">Tell us your story:</label>
                <textarea className={styles.textarea} name="content" value={formContent.content} onChange={handleChange} rows="20" cols="100">
                    Tell us your story...
                </textarea>
                <input type="submit" className={styles.submit} value="Submit" />
            </form>
        </div>
    )
}

export default FormBlog