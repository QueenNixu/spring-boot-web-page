import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Navigate } from 'react-router-dom';

const Publish = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    // const [videoUrl, setVideoUrl] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [titleChar, setTitleChar] = useState(0);
    const [textChar, setTextChar] = useState(0);
    const [hashtagsChar, setHashtagsChar] = useState(0);
    const [images, setImages] = useState([]);
    // const [videos, setVideos] = useState([]);
    const [errorMessages, setErrorMessages] = useState({
        title: '',
        text: '',
        hashtags: ''
    });

    const MAX_IMAGE_SIZE_MB = 2;
    const MAX_TITLE_CHAR_LIMIT = 255;
    const MAX_TEXT_CHAR_LIMIT = 2000;
    const MAX_HASHTAGS_CHAR_LIMIT = 255;

    const handleImageChange = (event) => {
        const files = event.target.files;
        const newImages = [...images];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Verificar el tamaño del archivo
            if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
                alert(`The image "${file.name}" exceeds the maximum allowed size of ${MAX_IMAGE_SIZE_MB} MB.`);
                continue; // No agregar la imagen al estado y pasar a la siguiente iteración
            }
            
            const reader = new FileReader();

            reader.onload = (e) => {
                newImages.push({ file, preview: e.target.result });
                setImages([...newImages]);
            };

            reader.readAsDataURL(file);
        }
        event.target.value = null; // Limpiar el valor del input para permitir la selección de la misma imagen nuevamente (en caso de que el usuario quiera reemplazarla)
    };

    // const handleVideoChange = (event) => {
    //     const files = event.target.files;
    //     const newVideos = [...videos];

    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i];
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             newVideos.push({ file, preview: e.target.result });
    //             setVideos([...newVideos]);
    //         };

    //         reader.readAsDataURL(file);
    //     }
        
    // };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    // const removeVideo = (index) => {
    //     const newVideos = [...videos];
    //     newVideos.splice(index, 1);
    //     setVideos(newVideos);
    // };

    const updateTitle = (value) => {
        setTitle(value);
        setTitleChar(value.length);
        if (value.length > MAX_TITLE_CHAR_LIMIT) {
            setErrorMessages({ ...errorMessages, title: `Title cannot exceed ${MAX_TITLE_CHAR_LIMIT} characters` });
        } else {
            setErrorMessages({ ...errorMessages, title: '' });
        }
    };

    const updateText = (value) => {
        setText(value);
        setTextChar(value.length);
        if (value.length > MAX_TEXT_CHAR_LIMIT) {
            setErrorMessages({ ...errorMessages, text: `Text cannot exceed ${MAX_TEXT_CHAR_LIMIT} characters` });
        } else {
            setErrorMessages({ ...errorMessages, text: '' });
        }
    };

    const updateHashtags = (value) => {
        setHashtags(value);
        setHashtagsChar(value.length);
        if (value.length > MAX_HASHTAGS_CHAR_LIMIT) {
            setErrorMessages({ ...errorMessages, hashtags: `Hashtags cannot exceed ${MAX_HASHTAGS_CHAR_LIMIT} characters` });
        } else {
            setErrorMessages({ ...errorMessages, hashtags: '' });
        }
    };

    const publish = () => {
        // Verificar la validez del token JWT
        fetch(`/api/auth/validate?token=${jwt}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "GET",
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                // Si el token no es válido o ha expirado, redirigir al usuario a la página de inicio de sesión
                window.location.href = '/login';
                throw new Error('Token expired or invalid');
            }
        })
        .then(isValid => {
            // Si el token es válido, continuar con la lógica de publicación
            // Validar campos
            const errors = {};

            if(titleChar > MAX_TITLE_CHAR_LIMIT) {
                errors.title = `Title cannot exceed ${MAX_TITLE_CHAR_LIMIT} characters`;
            } else if(!title.trim() && titleChar < MAX_TITLE_CHAR_LIMIT) {
                errors.title = 'Title is required';
            }
            if(textChar > MAX_TEXT_CHAR_LIMIT) {
                errors.text = `Text cannot exceed ${MAX_TEXT_CHAR_LIMIT} characters`;
            } else if(!text.trim() && textChar < MAX_TEXT_CHAR_LIMIT) {
                errors.text = 'Text is required';
            }
            if(hashtagsChar >MAX_HASHTAGS_CHAR_LIMIT) {
                errors.hashtags = `Hashtags cannot exceed ${MAX_HASHTAGS_CHAR_LIMIT} characters`;
            } else if(!hashtags.trim() && hashtagsChar < MAX_HASHTAGS_CHAR_LIMIT) {
                errors.hashtags = 'Hashtags are required';
            }
            setErrorMessages(errors);

            if (Object.keys(errors).length > 0) {
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('text', text);
            formData.append('hashtags', hashtags);

            // Enviar datos al servidor
            fetch("/api/posts", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                method: "POST",
                body: formData,
            })
            .then(response => {
                if(response.status === 200) return response.json();
            })
            .then((post) => {
                console.log(post);
                window.location.href = `/myPage`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    
    

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center" style={{ margin: '50px' }}>
                <div className="col-md-10">
                    <form>
                    <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: "100%"}}>
                            <input
                                className={`form-control ${errorMessages.title && 'is-invalid'}`}
                                id="title"
                                placeholder="Title here"
                                value={title}
                                onChange={(e) => updateTitle(e.target.value)}
                                onClick={() => {
                                    if (!title.trim()) {
                                        setErrorMessages({ ...errorMessages, title: '' });
                                    }
                                }}
                            />
                            {errorMessages.title && <div className="invalid-feedback">{errorMessages.title}</div>}
                        </div>
                        <span style={{ paddingTop: "0.375rem", paddingLeft: "0.25rem" }}>{titleChar}/{MAX_TITLE_CHAR_LIMIT}</span>
                    </div>


                        <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: "100%"}}>
                                <textarea
                                    className={`form-control ${errorMessages.text && 'is-invalid'}`}
                                    id="text"
                                    placeholder="What are you thinking?"
                                    value={text}
                                    onChange={(e) => updateText(e.target.value)}
                                    onClick={() => {
                                        if (!text.trim()) {
                                            setErrorMessages({ ...errorMessages, text: '' });
                                        }
                                    }}
                                    style={{ minHeight: '140px' }}
                                />
                                {errorMessages.text && <div className="invalid-feedback">{errorMessages.text}</div>}
                            </div>
                            <span style={{ paddingTop: "0.375rem", paddingLeft: "0.25rem" }}>{textChar}/{MAX_TEXT_CHAR_LIMIT}</span>
                        </div>

                        <div className="mb-3">
                            {/* <label htmlFor="images" className="form-label">Images</label> */}
                            <div>
                                {images.map((image, index) => (
                                    <div key={index} className="mb-2 image-container">
                                        <img src={image.preview} alt={`Image ${index + 1}`} style={{ width: 'auto', height: '112px'}} onClick={() => removeImage(index)}/>
                                        <p type="button" className="remove-button">X</p>
                                    </div>
                                ))}
                                <label className="upload-button mb-3" htmlFor="images">
                                    +
                                    <input
                                        type="file"
                                        id="images"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleImageChange(e)}
                                    />
                                </label>
                                {images.length === 0 ? (
                                    <div style={{ marginLeft: '10px', display: 'inline-block' }}>
                                        <p>You can upload images!</p>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: "100%"}}>
                                <input
                                    className={`form-control ${errorMessages.hashtags && 'is-invalid'}`}
                                    id="hashtags"
                                    placeholder="Hashtags beginning with # and separated with a space"
                                    value={hashtags}
                                    onChange={(e) => updateHashtags(e.target.value)}
                                    onClick={() => {
                                        if (!hashtags.trim()) {
                                            setErrorMessages({ ...errorMessages, hashtags: '' });
                                        }
                                    }}
                                />
                                {errorMessages.hashtags && <div className="invalid-feedback">{errorMessages.hashtags}</div>}
                            </div>
                            <span style={{ paddingTop: "0.375rem", paddingLeft: "0.25rem" }}>{hashtagsChar}/{MAX_HASHTAGS_CHAR_LIMIT}</span>
                        </div>

                        <div className='text-center'>
                            <button type="button" className="btn btn-primary" onClick={() => publish()}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Publish;