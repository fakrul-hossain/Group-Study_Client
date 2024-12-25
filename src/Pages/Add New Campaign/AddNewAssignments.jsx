import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Bounce } from "react-awesome-reveal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNewAssignments = () => {
  const { user } = useContext(AuthContext); // Access the current user's info from AuthContext
  const [dueDate, setDueDate] = useState(null); // State for storing selected due date
  const creationDate = new Date().toLocaleString(); // Capture current date and time for creation

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const form = e.target;

    // Collect form data
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.value;
    const difficulty = form.difficulty.value;
    const marks = form.marks.value; // Get the marks from the form
    const userEmail = user?.email || "N/A";
    const userName = user?.displayName || "Anonymous";

    // Validate the due date
    if (!dueDate) {
      Swal.fire({
        title: "Error",
        text: "Please select a due date.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Validate marks field
    if (!marks || isNaN(marks) || marks <= 0) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid marks value greater than 0.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Create new assignment object
    const newAssignment = {
      title,
      description,
      image,
      difficulty,
      marks, // Include marks in the new assignment object
      dueDate,
      creationDate,
      userEmail,
      userName,
    };
    console.log(newAssignment);

    // Post assignment data to the server
    fetch("http://localhost:5000/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Assignment created successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          form.reset();
          setDueDate(null); // Reset the due date after successful submission
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to create assignment!",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      })
      .catch((error) => {
        console.error("Error creating assignment:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while creating the assignment.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <Bounce>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-8">
          Add New Assignment
        </h1>
        <form
          onSubmit={handleAddAssignment}
          className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Assignment Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Assignment Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Marks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Marks
              </label>
              <input
                type="number"
                name="marks"
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
 {/* Due Date */}
 <div className="">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="yyyy-MM-dd"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              required
            />
          </div>
            {/* User Name */}
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

            {/* User Email */}
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

          {/* Image URL */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Assignment Image URL
            </label>
            <input
              type="text"
              name="image"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Assignment Description
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
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </Bounce>
  );
};

export default AddNewAssignments;
