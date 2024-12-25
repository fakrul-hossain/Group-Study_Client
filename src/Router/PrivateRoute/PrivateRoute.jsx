import React, { useContext } from 'react';
import { AuthContext } from 
'../../providers/AuthProvider';
import PropTypes from 'prop-types'; 
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation()

    const {user,loading} = useContext(AuthContext)
    if (loading) {
        return <span className="mx-auto flex justify-center h-[80vh] items-center loading loading-ball loading-lg"></span>
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
