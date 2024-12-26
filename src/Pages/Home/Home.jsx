import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
// import Carousel from '../../componets/Header/Carousel';
import { useLoaderData } from 'react-router-dom';

import SimpleSlider from '../../componets/Header/Carousel';
import AIFeaturesSection from './AIFeaturesSection';
import Success from './Success';
import TopAssignments from '../Top Assignments/TopAssignments';
import Feature from './Feature';





const Home = () => {
    const eventData = useLoaderData()

    const authInfo = useContext(AuthContext)
    // console.log(authInfo);

    return (
        <div>
             <SimpleSlider/>
           <div className="py-10">
           <TopAssignments></TopAssignments>
           <Feature></Feature>
           </div>

             <Success/>
             <AIFeaturesSection/>
           <div className="mt-12">
           </div>

        </div>
    );
};

export default Home;