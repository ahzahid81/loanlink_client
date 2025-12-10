import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import PrivateRoute from './PrivateRoute';
import Register from '../Pages/Register';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [{
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/dashboard",
            element: (
                <PrivateRoute>
                    <div> Dashboard (Private)</div>
                </PrivateRoute>
            ),
        },
        {
            path: "/register",
            element: <Register></Register>
        }
        ]
    }
])

export default router;