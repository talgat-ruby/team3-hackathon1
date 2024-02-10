"use server";
import axios from "axios";

export const usePersonalInfoForm = async () => {
  try {
    const storedDataString = localStorage.getItem("userData");
    if (!storedDataString) return;

    const storedData = JSON.parse(storedDataString);

    const response = await axios.post("http://localhost:8081/api/v1/forms", {
      headers: {
        "Content-Type": "application/json",
      },
      storedData,
    });

    console.log("Server response:", response.status, response.data);

    return response.data; // Return data from the server if needed
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      console.error("Axios error:", error.message);
    } else {
      // Handle other errors
      console.error("Error:", error);
    }

    // Return null or throw an error as needed
    return null;
  }
};
