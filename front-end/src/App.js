import { useEffect } from 'react';
import './App.css';
import { useLocalState } from './util/useLocalStorage';
import { Route, Router, Routes } from 'react-router-dom';
import MyPage from './myPage';
import Homepage from './homepage';
import Post from './post';
//import Profile from './profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import PrivateRoute from './privateRoute';
import Header from './header';
import Footer from './footer';
import Publish from './publish';

function App() {

  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div style={{ paddingBottom: '50px', backgroundColor: '#333', minHeight: '100vh', color: 'white' }}>
      {/* Establece el fondo negro y el color de texto blanco para toda la página */}
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myPage" element={<PrivateRoute><MyPage/></PrivateRoute>} />
        <Route path="/myPage/publish" element={<PrivateRoute><Publish/></PrivateRoute>} />
        <Route path="/myPage/post/:id" element={<PrivateRoute><Post/></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
