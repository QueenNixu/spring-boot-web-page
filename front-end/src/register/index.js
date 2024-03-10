import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Register = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    const isTokenValid = () => {
        if (!jwt) return false; // Si no hay JWT, retorna false
    
        const decodedToken = jwtDecode(jwt); // Decodifica el token JWT
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    
        return decodedToken.exp > currentTimeInSeconds; // Retorna true si el token no ha expirado
    };
    
    useEffect(() => {
        if (isTokenValid()) {
            window.location.href="/";
        }
    }, []);

    return (
        <div>
            regitser
        </div>
    );
};

export default Register;