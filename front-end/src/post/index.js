import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Link } from 'react-router-dom';


const Post = () => {

    const postIdMatch = window.location.href.match(/\/(myPage|page|dashboard)\/post\/(\d+)/);
    const postId = postIdMatch ? postIdMatch[2] : null;
    const [currentUsername, setCurrentUsername] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [post, setPost] = useState("");
    const [formattedDate, setFormattedDate] = useState(null);
    const [images, setImages] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if(jwt) {
            const tokenParts = jwt.split('.');
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                setCurrentUsername(payload.sub);
            }
        }
    }, [jwt]);

    useEffect(() => {
        fetch(`/api/posts/${postId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
        .then(response => {
            if(response.status === 200) return response.json();
        })
        .then(postData => {
            //console.log(postData);
            setPost(postData);
            setFormattedDate(new Date(postData.publishDate).toLocaleString());
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar el error, por ejemplo, mostrando un mensaje de error al usuario
        });
    }, []);
    
    useEffect(() => {
        fetch(`/api/images/${postId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
        .then(response => {
            if(response.status === 200) return response.json();
        })
        .then(imageData => {
            //console.log(imageData);
            setImages(imageData);
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar el error, por ejemplo, mostrando un mensaje de error al usuario
        });
    }, []);

    const deleteAction = () => {

        fetch(`/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            method: "DELETE",
        })
        .then(response => {
            if(response.status === 200) return response.json();
        })
        .then(window.location.href = `/page/${currentUsername}`)
        .catch(error => {
            console.error('Error:', error);
        });

    }

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
                            <h2 className="card-title">By: <Link to={`/profile/${post.user.username}`}>{currentUsername === post.user.username ? ("You") : (post.user.username)}</Link></h2>
                            <h6 className="card-subtitle mb-2 text-muted">Publish Date: {formattedDate}</h6>
                            <hr className="my-2"></hr>
                            <p className="text-container">{post.text}</p>
                            <hr className="my-2"></hr>
                            
                            {images.length > 0 && (
                                <div>
                                    {images.map((image, index) => (
                                        <div key={index} className="mb-2 image-container-post">
                                            <img src={`data:image/jpeg;base64,${image.datos}`} alt={`Image ${index}`} style={{ width: 'auto', height: '224px'}} />
                                        </div>
                                    ))}
                                    <hr className="my-1"></hr>
                                </div>
                            )}
                            <p className="card-text">#{post.hashtags}</p>

                            {currentUsername === post.user.username && (
                                <div>
                                    <hr className="my-1"></hr>
                                    <button className="btn btn-primary" type="button" style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}>Edit</button>
                                    <button className="btn btn-danger" type="button"
                                            style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}
                                            onClick={() => deleteAction()}>Delete
                                    </button>
                                </div>
                            )}

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
