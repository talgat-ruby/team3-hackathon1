"use server";
import axios from "axios";

export const postData = async ({ name,
  email,
  phone,
  plan,
  period,
  addOns }: { name: string, email: string, phone: string, plan: string, period: string, addOns: object }) => {

  try {
    console.log(1);
    const response = await fetch("http://localhost:8081/api/v1/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify({
        name,
        email,
        phone,
        plan,
        period,
        addOns
      })
    });

    if(response.status === 204){
      console.log("Server response:", response.status);
      return {message: "Data posted successfully"}
    }
    if(response.status === 400){
      const data = await response.json();
      return data;
    } console.log("Server response:", response.status);

    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Error:", error);
    }

    return null;
  }
};
