import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Bounce } from "react-awesome-reveal";
import { FaCheckCircle } from "react-icons/fa"; // Import the check icon

const MyAssignment = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

  // Fetch user's assignments
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/submissions?email=${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch assignments");
          }
          return res.json();
        })
        .then((data) => {
          setAssignments(data);
          setLoading(false); // Stop loading after data is fetched
        })
        .catch((err) => {
          console.error("Error fetching assignments:", err);
          Swal.fire("Error", "Unable to load assignments. Please try again later.", "error");
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
    <Bounce>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-teal-700 dark:text-teal-400">
          My Assignments
        </h1>
        {assignments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            You have not submitted any assignments yet.
          </p>
        ) : (
          <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-700 text-sm rounded-lg">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">Title</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">Status</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">Total Marks</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">Obtained Marks</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {assignments.map((assignment) => (
                  <tr
                    key={assignment._id}
                    className="hover:bg-teal-100 dark:hover:bg-teal-700 bg-white dark:bg-gray-800 drop-shadow-md transition-colors duration-200"
                  >
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-200">
                      {assignment.title}
                    </td>
                    <td
                      className={`whitespace-nowrap px-4 py-2 flex items-center gap-2 ${
                        assignment.status === "completed"
                          ? "text-green-700 dark:text-green-300"
                          : "text-red-700 dark:text-red-300"
                      }`}
                    >
                      {assignment.status === "completed" ? (
                        <>
                          <FaCheckCircle /> Complete
                        </>
                      ) : (
                        "pending"
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300">
                      {assignment.marks || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300">
                      {assignment.obtainMarks ? assignment.obtainMarks : "Not Graded"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300">
                      {assignment.feedback || "No feedback yet"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Bounce>
  );
};

export default MyAssignment;
