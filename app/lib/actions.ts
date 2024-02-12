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

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Error:", error);
    }

    return null;
  }
};
