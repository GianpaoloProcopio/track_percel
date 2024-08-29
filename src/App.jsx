import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./styles/style.css";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import NoPage from './pages/NoPage';
import Spedizione from './pages/Spedizione';
import PrivateRoutes from './components/PrivateRoutes';

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/logout" element={<User />} />
                <Route path="*" element={<NoPage />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/spedizione" element={<Spedizione />} />
                </Route>
            </Routes>
        </Router>
    );
}
