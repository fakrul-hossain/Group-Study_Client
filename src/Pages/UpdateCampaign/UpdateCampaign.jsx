import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Bounce } from "react-awesome-reveal";

const UpdateCampaign = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const updateCampaign = useLoaderData();

  // State for form data
  const [formData, setFormData] = useState({
    title: updateCampaign.title,
    type: updateCampaign.type,
    minimumDonation: updateCampaign.minimumDonation,
    deadline: updateCampaign.deadline,
    description: updateCampaign.description,
    image: updateCampaign.image || "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated data to the server
    fetch(`https://crowdcube-server-xi.vercel.app/campaigns/${updateCampaign._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire("Success", "Campaign updated successfully!", "success");
          navigate("/myCampaigns");
        } else {
          Swal.fire("Error", "Failed to update campaign", "error");
        }
      })
      .catch((error) => {
        console.error("Update Error:", error);
        Swal.fire("Error", "Something went wrong!", "error");
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
 
<Bounce>
<div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-8">
    Update Campaign
  </h1>
  <form
    onSubmit={handleSubmit}
    className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg"
  >
    {/* Two-column Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Campaign Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Campaign Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>

      {/* Campaign Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Campaign Type
        </label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>

      {/* Minimum Donation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Minimum Donation ($)
        </label>
        <input
          type="number"
          name="minimumDonation"
          value={formData.minimumDonation}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Deadline
        </label>
        <input
          type="date"
          name="deadline"
          value={formData.deadline.split("T")[0]} // Format date for input
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />
      </div>

      {/* User Name (Read-Only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          User Name
        </label>
        <input
          type="text"
          value={user?.displayName || "Anonymous"}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-gray-900 dark:text-gray-300"
        />
      </div>

      {/* User Email (Read-Only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          User Email
        </label>
        <input
          type="email"
          value={user?.email || "N/A"}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 cursor-not-allowed text-gray-900 dark:text-gray-300"
        />
      </div>
    </div>

    {/* Image Field (Full Width) */}
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Campaign Image URL
      </label>
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
      />
    </div>

    {/* Description (Full Width) */}
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Campaign Description
      </label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="text-center mt-6">
      <button
        type="submit"
        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400"
      >
        Update Campaign
      </button>
    </div>
  </form>
</div>
</Bounce>
  );
};

export default UpdateCampaign;
