import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Bounce, Slide, Zoom } from "react-awesome-reveal";

const TopAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  // Fetch top assignments from the database
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/assignments`) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        const currentDate = new Date();
        // Filter assignments where the due date has not passed
        const topAssignments = data.filter(
          (assignment) => new Date(assignment.dueDate) > currentDate
        );
        setAssignments(topAssignments);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <Slide>
        <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-400 text-center mb-2">
          Top Assignments
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-8">
          Explore ongoing assignments and get started on your submissions.
        </p>
      </Slide>

      <Zoom>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assignments.length > 0 ? (
            assignments.slice(0, 6).map((assignment) => (
              <div
                key={assignment._id}
                className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 px-4 md:px-6 lg:px-8 mx-auto"
              >
                <img
                  src={assignment.image || "https://via.placeholder.com/150"}
                  alt={assignment.title}
                  className="h-64 rounded-md my-3 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                    {assignment.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {assignment.description.length > 100
                      ? `${assignment.description.substring(0, 100)}...`
                      : assignment.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-gray-800 dark:text-gray-400 flex items-center">
                      <span className="font-bold">Difficulty:</span>{" "}
                      <span className="ml-2">{assignment.difficulty}</span>
                    </p>
                    <p className="text-gray-800 dark:text-gray-400 flex items-center">
                      <span className="font-bold">Marks:</span>{" "}
                      <span className="ml-2">{assignment.marks}</span>
                    </p>
                    <p className="text-gray-800 dark:text-gray-400 flex items-center">
                      <span className="font-bold">Due Date:</span>{" "}
                      <span className="ml-2">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-gray-800 dark:text-gray-400 flex items-center">
                      <span className="font-bold">Status:</span>{" "}
                      {assignment.status === "complete" ? (
                        <FaCheckCircle className="text-green-600 dark:text-green-400 ml-2" />
                      ) : (
                        <FaTimesCircle className="text-red-600 dark:text-red-400 ml-2" />
                      )}
                      <span
                        className={`ml-2 ${
                          assignment.status === "complete"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {assignment.status === "complete" ? "Complete" : "Pending"}
                      </span>
                    </p>
                  </div>
                  <Link to={`/AssignmentDetails/${assignment._id}`}>
                    <button className="w-full bg-teal-600 dark:bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mb-2">
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-700 dark:text-gray-300">
              No ongoing assignments available at the moment.
            </p>
          )}
        </div>
      </Zoom>

      <div className="text-center mt-8">
        <Link to={"/AllAssignments"}>
          <button className="bg-teal-600 dark:bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-700 dark:hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
            Show All Assignments
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopAssignments;
