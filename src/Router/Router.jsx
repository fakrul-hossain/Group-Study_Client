import React from "react";

import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import MainLayout from "../layout/MainLayout/MainLayout";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SignUp from "../Pages/SignUp/SignUp";
import LogIn from "../Pages/Login/Login";
import AllAssignments from "../Pages/All Assignments/AllAssignments";
import MyAssignment from "../Pages/My Assignment/MyAssignment";
import AddNewAssignments from "../Pages/Add New Campaign/AddNewAssignments";
import MyDonations from "../Pages/My Donations/myDonations";
import AssignmentDetails from "../Pages/AssignmentDetails/AssignmentDetails";
import UpdateAssignment from "../Pages/UpdateAssignment/UpdateAssignment";




const myCreateRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        // loader: () => fetch("/data.json"),
      },
      {
        path: "/AllAssignments",
        element: <AllAssignments/>,
        loader: ()=> fetch('http://localhost:5000/assignments')
      },
        {
          path: "/assignmentDetails/:id",
          element: <PrivateRoute><AssignmentDetails /></PrivateRoute>,
          loader: ({params})=> fetch(`http://localhost:5000/assignments/${params.id}`)
        }
      ,
        {
          path: "/updateAssignment/:id",
          element: <PrivateRoute><UpdateAssignment /></PrivateRoute>,
          loader: ({params})=> fetch(`http://localhost:5000/assignments/${params.id}`)
        }
      ,
      {
        path: '/AddNewAssignments',
        element:<PrivateRoute><AddNewAssignments></AddNewAssignments></PrivateRoute>
    },
      {
        path: '/myAssignment',
        element:<PrivateRoute><MyAssignment></MyAssignment></PrivateRoute>
    },
      {
        path: "/myDonations",
        element: <PrivateRoute><MyDonations></MyDonations></PrivateRoute>,
      },
      
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default myCreateRoute;
