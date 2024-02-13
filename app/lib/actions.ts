"use server";
import axios from "axios";

export const postData = async ({
  name,
  email,
  phone,
  plan,
  period,
  addOns,
}: {
  name: string;
  email: string;
  phone: string;
  plan: string;
  period: string;
  addOns: object;
}): Promise<{ status: number; message: string } | any> => {
  try {
    console.log(1);
    const response = await fetch("http://localhost:8081/api/v1/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        plan,
        period,
        addOns,
      }),
    });

    if (response.status === 204) {
      return { status: response.status, message: "Data posted successfully" };
    } else if (response.status === 400) {
      const data = await response.json();
      return data;
    } else {
      return response.status;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Error:", error);
    }

    return null;
  }
};
