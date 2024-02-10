"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { usePersonalInfoForm } from "../lib/actions";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
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
        <form action={usePersonalInfoForm} className="flex flex-col gap-6">
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
            // disabled={}
            className="capitalize w-[123px] h-12 self-end flex justify-center items-center text-center rounded-lg font-medium leading-[18px] text-white bg-[#022959] mt-[68px] hover:bg-[#164A8A] active:scale-[0.92] duration-200 ease-in-out"
          >
            {/* {pending ? "Processing" : "Next Step"} */}
            Next Step
          </button>
        </form>
      </div>
    </main>
  );
}
