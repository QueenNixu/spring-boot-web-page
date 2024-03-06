import React, { useState, useEffect } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Card } from 'react-bootstrap';

const Dashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    const[posts, setPosts] = useState(null);

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
        //console.log(post);
        setPosts(post);
    });
    }, []);

    return (
        <div>
            <div className="container">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Dashboard</h1>
                    <p className="lead">Explore other user's clips, scores, builds, ranks, opinions... make friends! or <a href="/myPage/publish" className="btn btn-primary" role="button">Post something!</a></p>
                    <hr className="my-4"/>
                    {posts ? (
                        posts.map((post, index) => (
                            <a key={post.id} href={ jwt ? `/myPage/post/${post.id}` : `/dashboard/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Card className="post-card" style={{ marginBottom: index !== posts.length - 1 ? '20px' : 0 }}>
                                    <Card.Body>
                                        <Card.Title>Title: {post.title}</Card.Title>
                                        <Card.Subtitle> By: {post.user.username}</Card.Subtitle>
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

export default Dashboard;