import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import PrivateRoute from './PrivateRoute';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import AllLoans from '../Pages/AllLoans';
import LoanDetails from '../Pages/LoanDetails';
import ApplyLoan from '../Pages/ApplyLoan';
import DashboardLayout from '../Layouts/DashboardLayout';
import DashboardHome from '../Pages/dashboard/DashboardHome';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [{
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/register",
            element: <Register></Register>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/all-loans",
            element: <AllLoans></AllLoans>
        },
        {
            path: "/loan/:id",
            element: <LoanDetails></LoanDetails>,
        },
        {
            path: "/apply/:id",
            element: <PrivateRoute><ApplyLoan></ApplyLoan></PrivateRoute>,
        },
        {
            path: "/dashboard",
            element: (
                <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>
            ),
            children: [
                {
                    index: true,
                    element: <DashboardHome></DashboardHome>
                },
            ]
        },
        ]
    }
])

export default router;