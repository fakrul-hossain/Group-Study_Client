import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Bounce } from "react-awesome-reveal";

const AddNewCampaign = () => {
  const { user } = useContext(AuthContext); // Access the current user's info from AuthContext

  const handleAddCampaign = (e) => {
    e.preventDefault();
    const form = e.target;

    // Collect form data
    const title = form.title.value;
    const type = form.type.value;
    const minimumDonation = form.minimumDonation.value;
    const deadline = form.deadline.value;
    const image = form.image.value;
    const description = form.description.value;
    const userEmail = user?.email || "N/A";
    const userName = user?.displayName || "Anonymous";

    const newCampaign = {
      title,
      type,
      minimumDonation,
      deadline,
      image,
      description,
      userEmail,
      userName,
    };
    console.log(newCampaign);

    // Post campaign data to the server
    fetch("https://crowdcube-server-xi.vercel.app/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCampaign),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Campaign added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          form.reset();
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to add campaign!",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((error) => {
        console.error("Error adding campaign:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while adding the campaign.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <Bounce>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-8">
          Add New Campaign
        </h1>
        <form
          onSubmit={handleAddCampaign}
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
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Campaign Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Campaign Type
              </label>
              <select
                name="type"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="">Select a type</option>
                <option value="personal">Personal Issue</option>
                <option value="startup">Startup</option>
                <option value="business">Business</option>
                <option value="creative">Creative Ideas</option>
              </select>
            </div>

            {/* Minimum Donation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Donation ($)
              </label>
              <input
                type="number"
                name="minimumDonation"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
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
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
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
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
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
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Description (Full Width) */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Campaign Description
            </label>
            <textarea
              name="description"
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 dark:bg-teal-700 text-white rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600"
            >
              Add Campaign
            </button>
          </div>
        </form>
      </div>
    </Bounce>
  );
};

export default AddNewCampaign;
