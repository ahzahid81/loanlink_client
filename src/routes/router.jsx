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
import DashboardProfile from '../Pages/dashboard/DashboardProfile';
import BorrowerMyLoans from '../Pages/dashboard/BorrowerMyLoans';
import RoleRoute from './RoleRoute';
import AdminManageUsers from '../Pages/dashboard/AdminManageUsers';
import AdminLoanApplications from '../Pages/dashboard/AdminLoanApplications';
import AdminAllLoans from '../Pages/dashboard/AdminAllLoans';
import ManagerAddLoan from '../Pages/dashboard/ManagerAddLoan';
import ManagerManageLoans from '../Pages/dashboard/ManagerManageLoans';
import ManagerPendingLoans from '../Pages/dashboard/ManagerPendingLoans';
import ManagerApprovedLoans from '../Pages/dashboard/ManagerApprovedLoans';
import PaymentSuccess from '../Pages/PaymentSuccess';
import ErrorPage from '../Pages/ErrorPage';
import About from '../Pages/About';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
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
            path: "/about",
            element: <About></About>
        },
        {
            path: "/payment-success/:id",
            element: <PaymentSuccess></PaymentSuccess>
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
                {
                    path: "profile",
                    element: <DashboardProfile></DashboardProfile>
                },
                {
                    path: "my-loans",
                    element: <RoleRoute allowedRoles={["borrower"]}><BorrowerMyLoans></BorrowerMyLoans></RoleRoute>
                },
                {
                    path: "manage-users",
                    element: <RoleRoute allowedRoles={["admin"]}><AdminManageUsers></AdminManageUsers></RoleRoute>
                },
                {
                    path: "loan-applications",
                    element: <RoleRoute allowedRoles={["admin"]}><AdminLoanApplications></AdminLoanApplications></RoleRoute>
                },
                {
                    path: "all-loan",
                    element: <RoleRoute allowedRoles={["admin"]}><AdminAllLoans></AdminAllLoans></RoleRoute>
                },
                {
                    path: "add-loan",
                    element: <RoleRoute allowedRoles={["manager"]}><ManagerAddLoan></ManagerAddLoan></RoleRoute>
                },
                {
                    path: "manage-loans",
                    element: <RoleRoute allowedRoles={["manager"]}><ManagerManageLoans></ManagerManageLoans></RoleRoute>
                },
                {
                    path: "pending-loans",
                    element: <RoleRoute allowedRoles={["manager"]}><ManagerPendingLoans></ManagerPendingLoans></RoleRoute>
                },
                {
                    path: "approved-loans",
                    element: <RoleRoute allowedRoles={["manager"]}><ManagerApprovedLoans></ManagerApprovedLoans></RoleRoute>
                },
            ]
        },
        ]
    }
])

export default router;