import axios from "axios";

 async function assignmentsDetails(id) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/assignments/${id}`,{
    withCredentials: true
  });

  return response.data;
}
 async function updateAssignment(id) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/assignments/${id}`,{
    withCredentials: true
  });

  return response.data;
}



export  {
    assignmentsDetails,
    updateAssignment,
}
