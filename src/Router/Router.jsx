import React from "react";

import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import MainLayout from "../layout/MainLayout/MainLayout";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SignUp from "../Pages/SignUp/SignUp";
import LogIn from "../Pages/Login/Login";
import AllAssignments from "../Pages/All Assignments/AllAssignments";
import MyCampaign from "../Pages/My  Campaign/myCampaign";
import AddNewAssignments from "../Pages/Add New Campaign/AddNewAssignments";
import MyDonations from "../Pages/My Donations/myDonations";
import CampaignDetails from "../Pages/Campaigns Details/CampaignDetails";
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
          element: <PrivateRoute><CampaignDetails /></PrivateRoute>,
          loader: ({params})=> fetch(`https://crowdcube-server-xi.vercel.app/campaigns/${params.id}`)
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
        path: '/myCampaigns',
        element:<PrivateRoute><MyCampaign></MyCampaign></PrivateRoute>
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
