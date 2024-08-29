import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { ClipLoader } from 'react-spinners';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className="spinner-container"><ClipLoader size={50} /></div>;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
}
