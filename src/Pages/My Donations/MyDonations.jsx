import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Flip, Hinge, JackInTheBox, Roll, Slide, Zoom } from "react-awesome-reveal";

const MyDonations = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user from context
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://crowdcube-server-xi.vercel.app/myDonation?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setDonations(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching donations:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader border-t-4 border-b-4 border-teal-500 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    
  <Slide>
<div className="container mx-auto px-4 py-6">
  <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-400 text-center mb-6">
    My Donations
  </h1>
  {donations.length === 0 ? (
    <p className="text-center text-gray-500 dark:text-gray-400">No donations found.</p>
  ) : (
    <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
      {donations.map((donation) => (
        <div
          key={donation._id}
          className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-4"
        >
          <img
            src={donation.image}
            alt={donation.title}
            className="h-[350px] w-full object-cover sm:h-[450px] transition-transform duration-300 group-hover:scale-105"
          />
          <div className="mt-4">
            <h3 className="text-xl font-bold text-teal-700 dark:text-teal-400 group-hover:underline group-hover:underline-offset-4">
              {donation.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
              {donation.description}
            </p>
            <div className="mt-3 text-gray-900 dark:text-gray-100 text-sm">
              <p>
                <span className="font-semibold">Type:</span> {donation.type}
              </p>
              <p>
                <span className="font-semibold">Minimum Donation:</span> $
                {donation.minimumDonation}
              </p>
              <p>
                <span className="font-semibold">Deadline:</span>{" "}
                {new Date(donation.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  </Slide>
  );
};

export default MyDonations;
