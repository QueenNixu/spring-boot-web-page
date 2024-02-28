import { useEffect } from 'react';
//import './App.css';
import { useLocalState } from './util/useLocalStorage';
import { Route, Router, Routes } from 'react-router-dom';
import Dashboard from './dashboard';
import Homepage from './homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import PrivateRoute from './privateRoute';

function App() {

  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    
    <Routes>

      <Route path="/" element={<Homepage/>} />

      <Route path="/login" element={<Login/>} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        } />
    </Routes>
  );
}

export default App;
