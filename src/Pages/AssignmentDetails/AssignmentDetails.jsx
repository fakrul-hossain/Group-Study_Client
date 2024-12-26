import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Rotate } from "react-awesome-reveal";

const AssignmentDetails = () => {
  const [loading, setLoading] = useState(true);
  const assignmentDetails = useLoaderData(); // Assignment data loaded from the server
  const { user } = useContext(AuthContext); // Logged-in user details

  const {
    _id,
    title,
    description,
    image,
    difficulty,
    dueDate,
    creationDate,
    userEmail,
    userName,
    marks,
  } = assignmentDetails;

  const handleTakeAssignment = () => {
    Swal.fire({
      title: "Submit Assignment",
      html: `
        <form id="assignmentSubmissionForm">
          <div class="mb-4">
            <label for="docsLink" class="block text-gray-700">Google Docs Link:</label>
            <input
              type="url"
              id="docsLink"
              name="docsLink"
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your Google Docs link"
              required
            />
          </div>
          <div class="mb-4">
            <label for="quickNote" class="block text-gray-700">Quick Note:</label>
            <textarea
              id="quickNote"
              name="quickNote"
              class="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              placeholder="Add a quick note (optional)"
              required
            ></textarea>
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const docsLink = document.getElementById("docsLink").value;
        const quickNote = document.getElementById("quickNote").value;
        if (docsLink && quickNote) {
          Swal.showValidationMessage("Google Docs link is required");
        }
        return { docsLink, quickNote };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const submissionData = {
          assignmentId: _id,
          title,
          description,
          image,
          difficulty,
          dueDate,
          creationDate,
          userEmail: user.email, // Currently logged-in user's email
          userName: user.displayName, // Currently logged-in user's name
          marks,
          docsLink: result.value.docsLink,
          quickNote: result.value.quickNote,
          status: "pending",
          submittedAt: new Date().toISOString(),
        };
  
        fetch(`${import.meta.env.VITE_API_URL}/submissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              Swal.fire({
                title: "Submission Successful",
                text: "Your assignment has been submitted successfully.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Submission Failed",
              text: "Something went wrong while submitting your assignment.",
              icon: "error",
            });
          });
      }
    });
  };
  

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Loading delay
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader border-t-4 border-b-4 border-teal-500 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Rotate>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-8">
          Assignment Details
        </h1>
        <div className="flex justify-center items-center">
          <div className="w-full md:max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl dark:hover:shadow-teal-700 transition-shadow duration-300 px-4 py-6 mx-auto">
            <img
              src={image}
              alt={title}
              className="h-64 w-full object-cover rounded-md my-3 transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">{title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{description}</p>
              <p className="text-gray-800 dark:text-gray-400">
                <span className="font-bold">Difficulty:</span> {difficulty}
              </p>
              <p className="text-gray-800 dark:text-gray-400">
                <span className="font-bold">Marks:</span> {marks}
              </p>
              <p className="text-gray-800 dark:text-gray-400">
                <span className="font-bold">Due Date:</span> {new Date(dueDate).toLocaleDateString()}
              </p>
              <p className="text-gray-800 dark:text-gray-400">
                <span className="font-bold">Created On:</span> {creationDate}
              </p>
              <p className="text-gray-800 dark:text-gray-400">
                <span className="font-bold">Created By:</span> {userName} ({userEmail})
              </p>
              <button
                onClick={handleTakeAssignment}
                className="w-full bg-teal-600 dark:bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mt-4"
              >
                Take Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Rotate>
  );
};

export default AssignmentDetails;
