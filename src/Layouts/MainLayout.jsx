import React from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-80px)]">
            <Outlet></Outlet>
            <Footer></Footer>
            </div>

        </div>
    );
};

export default MainLayout;