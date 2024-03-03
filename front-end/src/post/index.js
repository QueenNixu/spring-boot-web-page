import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Post = () => {

    const postId = window.location.href.split("/myPage/post/")[1];
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [post, setPost] = useState("");
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        fetch(`/api/posts/${postId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(response => {
            if(response.status === 200) return response.json();
        })
        .then(postData => {
            console.log(postData);
            setPost(postData);
            setFormattedDate(new Date(postData.publishDate).toLocaleString());
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar el error, por ejemplo, mostrando un mensaje de error al usuario
        });
    }, []);

    return (
        <div className="container">
            {post === "" ? (
                <div className="alert alert-info mt-4" role="alert">
                    Loading...
                </div>
            ) : post !== null ? (
                <div>
                    <div className="card mt-5 mb-2">
                        <div className="card-body">
                            <h1 className="mt-1">{post.title}</h1>
                            <h2 className="card-title">By: {post.user.username}</h2>
                            <h6 className="card-subtitle mb-2 text-muted">Publish Date: {formattedDate}</h6>
                            <hr className="my-2"></hr>
                            <p className="card-text">{post.text}</p>
                            <hr className="my-2"></hr>
                            <p className="card-text">{post.hashtags}</p>
                            <hr className="my-1"></hr>
                            
                            {post.imagesUrl.map((imageUrl, index) => (
                                <div key={index} className="mb-3 image-container-post">
                                    <img src={imageUrl} alt={`Image ${index}`} style={{ width: 'auto', maxHeight: '224px'}} />
                                    <p>{imageUrl}</p>
                                </div>
                            ))}

                            <hr className="my-1"></hr>
                            <button className="btn btn-primary" type="button" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}>Edit</button>
                            <button className="btn btn-danger" type="button" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}>Delete</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-dark mt-4" role="alert">
                    The post with id {postId} does not exist or has been deleted.
                </div>
            )}
        </div>
    );
    
    
    
    
    
};

export default Post;