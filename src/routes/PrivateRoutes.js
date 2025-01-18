import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles, redirectTo, children }) => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to={redirectTo} />;
  }

  // Retrieve the user role directly (no need for JSON.parse if it's a string)
  const userRole = localStorage.getItem('userRole'); // Just get the string value

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} />;
  }

  // Render the layout (children should contain the layout like sidebar, header) and Outlet for nested routes
  return (
    <div>
      {children}  {/* Render the layout (e.g., sidebar, header) */}
      <Outlet />  {/* Render the child routes like FarmerDashboard */}
    </div>
  );
};

export default PrivateRoute;
