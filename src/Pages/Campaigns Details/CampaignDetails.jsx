import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Rotate } from "react-awesome-reveal";

const CampaignDetails = () => {
  const [loading, setLoading] = useState(true);
  const campaignDetails = useLoaderData(); // Campaign data loaded from the server
  const { user } = useContext(AuthContext); // Get logged-in user details

  const { image, title, description, type, minimumDonation, _id, deadline } = campaignDetails;

  const handleDonate = () => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    if (currentDate > deadlineDate) {
      Swal.fire({
        title: "Campaign Expired",
        text: "This campaign has reached its deadline. Donations are no longer accepted.",
        icon: "info",
      });
      return;
    }

    const donationData = {
      image,
      title,
      description,
      type,
      minimumDonation,
      deadline,
      campaignId: _id,
      userEmail: user.email,
      userName: user.displayName,
      donatedAt: new Date().toISOString(),
    };

    fetch("https://crowdcube-server-xi.vercel.app/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          Swal.fire({
            title: "Donation Complete",
            text: `${title} donation successfully added.`,
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Something Went Wrong",
          text: `Unable to complete the donation for ${title}.`,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader border-t-4 border-b-4 border-teal-500 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    
  <Rotate><div className="container mx-auto px-4 py-10">
  <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-8">
    Campaign Details
  </h1>
  <div className="flex justify-center items-center">
    <div className="w-full md:max-w-md lg:max-w-lg xl:max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl dark:hover:shadow-teal-700 transition-shadow duration-300 px-4 md:px-6 lg:px-8 mx-auto">
      <img
        src={image}
        alt={title}
        className="h-64 rounded-md my-3 w-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3">{description}</p>
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-400">
            <span className="font-bold">Type:</span> {type}
          </p>
          <p className="text-gray-800 dark:text-gray-400">
            <span className="font-bold">Minimum Donation:</span> ${minimumDonation}
          </p>
          <p className="text-gray-800 dark:text-gray-400">
            <span className="font-bold">Deadline:</span>{" "}
            {new Date(deadline).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={handleDonate}
          className="w-full bg-teal-600 dark:bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Donate
        </button>
      </div>
    </div>
  </div>
</div></Rotate>
  );
};

export default CampaignDetails;
