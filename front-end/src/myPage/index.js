import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const MyPage = () => {

    const navigate = useNavigate();

    const [jwt, setJwt] = useLocalState("", "jwt");

    const[posts, setPosts] = useState(null);

    useEffect(() => {
        fetch("/api/posts", {
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
                            <Card key={post.id} className="post-card" style={{ marginBottom: index !== posts.length - 1 ? '20px' : 0 }}>
                                <Card.Body>
                                    <Card.Title>Title: {post.title}</Card.Title>
                                    <Card.Text>{post.text}</Card.Text>
                                    <Card.Text>#: {post.hashtags}</Card.Text>
                                    <Button className="btn btn-primary me-2" href={`/myPage/post/${post.id}`}>Ver</Button>
                                    {/* <Button className="btn btn-secondary me-2" href={`/myPage/post/${post.id}`}>Edit</Button>
                                    <Button className="btn btn-danger me-2" href={`/myPage/post/${post.id}`}>Delete</Button> */}
                                </Card.Body>
                            </Card>
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