import React from 'react'
import { Route, Routes, Link, useMatch } from "react-router-dom";

function Admin() {
    return (
        <div>
            <nav>
                <ul className='admin-menu'>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Orders</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Products</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Admin