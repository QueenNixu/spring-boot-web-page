import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';

const MyProfile = () => {

    const [userData, setUserData] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [username, setUsername] = useState("");
    const [topPost, setTopPost] = useState([]);

    useEffect(() => {
        if(jwt) {
            const tokenParts = jwt.split('.');
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                setUsername(payload.sub);
            }
        }
    }, [jwt]);

    useEffect(() => {
        if(username) {
            fetch(`/api/user/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                },
                method: "GET",
            })
            .then(response => {
                if(response.status === 200) return response.json();
            })
            .then(data => {
                setUserData(data);
            });
        }
    }, [username, jwt]);

    useEffect(() => {
        if(jwt) {
            fetch(`/api/posts/topPost`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                },
                method: "GET",
            })
            .then(response => {
                if(response.status === 200) return response.json();
            })
            .then(topPostData => {
                //console.log(topPostData);
                setTopPost(topPostData);
            });
        }
    }, [jwt]);

    return (
        <div>
            {userData ? (
                <div className="container">
                    <div className="jumbotron mt-5">
                        <h1 className="display-4">Profile</h1>
                        <p className="lead">Personalized text</p>
                        <hr className="my-4"></hr>
                        {/* mostrar datos de usuario */}
                        <div className="card mb-3" style={{maxWidth: "100%"}}>
                            <div className="row g-0">
                                <div className="col-md-3">
                                    <img src="/testImages/charlie.jpg" className="img-fluid rounded-circle mx-2 my-2" alt="Profile picture" />
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body">
                                        <h2 className="card-title">{userData.username}</h2>
                                        <p className="card-text">{userData.intro}</p>
                                        <p className="card-text"><small className="text-body-secondary">Likes: {userData.likedTopics}</small></p>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>

                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            {/* Verificar si el primer post existe */}
                            <div class="col">
                                {topPost[0] ? (
                                    // Si el primer post existe, mostrar la card con sus detalles
                                    <div class="card h-100" style={{ minHeight: "500px", maxHeight: "500px" }}>
                                        <img src="/testImages/charlie.jpg" class="card-img-top" style={{ maxHeight: "200px", objectFit: "cover" }} alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{topPost[0].title}</h5>
                                            <p className="card-text overflow-hidden" style={{ maxHeight: "150px" }}>
                                                {topPost[0].text}
                                            </p>...
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-body-secondary">#: {topPost[0].hashtags}</small>
                                        </div>
                                    </div>
                                ) : (
                                    // Si el primer post no existe, mostrar una card vacía
                                    <div class="card h-100 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "500px", maxHeight: "500px" }}>
                                        <div class="text-body-secondary">No more post to see.</div>
                                    </div>
                                )}
                            </div>

                            {/* Verificar si el segundo post existe */}
                            <div class="col">
                                {topPost[1] ? (
                                    // Si el segundo post existe, mostrar la card con sus detalles
                                    <div class="card h-100" style={{ minHeight: "500px", maxHeight: "500px" }}>
                                        <img src="/testImages/charlie.jpg" class="card-img-top" style={{ maxHeight: "200px", objectFit: "cover" }} alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{topPost[1].title}</h5>
                                            <p className="card-text overflow-hidden" style={{ maxHeight: "150px" }}>
                                                {topPost[1].text}
                                            </p>...
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-body-secondary">#: {topPost[1].hashtags}</small>
                                        </div>
                                    </div>
                                ) : (
                                    // Si el segundo post no existe, mostrar una card vacía
                                    <div class="card h-100 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "500px", maxHeight: "500px" }}>
                                        <div class="text-body-secondary">No more post to see.</div>
                                    </div>
                                )}
                            </div>

                            {/* Verificar si el tercer post existe */}
                            <div class="col">
                                {topPost[2] ? (
                                    // Si el tercer post existe, mostrar la card con sus detalles
                                    <div class="card h-100" style={{ minHeight: "500px", maxHeight: "500px" }}>
                                        <img src="/testImages/charlie.jpg" class="card-img-top" style={{ maxHeight: "200px", objectFit: "cover" }} alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{topPost[2].title}</h5>
                                            <p className="card-text overflow-hidden" style={{ maxHeight: "150px" }}>
                                                {topPost[2].text}
                                            </p>...
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-body-secondary">#: {topPost[2].hashtags}</small>
                                        </div>
                                    </div>
                                ) : (
                                    // Si el tercer post no existe, mostrar una card vacía
                                    <div class="card h-100 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "500px", maxHeight: "500px" }}>
                                        <div class="text-body-secondary">No more post to see.</div>
                                    </div>
                                )}
                            </div>

                            {/* Renderizar una card vacía para "Go watch all post" */}
                            {username === userData.username ? (
                            <div class="col">
                                <div class="card h-100 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "500px", maxHeight: "500px" }}>
                                    <a href="/myPage/publish" className="upload-button mb-3">
                                        +
                                    </a>
                                </div>
                            </div>
                            ) : (
                            <div>ver posts</div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};

export default MyProfile;
