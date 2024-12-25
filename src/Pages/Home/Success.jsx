import React from 'react';
import { Slide } from 'react-awesome-reveal';

const Success = () => {
  return (
    <section className="bg-teal-900 py-16">
      <div className="max-w-6xl md:w-[600px] lg:w-[800px] p-6 mx-auto px-4 lg:px-8">
       
        <Slide>
 {/* Section Title */}
 <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Over a decade of Fundraising Success
          </h2>
        </div>

        {/* Statistics Container */}
        <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 text-white">
          {/* First Stat */}
          <div className="text-center md:border-r md:border-gray-500 md:pr-12">
            <h3 className="text-4xl md:text-6xl font-bold">$700,000,000+</h3>
            <p className="mt-2 text-gray-300 text-lg md:text-xl">Funding Committed</p>
          </div>

          {/* Second Stat */}
          <div className="text-center md:pl-12">
            <h3 className="text-4xl md:text-6xl font-bold">20,000+</h3>
            <p className="mt-2 text-gray-300 text-lg md:text-xl">Accredited Investors</p>
          </div>
        </div>
        </Slide>
      </div>
    </section>
  );
};

export default Success;
