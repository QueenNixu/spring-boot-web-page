import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const MyProfile = () => {

    const [userData, setUserData] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const { username } = useParams(); // Obtener el nombre de usuario de la URL
    const [topPost, setTopPost] = useState([]);
    const [currentUsername, setCurrentUsername] = useState("");
    const [topPostImages, setTopPostImages] = useState([]);

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
        if(username) {
            fetch(`/api/user/${username}`, {
                headers: {
                    "Content-Type": "application/json",
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
        if(username) {
            fetch(`/api/posts/topPost/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            })
            .then(response => {
                if(response.status === 200) return response.json();
            })
            .then(topPostData => {
                // console.log(topPostData);
                setTopPost(topPostData);
            });
        }
    }, [jwt]);

    useEffect(() => {
        if (topPost) {
            const postId1 = topPost.length > 0 ? topPost[0].id : 0;
            const postId2 = topPost.length > 1 ? topPost[1].id : 0;
            const postId3 = topPost.length > 2 ? topPost[2].id : 0;
    
            fetch(`/api/images/firstImageFromTopPosts?postId1=${postId1}&postId2=${postId2}&postId3=${postId3}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET"
            })
            .then(response => {
                if(response.status === 200) return response.json();
            })
            .then(topPostImages => {
                //console.log("toppostdata", topPostImages);
                setTopPostImages(topPostImages);
            });
        }
    }, [jwt, topPost]);
      
    const isTokenValid = () => {
        if (!jwt) return false; // Si no hay JWT, retorna false

        const decodedToken = jwtDecode(jwt); // Decodifica el token JWT
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

        return decodedToken.exp > currentTimeInSeconds; // Retorna true si el token no ha expirado
    };

    return (
        <div>
            {userData ? (
                <div className="container">
                    <div className="jumbotron mt-5">
                        <h1 className="display-4">{currentUsername === userData.username ? ("My profile") : (`${userData.username}'s profile`)}</h1>
                        <hr className="my-4"></hr>
                        {/* mostrar datos de usuario */}
                        <div className="card mb-3" style={{maxWidth: "100%"}}>
                            <div className="row g-0">
                                <div className="col-md-3">
                                    <img src="/testImages/defaultImage.jpg" className="img-fluid rounded-circle mx-2 my-2" alt="Profile picture" />
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
                        <hr className="my-4"></hr>
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                            {/* Verificar si el primer post existe */}
                            <div className="col">
                                {topPost[0] ? (
                                    // Si el primer post existe, mostrar la card con sus detalles
                                    <a href={`/dashboard/post/${topPost[0].id}`} className="card h-100 card-link-1" style={{ minHeight: "400px", maxHeight: "400px" }}>
                                        {topPostImages && topPostImages.length > 0 && topPostImages[0] !== null ? (
                                            <img src={`data:image/jpeg;base64,${topPostImages[0].datos}`} className="card-img-top" style={{ minHeight: "150px", maxHeight: "150px", objectFit: "cover" }} alt="..." />
                                        ) : (
                                            <img src="/testImages/defaultImage.jpg" className="card-img-top" style={{ minHeight: "150px", maxHeight: "150px", objectFit: "cover" }} alt="..." />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{topPost[0].title}</h5>
                                            <p className="card-text overflow-hidden" style={{ maxHeight: "150px" }}>
                                                {topPost[0].text}
                                            </p>...
                                        </div>
                                        {/* <small className="card-footer " style={{ maxHeight: "68px", overflowX: "scroll", scrollBehavior: "smooth" }}>
                                            {topPost[0].hashtags.split(" ").map((hashtag, index) => (
                                                <a href={`/currentPath/${hashtag}`} className="card-hashtag" key={index}>#{hashtag} </a>
                                            ))}
                                        </small> */}
                                    </a>
                                ) : (
                                    // Si el primer post no existe, mostrar una card vacía
                                    <div className="card h-100 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "400px", maxHeight: "400px" }}>
                                        <div className="text-body-secondary">No more post to see.</div>
                                    </div>
                                )}
                            </div>

                            {/* Verificar si el segundo post existe */}
                            <div className="col">
                                {topPost[1] ? (
                                    // Si el segundo post existe, mostrar la card con sus detalles
                                    <a href={`/dashboard/post/${topPost[1].id}`} className="card h-100 card-link-1" style={{ minHeight: "400px", maxHeight: "400px" }}>
                                        {topPostImages && topPostImages.length > 1 && topPostImages[1] !== null ? (
                                            <img src={`data:image/jpeg;base64,${topPostImages[1].datos}`} className="card-img-top" style={{ minHeight: "150px", maxHeight: "150px", objectFit: "cover" }} alt="..." />
                                        ) : (
                                            <img src="/testImages/defaultImage.jpg" className="card-img-top" style={{ minHeight: "150px", maxHeight: "150px", objectFit: "cover" }} alt="..." />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{topPost[1].title}</h5>
                                            <p className="card-text overflow-hidden" style={{ maxHeight: "150px" }}>
                                                {topPost[1].text}
                                            </p>...
                                        </div>
                                        {/* <small className="card-footer">#: {topPost[1].hashtags}</small> */}
                                    </a>
                                ) : (
                                    // Si el segundo post no existe, mostrar una card vacía
                                    <div className="card h-100 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "400px", maxHeight: "400px" }}>
                                        <div className="text-body-secondary">No more post to see.</div>
                                    </div>
                                )}
                            </div>

                            {/* Verificar si el tercer post existe */}
                            <div className="col">
                                {topPost[2] ? (
                                    // Si el tercer post existe, mostrar la card con sus detalles
                                    <a href={`/dashboard/post/${topPost[2].id}`} className="card h-100 card-link-1" style={{ minHeight: "400px", maxHeight: "400px" }}>
                                        {topPostImages && topPostImages.length > 2 && topPostImages[2] !== null ? (
                                            <img src={`data:image/jpeg;base64,${topPostImages[2].datos}`} className="card-img-top" style={{ minHeight: "150px", maxHeight: "150px", objectFit: "cover" }} alt="..." />
                                        ) : (
                                            <img src="/testImages/defaultImage.jpg" className="card-img-top" style={{ minHeight: "150px", maxHeight: "150px", objectFit: "cover" }} alt="..." />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title">{topPost[2].title}</h5>
                                            <p className="card-text overflow-hidden" style={{ maxHeight: "150px" }}>
                                                {topPost[2].text}
                                            </p>...
                                        </div>
                                        {/* <small className="card-footer">#: {topPost[2].hashtags}</small> */}
                                    </a>
                                ) : (
                                    // Si el tercer post no existe, mostrar una card vacía
                                    <div className="card h-100 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "400px", maxHeight: "400px" }}>
                                        <div className="text-body-secondary">No more post to see.</div>
                                    </div>
                                )}
                            </div>

                            {/* Renderizar una card vacía para "Go watch all post" */}
                            {currentUsername === userData.username && isTokenValid() ? (
                            <div className="col">
                                <a href="/publish" className="card h-100 text-center d-flex align-items-center justify-content-center upload-card" style={{ minHeight: "400px", maxHeight: "400px" }}>
                                    <p className="upload-button-profile mb-3">
                                        +
                                    </p>
                                </a>
                            </div>
                            ) : (
                                <div className="col">
                                    {/* <a href={currentUsername === userData.username ? "/myPage" : `/page/${userData.username}`} className="card h-100 text-center d-flex align-items-center justify-content-center upload-button-text" style={{ minHeight: "500px", maxHeight: "500px" }}>
                                        otro link
                                    </a> */}
                                    <a href={`/page/${userData.username}`} className="card h-100 text-center d-flex align-items-center justify-content-center upload-button-text-2" style={{ minHeight: "400px", maxHeight: "400px" }}>
                                        <p style={{ fontSize: "32px" }}>{userData.username}'s page</p>
                                        <p style={{ fontSize: "16px" }}>Check their page for more posts!</p>
                                    </a>
                                </div>
                            )}
                        </div>
                        <hr className="my-4"></hr>
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};

export default MyProfile;
