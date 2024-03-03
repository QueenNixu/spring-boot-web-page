import React from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { useNavigate  } from 'react-router-dom';

const Homepage = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    const navigate = useNavigate();

    return (
        <div>
            <div className="container">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Wellcome!</h1>
                    <p className="lead">Coffee? ¡We love coffee!</p>
                    <hr className="my-4"></hr>
                    <p className="lead">Aca se van a ver post de temas (hashtags) y usuarios que sigas</p>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="/logo192.png" alt="Mi imagen" />
                            <p>imagen statica</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="/logo192.png" alt="Mi imagen" />
                            <p>imagen statica</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;