import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Page = () => {

    //const navigate = useNavigate();

    const [jwt, setJwt] = useLocalState("", "jwt");
    const { username } = useParams(); // Obtener el nombre de usuario de la URL
    const[posts, setPosts] = useState(null);
    const [currentUsername, setCurrentUsername] = useState("");

    const isTokenValid = () => {
        if (!jwt) return false; // Si no hay JWT, retorna false

        const decodedToken = jwtDecode(jwt); // Decodifica el token JWT
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

        return decodedToken.exp > currentTimeInSeconds; // Retorna true si el token no ha expirado
    };

    useEffect(() => {
        if(currentUsername === username && isTokenValid()) window.location.href="/myPage";
    }, [currentUsername, username]);
    

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
        fetch(`/api/posts/user/${username}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
        .then(response => {
            if(response.status === 200) return response.json();
        })
    .then(post => {
        //console.log(post);
        setPosts(post);
    });
    }, []);

    return (
        <div>
            <div className="container">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">{username}'s page</h1>
                    <p className="lead">Coffee? ¡We love coffee!</p>
                    <hr className="my-4"/>
                    {/* //mostrar si el usuario es el dueño */}
                    {currentUsername === username ? (
                        <div>
                            <a href="/publish" className="btn btn-primary" role="button">Post something!</a>
                            <hr className="my-4"/>
                        </div>
                    ) : (
                        <></>
                    )}

                    {posts ? (
                        posts.map((post, index) => (
                            <a key={post.id} href={currentUsername === post.user.username ? `/myPage/post/${post.id}` : `/dashboard/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Card className="post-card" style={{ marginBottom: index !== posts.length - 1 ? '20px' : 0 }}>
                                    <Card.Body>
                                        <Card.Title>Title: {post.title}</Card.Title>
                                        <Card.Text>#: {post.hashtags}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </a>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;