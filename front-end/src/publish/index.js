import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Publish = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    // const [videoUrl, setVideoUrl] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [images, setImages] = useState([]);
    // const [videos, setVideos] = useState([]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        const newImages = [...images];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                newImages.push({ file, preview: e.target.result });
                setImages([...newImages]);
            };

            reader.readAsDataURL(file);
        }
        event.target.value = null;
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

    const publish = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('hashtags', hashtags);
        
        // Añadir todas las imágenes como una sola parte llamada "images"
        images.forEach((image, index) => {
            formData.append(`images`, image.file);
        });
    
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
    };
    
    

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center" style={{ margin: '50px' }}>
                <div className="col-md-10">
                    <form>

                        <div className="mb-3">
                            {/* <label htmlFor="title" className="form-label">Title</label> */}
                            <input
                                className="form-control"
                                id="title"
                                placeholder="Title here"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            {/* <label htmlFor="text" className="form-label">Text</label> */}
                            <textarea
                                className="form-control"
                                id="text"
                                placeholder="What are you thinking?"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                style={{ minHeight: '100px' }} // Establecer una altura mínima
                            />
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

                        <div className="mb-3">
                            <label htmlFor="hashtags" className="form-label">Hashtags</label>
                            <input
                                className="form-control"
                                id="hashtags"
                                placeholder="Hashtags beginning with # and separated with a space"
                                value={hashtags}
                                onChange={(e) => setHashtags(e.target.value)}
                            />
                        </div>

                        {/* <div className="mb-3">
                            <label className="btn btn-primary">
                                Upload Video(s)
                                <input
                                    type="file"
                                    className="form-control"
                                    id="videos"
                                    accept="video/*"
                                    multiple
                                    style={{ display: 'none' }} // Ocultar el input de tipo file
                                    onChange={(e) => handleVideoChange(e)}
                                />
                            </label>
                        </div> */}

                        {/* <div>
                            {videos.map((video, index) => (
                                <div key={index} className="mb-2 video-container">
                                    <img src={video.thumbnail} alt={`Video ${index + 1}`} style={{ width: '220px', height: 'auto' }} onClick={() => removeVideo(index)}/>
                                    <p type="button" className="remove-button">X</p>
                                </div>
                            ))}
                        </div> */}

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