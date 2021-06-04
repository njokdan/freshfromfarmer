import React from 'react';
import AppNavbar from '../Navbar';
import Sidebar from './Sidebar';

function Supply(props) {
    return (
        <div>
            <AppNavbar />
            <Sidebar />
            <div className="content">
                <h2 className="text-center">Supply</h2>
                
            </div>
        </div>
    );
}

export default Supply;