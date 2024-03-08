import React from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { useNavigate  } from 'react-router-dom';

const Homepage = () => {

    return (
        <div>
            <div className="container">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Wellcome!</h1>
                    <p className="lead">Coffee? ¡We love coffee!</p>
                    <hr className="my-4"></hr>
                    <div className="margi" style={{marginTop: "40px", display: 'flex', justifyContent: 'center'}}>
                        <div className="mx-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="/springIcon.png" alt="Mi imagen" style={{ height: "192px", width: "192px" }} />
                            <p>SPRINGBOOT</p>
                        </div>
                        <div className="mx-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="/reactIcon.png" alt="Mi imagen" style={{ height: "200px", width: "200px" }} />
                            <p>REACT</p>
                        </div>
                        <div className="mx-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="/bootstrapIcon.png" alt="Mi imagen" style={{ height: "200px", width: "200px" }} />
                            <p>Bootstrap</p>
                        </div>
                        <div className="mx-2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src="/MySQLIcon.png" alt="Mi imagen" style={{ height: "200px", width: "200px" }} />
                            <p>MySQL</p>
                        </div>
                    </div>
                    <hr className="my-4"></hr>
                </div>
            </div>
        </div>
    );
};

export default Homepage;