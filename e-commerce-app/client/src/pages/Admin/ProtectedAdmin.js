
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import './styles.css'

function ProtectedAdmin() {
    const { user } = useAuth();

    if (user?.role !== "admin") {
        return <Navigate to={"/"} replace={true} />;
    }

    return (
        <>
            <nav>
                <ul className="admin-menu">
                    <li>
                        <Link to={"/admin"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/admin/orders"}>Orders</Link>
                    </li>
                    <li>
                        <Link to={"/admin/products"}>Products</Link>
                    </li>
                </ul>
            </nav>
            <Box mt={10}>
                <Outlet />
            </Box>
        </>
    );
}

export default ProtectedAdmin;