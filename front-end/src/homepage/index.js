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
                    <h1 className="display-4">¡Bienvenido!</h1>
                    <p className="lead">¿Café? Amamos el cafe! y el mate cocido!</p>
                    <hr className="my-4"></hr>
                    {!jwt ? (
                        <button className="btn btn-primary btn-lg" type="button" onClick={() => navigate('/login')}>Iniciar sesión</button>
                    ) : null}
                    <button className="btn btn-primary btn-lg" type="button" onClick={() => navigate('/dashboard')}>Dashboard</button>
                    {/* <a className="btn btn-secondary btn-lg" href="#" role="button">No, gracias</a> */}
                </div>
            </div>
        </div>
    );
};

export default Homepage;