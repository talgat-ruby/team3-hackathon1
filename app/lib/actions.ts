"use server";
import axios from "axios";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, { message: "This field is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .email({ message: "Invalid email" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .regex(/^\+\d{1,3} \(\d{3}\)-\d{3}-\d{2}-\d{2}$/, {
      message: "Invalid phone number format",
    })
    .transform((value) => value.replace(/\s|\(|\)|-/g, "")),
});

export const usePersonalInfoForm = async (formData: FormData) => {
  try {
    const { name, email, phone } = schema.parse({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    });

    const response = await axios.post("http://localhost:8081/api/v1/forms", {
      headers: {
        "Content-Type": "application/json",
      },
      name,
      email,
      phone,
      plan: "arcade",
      period: "monthly",
      addOns: { onlineService: true, largerStorage: true },
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
