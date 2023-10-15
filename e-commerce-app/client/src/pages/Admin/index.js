import React from 'react'
import {  Link, Outlet, } from "react-router-dom";
import './styles.css'



function Admin() {

    return (
        <div>
            <nav>
                <ul className="admin-menu">
                    <li>
                        <Link to={"home"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"orders"}>Orders</Link>
                    </li>
                    <li>
                        <Link to={"products"}>Products</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
            
        </div>
    )
}

export default Admin