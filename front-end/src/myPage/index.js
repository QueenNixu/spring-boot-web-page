import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Card, Button } from 'react-bootstrap';

const MyPage = () => {

    //const navigate = useNavigate();

    const [jwt, setJwt] = useLocalState("", "jwt");

    const[posts, setPosts] = useState(null);

    useEffect(() => {
        fetch("/api/posts/user", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
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
                    <h1 className="display-4">My Page</h1>
                    <p className="lead">Coffee? ¡We love coffee!</p>
                    <hr className="my-4"/>
                    <a href="/myPage/publish" className="btn btn-primary" role="button">Post something!</a>
                    <hr className="my-4"/>
                    {posts ? (
                        posts.map((post, index) => (
                            <a key={post.id} href={`/myPage/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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

export default MyPage;