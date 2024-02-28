import React from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    const [jwt, setJwt] = useLocalState("", "jwt");

    return (
        <div>
            <div className="container">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Dashboard</h1>
                    <p className="lead">¿Café? Amamos el cafe! y el mate cocido!</p>
                    <hr className="my-4"></hr>
                    {/* 
                    <a className="btn btn-primary btn-lg" href="#" role="button">Sí, por favor</a>
                    <a className="btn btn-secondary btn-lg" href="#" role="button">No, gracias</a>
                    */}
                    <button className="btn btn-primary btn-lg" type="button" onClick={() => navigate('/')}>Homepage</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;