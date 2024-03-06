import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [isValid, setIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(null);

    if(jwt){
        fetch(`/api/auth/validate?token=${jwt}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "GET",
        })
        .then(response => {
            if(response.status === 200) return response.json();
        })
        .then(isValid => {
            setIsValid(isValid);
            setIsLoading(false);
        });
    } else {
        return <Navigate to="/login"/>;
    }

    return isLoading ? (
        <div>Loading...</div>
    ) : isValid === true ? (
        children
    ) : (
        <Navigate to="/login"/>
    )
};

export default PrivateRoute;