import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Bounce } from "react-awesome-reveal";

const UpdateAssignment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const assignmentData = useLoaderData();

  // Check if the logged-in user is the creator of the assignment
  useEffect(() => {
    if (user?.email !== assignmentData?.userEmail) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are not authorized to update this assignment.",
      }).then(() => {
        navigate("/AllAssignments");
      });
    }
  }, [user, assignmentData, navigate]);

  // Form data state
  const [formData, setFormData] = useState({
    title: assignmentData?.title || "",
    description: assignmentData?.description || "",
    difficulty: assignmentData?.difficulty || "Medium", // Default difficulty set to 'Medium'
    marks: assignmentData?.marks || "",
    dueDate: assignmentData?.dueDate || "",
    imageUrl: assignmentData?.imageUrl || "https://via.placeholder.com/150", // Default image URL
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/assignments/${assignmentData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success", "Assignment updated successfully!", "success");
          navigate("/AllAssignments");
        } else {
          Swal.fire("Error", "Failed to update the assignment.", "error");
        }
      })
      .catch((error) => {
        console.error("Update Error:", error);
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  return (
    <Bounce>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-8">
          Update Assignment
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Assignment Title
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Marks
            </label>
            <input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate.split("T")[0]} // Format date for input
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
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

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={assignmentData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400"
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </Bounce>
  );
};

export default UpdateAssignment;
