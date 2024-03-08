import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useLocalState } from '../util/useLocalStorage';
import { jwtDecode } from 'jwt-decode';

const Header = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const location = useLocation();
    const [username, setUsername] = useState("");
    
    useEffect(() => {
        if(jwt) {
            const tokenParts = jwt.split('.');
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                setUsername(payload.sub);
            }
        }
    }, [jwt]);

    // console.log(jwt);

    const isTokenValid = () => {
        if (!jwt) return false; // Si no hay JWT, retorna false

        const decodedToken = jwtDecode(jwt); // Decodifica el token JWT
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

        return decodedToken.exp > currentTimeInSeconds; // Retorna true si el token no ha expirado
    };

    const logout = () => {
        setJwt(null);
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000', paddingBottom: 0, marginBottom: 0 }}>
            <div className="container-fluid d-flex">

                <Link><img src="/springIcon.png" style={{ minHeight: "40px", maxHeight: "40px", marginBottom: "2px" }} /></Link>
                <Link className="navbar-brand" to="/">Mi App</Link>

                <div id="navbarSupportedContent" style={{ width: '80%' }}>
                    <ul className="navbar-nav justify-content-center">
                        <li className={`nav-item ${location.pathname === "/" ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">Homepage</Link>
                        </li>
                        <li className={`nav-item ${location.pathname.startsWith("/dashboard") ? 'active' : ''}`}>
                            <Link className='nav-link' to="/dashboard">Dashboard</Link>
                        </li>
                        <li className={`nav-item ${location.pathname.startsWith(`/myPage`) ? 'active' : ''}`}>
                            { username ? (
                                <Link className='nav-link' to={`/myPage`}>My page</Link>
                            ) : (
                                <Link className='nav-link' to={"/login"}>My page</Link>
                            )}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">example</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">example</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">example</Link>
                        </li>
                    </ul>
                </div>

                <div className='ms-auto'>
                    { isTokenValid() ? (
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle as={Link} className="nav-link account-button">
                                        (O){username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} className="asid" to={`/profile/${username}`}>Profile</Dropdown.Item>
                                        {/* <Dropdown.Item as={Link} className="asid" to="/logout" onClick={() => logout()}>Logout</Dropdown.Item> */}
                                        <Dropdown.Item className="asid" onClick={() => logout()}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                        </ul>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Header;
