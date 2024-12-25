import React, { useState, useEffect, useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { Bounce } from "react-awesome-reveal";
import Swal from "sweetalert2"; // For success/error messages
import { AuthContext } from "../../providers/AuthProvider";

const AllAssignments = () => {
  const assignments = useLoaderData();
  const [sortedAssignments, setSortedAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
   const { user } = useContext(AuthContext);

  useEffect(() => {
    setSortedAssignments([...assignments]);
    setLoading(false);
  }, [assignments]);

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...sortedAssignments].sort((a, b) => {
      return newOrder === "asc"
        ? a.marks - b.marks
        : b.marks - a.marks;
    });
    setSortedAssignments(sorted);
    setSortOrder(newOrder);
  };

  const handleDelete = (assignmentId, userEmail) => {
    console.log("Logged-in user's email:", user.email);
    console.log("Assignment user's email:", userEmail);
    console.log(assignmentId)
    
    if (userEmail !== user.email) {
      Swal.fire("Error", "You can only delete your own assignments!", "error");
      return;
    }
  
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/assignmentsDelete/${assignmentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              setSortedAssignments((prev) =>
                prev.filter((assignment) => assignment._id !== assignmentId)
              );
              Swal.fire("Deleted!", "Your assignment has been deleted.", "success");
            } else {
              Swal.fire("Error", data.message, "error");
            }
          })
          .catch((err) => {
            Swal.fire("Error", "Something went wrong while deleting.", "error");
          });
      }
    });
  };
  
  

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
        <h1 className="text-2xl font-bold mb-6 text-center text-teal-700 dark:text-teal-300">
          All Assignments
        </h1>

        <div className="flex justify-end mb-4">
          <button
            onClick={handleSort}
            className="flex items-center font-semibold bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors duration-200 dark:bg-amber-500 dark:hover:bg-amber-600"
          >
            {sortOrder === "asc" ? <FaSortAmountUp className="mr-2" /> : <FaSortAmountDown className="mr-2" />}
            Sort by Marks
          </button>
        </div>

        <div className="overflow-x-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 text-sm rounded-lg">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                  Thumbnail
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                  Title
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                  Difficulty
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                  Marks
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedAssignments.map((assignment) => (
                <tr
                  key={assignment._id}
                  className="hover:bg-teal-100 dark:hover:bg-teal-800 bg-white dark:bg-gray-900 transition-colors duration-200"
                >
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                    <img
                      src={assignment.image || "/default-thumbnail.jpg"}
                      alt={assignment.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
                    {assignment.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300">
                    {assignment.difficulty}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-300">
                    {assignment.marks}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 space-x-2">
                    <Link to={`/assignmentDetails/${assignment._id}`}>
                      <button className="inline-block rounded bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700">
                        View
                      </button>
                    </Link>
                    <Link to={`/updateAssignment/${assignment._id}`}>
                      <button className="inline-block rounded bg-amber-500 px-4 py-2 text-xs font-medium text-white hover:bg-amber-600">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(assignment._id, assignment.userEmail)}
                      className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Bounce>
  );
};

export default AllAssignments;
