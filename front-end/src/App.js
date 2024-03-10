import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import Post from './post';
import Login from './login';
import PrivateRoute from './privateRoute';
import Header from './header';
import Footer from './footer';
import Publish from './publish';
import Dashboard from './dashboard';
import Profile from './profile';
import Page from './page';
import MyPage from './myPage';
import Register from './register';

function App() {

  return (
    <div style={{ paddingBottom: '50px', backgroundColor: '#333', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/post/:id" element={<Post/>} />
        <Route path="/profile/:username" element={<Profile/>} />
        <Route path="/page/:username" element={<Page/>} />
        <Route path="/myPage" element={<PrivateRoute><MyPage/></PrivateRoute>} />
        <Route path="/publish" element={<PrivateRoute><Publish/></PrivateRoute>} />
        <Route path="/myPage/post/:id" element={<PrivateRoute><Post/></PrivateRoute>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
