import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { useNavigate  } from 'react-router-dom';

const Login = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    //console.log(jwt);

    function sendLoginRequest() {
        console.log("Sending Login Request!");

        const requestBody = {
            "username": username,
            "password": password
        };
        
        fetch("api/auth/login", {
            headers: {
            "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if(response.status === 200) {
                return Promise.all([response.json(), response.headers]);
            } else {
                return Promise.reject("Invalid login attempt");
            }
        })
        .then(([body, headers]) => {
            setJwt(headers.get("authorization"));
            window.location.href = "/";
            
        })
        .catch((message) => {
            alert(message);
        });
        }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ margin: '50px' }}>
            <div className="row">
                <div className="col-md-12">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                            type="email"
                            className="form-control"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className='text-center'>
                            <button type="button" className="btn btn-primary" onClick={() => sendLoginRequest()} >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;