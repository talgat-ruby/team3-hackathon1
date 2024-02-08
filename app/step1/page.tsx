"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormFieldValues = {
  name: string;
  email: string;
  phone: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFieldValues>();

  const onSubmit: SubmitHandler<FormFieldValues> = (data) => {
    console.log(data);
  };

  return (
    <main className="main font-ubuntu">
      <div className="max-w-[450px] w-full grid">
        <h1 className="uppercase text-[32px] font-bold leading-[37px] ">
          Personal info
        </h1>
        <p className="mb-9">
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
              {...register("name", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Minimum length is 2 letters",
                },
              })}
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
              {...register("email", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5 letters",
                },
              })}
              id="email"
              type="text"
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
            <input
              {...register("phone", {
                required: "This field is required",
              })}
              id="phone"
              type="text"
              placeholder="e.g. +1 234 567 890"
              className="block w-full px-4 py-3 bg-white border-[#D6D9E6] border rounded-lg focus-visible:border-[#483eff]"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="capitalize w-[123px] h-12 self-end flex justify-center items-center text-center rounded-lg font-medium leading-[18px] text-white bg-[#022959] mt-[68px] hover:bg-[#164A8A] active:scale-[0.92] duration-200 ease-in-out"
          >
            Next Step
          </button>
        </form>
      </div>
    </main>
  );
}
