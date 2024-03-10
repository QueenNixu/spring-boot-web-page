import React, { useState, useEffect } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Card } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode'; // Importar la función jwtDecode

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch("/api/posts/all", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
        .then(response => {
            if(response.status === 200) return response.json();
        })
        .then(post => {
            setPosts(post);
        });
    }, []);

    const isTokenValid = () => {
        if (!jwt) return false; // Si no hay JWT, retorna false

        const decodedToken = jwtDecode(jwt); // Decodifica el token JWT
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

        return decodedToken.exp > currentTimeInSeconds; // Retorna true si el token no ha expirado
    };

    return (
        <div>
            <div className="container">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Dashboard</h1>
                    <p className="lead">Explore other user's clips, scores, builds, ranks, opinions... make friends! or <a href="/publish" className="" role="button" style={{ textDecoration: "none" }}>Post something!</a></p>
                    <hr className="my-4"/>
                    {posts ? (
                        posts.map((post, index) => {
                            // Decodificar el token JWT para obtener el nombre de usuario (sub)
                            const decodedToken = jwt ? jwtDecode(jwt) : null;
                            const username = decodedToken ? decodedToken.sub : null;

                            // Verificar si el usuario actual es el propietario del post
                            const isOwner = post.user.username === username;

                            // Construir la URL del enlace basada en si el usuario es propietario del post
                            const postLink = isOwner ? `/dashboard/post/${post.id}` : `/dashboard/post/${post.id}`;

                            return (
                                <a key={post.id} href={postLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card className={isOwner && isTokenValid() ? "post-card-owner" : "post-card"} style={{ marginBottom: index !== posts.length - 1 ? '20px' : 0 , maxHeight: "150px", minHeight: "150px", overflow: "hidden"}}>
                                        <Card.Body>
                                            <Card.Title>Title: {post.title}</Card.Title>
                                            <Card.Subtitle><a className="card-hashtag" style={{ color: "black" }} href={`/profile/${post.user.username}`}>By: {isOwner && isTokenValid() ? "You" : post.user.username}</a></Card.Subtitle>
                                            <Card.Text>
                                                {post.hashtags.split(" ").map((hashtag, index) => (
                                                    <a className='card-hashtag' href={`/dashboard/${hashtag}`} key={index}>#{hashtag} </a>
                                                ))}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </a>
                            );                            
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
