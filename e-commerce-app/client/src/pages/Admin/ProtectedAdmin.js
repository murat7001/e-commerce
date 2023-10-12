
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedAdmin() {
    const { user } = useAuth();

    if (user?.role !== 'admin') {
        // Kullanıcının admin rolü yoksa ana sayfaya yönlendir
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default ProtectedAdmin;