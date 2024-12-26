import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Bounce, Slide, Zoom } from "react-awesome-reveal";

const RunningCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);


  // Fetch running campaigns from the database
  useEffect(() => {
    fetch("https://crowdcube-server-xi.vercel.app/campaigns") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        const currentDate = new Date();
        // Filter running campaigns (where deadline has not passed)
        const runningCampaigns = data.filter(
          (campaign) => new Date(campaign.deadline) > currentDate
        );
        setCampaigns(runningCampaigns);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      
      <Slide>
      <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-2">
        Running Campaigns
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
        Explore ongoing campaigns and contribute to causes that matter.
      </p>
    </Slide>
     <Zoom> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {campaigns.length > 0 ? (
          campaigns.slice(0, 6).map((campaign) => (
            <div
              key={campaign._id}
              className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 px-4 md:px-6 lg:px-8 mx-auto"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="h-64 rounded-md my-3  w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                  {campaign.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {campaign.description.length > 100
                    ? `${campaign.description.substring(0, 100)}...`
                    : campaign.description}
                </p>
                <div className="mb-4">
                  <p className="text-gray-800 dark:text-gray-400 flex items-center">
                    <span className="font-bold">Type:</span>{" "}
                    <span className="ml-2">{campaign.type}</span>
                  </p>
                  <p className="text-gray-800 dark:text-gray-400 flex items-center">
                    <span className="font-bold">Minimum Donation:</span>{" "}
                    <span className="ml-2">${campaign.minimumDonation}</span>
                  </p>
                  <p className="text-gray-800 dark:text-gray-400 flex items-center">
                    <span className="font-bold">Deadline:</span>{" "}
                    <span className="ml-2">
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-800 dark:text-gray-400 flex items-center">
                    <span className="font-bold">Status:</span>{" "}
                    {new Date(campaign.deadline) > new Date() ? (
                      <FaCheckCircle className="text-green-600 dark:text-green-400 ml-2" />
                    ) : (
                      <FaTimesCircle className="text-red-600 dark:text-red-400 ml-2" />
                    )}
                  </p>
                </div>
                <Link to={`/AssignmentDetails/${campaign._id}`}>
                  <button className="w-full bg-teal-600 dark:bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mb-2">
                    See More
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-700 dark:text-gray-300">
            No running campaigns available at the moment.
          </p>
        )}
      </div></Zoom>
     
      <div className="text-center mt-8">
        <Link to={"/campaigns"}>
          <button className="bg-teal-600 dark:bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
            Show All Campaigns
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RunningCampaign;
