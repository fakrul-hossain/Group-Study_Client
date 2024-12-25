import React, { useContext } from 'react';
import { AuthContext } from 
'../../providers/AuthProvider';
import PropTypes from 'prop-types'; 
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation()

    const {user,loading} = useContext(AuthContext)
    if (loading) {
        return    <div className="flex items-center justify-center h-screen">
        <div className="loader border-t-4 border-b-4 border-teal-500 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={{from:location}}></Navigate>
};

export default PrivateRoute;



PrivateRoute.propTypes ={
    children: PropTypes.node
}
