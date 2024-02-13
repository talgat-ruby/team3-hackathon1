"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Context } from "../context-provider";

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

type SchemaType = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const contextData = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SchemaType> = async (formData) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    contextData.name = formData.name;
    contextData.email = formData.email;
    contextData.phone = formData.phone;

    setIsLoading(false);

    router.push("/step2");
  };

  return (
    <main className="main font-ubuntu">
      <div className="w-full grid">
        <h1 className="uppercase text-[#022959] text-[32px] font-bold leading-[37px] mb-3">
          Personal info
        </h1>
        <p className="mb-9 text-[#9699AA] leading-6">
          Please provide your name, email address, and phone number.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="name" className="capitalize text-sm leading-4">
                Name
              </label>
              {errors.name && (
                <span className="text-[#EE374A] font-bold text-sm leading-4 text-right">
                  {errors.name.message}
                </span>
              )}
            </div>
            <input
              {...register("name")}
              id="name"
              type="text"
              placeholder="e.g. Stephen King"
              className="block w-full px-4 py-3 bg-white border-[#D6D9E6] border rounded-lg focus-visible:border-[#483eff]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="email" className="capitalize text-sm leading-4">
                Email address
              </label>
              {errors.email && (
                <span className="text-[#EE374A] font-bold text-sm leading-4 text-right">
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="e.g. stephenking@lorem.com"
              className="block w-full px-4 py-3 bg-white border-[#D6D9E6] border rounded-lg focus-visible:border-[#483eff]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="phone" className="capitalize text-sm leading-4">
                Phone number
              </label>
              {errors.phone && (
                <span className="text-[#EE374A] font-bold text-sm leading-4 text-right">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <InputMask
              {...register("phone")}
              id="phone"
              type="text"
              replacement={{ 9: /\d/ }}
              placeholder="+7 (999)-999-99-99"
              mask="+7 (999)-999-99-99"
              className="block w-full px-4 py-3 bg-white border-[#D6D9E6] border rounded-lg focus-visible:border-[#483eff]"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="capitalize w-[123px] h-12 self-end flex justify-center items-center text-center rounded-lg font-medium leading-[18px] text-white bg-[#022959] mt-[68px] hover:bg-[#164A8A] active:scale-[0.92] duration-200 ease-in-out disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <BeatLoader color="#ffffff" size={"10px"} speedMultiplier={0.7} />
            ) : (
              "Next Step"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
