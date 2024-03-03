import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useLocalState } from '../util/useLocalStorage';

const Header = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const location = useLocation();

    console.log(jwt);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000' }}>
            <div className="container-fluid d-flex">

                <Link className="navbar-brand" to="/">Mi App</Link>

                <div id="navbarSupportedContent" style={{ width: '80%' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center">
                        <li className={`nav-item ${location.pathname === "/" ? 'active' : ''}`} style={{ alignSelf: 'flex-end' }}>
                            <Link className="nav-link" to="/">Homepage</Link>
                        </li>
                        <li className={`nav-item ${location.pathname.startsWith("/myPage") ? 'active' : ''}`}>
                            <Link className='nav-link' to="/myPage">My page</Link>
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
                        <li className="nav-item">
                            <Link className="nav-link" to="#">example</Link>
                        </li>
                    </ul>
                </div>

                <div className='ms-auto'>
                    { jwt ? (
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle as={Link} className="nav-link account-button">
                                        Account
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} className="asid" to="/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item as={Link} className="asid" to="/logout">Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        </ul>
                    ) : (
                        <Link className="nav-link" to="/login">Login</Link>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Header;
