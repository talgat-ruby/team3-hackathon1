"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z.object({
  addOds: z.object({
    onlineService: z.boolean(),
    largerStorage: z.boolean(),
    customizableProfile: z.boolean(),
  }),
});

type SchemaType = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SchemaType> = async (formData) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    localStorage.setItem(
      "userData",
      JSON.stringify({
        addOns: { 
          onlineService: false || formData.addOds.onlineService, 
          largerStorage: false || formData.addOds.largerStorage,
          customizableProfile: false || formData.addOds.customizableProfile,
        },
      }),
    );
    setIsLoading(false);

    router.push("/step4");
  };

  return (
    <main className="main font-ubuntu text-[--color-text-primary]">
      <h1 className="uppercase text-[32px] font-bold leading-[37px]">
        Pick add-ons
      </h1>
      <p className="mt-[0.75rem] mb-9 text-[--color-text-secondary]">
        Add-ons help enhance your gaming experience.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <fieldset className="flex flex-col gap-4">
          <div className="pt-4 pr-6 pb-5 pl-6 border border-solid rounded-lg border-[#D6D9E6] min-w-[28.125rem]">
            <input
              {...register("addOds.onlineService")}
              type="checkbox"
              id="onlineService"
              name="onlineService"
              value="true"
            />
            <label htmlFor="onlineService">Online service</label>
            <p>Access to multiplayer games</p>
          </div>

          <div className="pt-4 pr-6 pb-5 pl-6 border border-solid rounded-lg border-[#D6D9E6] min-w-[28.125rem]">
            <input
              {...register("addOds.largerStorage")}
              type="checkbox"
              id="largerStorage"
              name="largerStorage"
              value="true"
            />
            <label htmlFor="largerStorage">Larger storage</label>
            <p>Extra 1TB of cloud save</p>
          </div>

          <div className="pt-4 pr-6 pb-5 pl-6 border border-solid rounded-lg border-[#D6D9E6] min-w-[28.125rem]">
            <input
              {...register("addOds.customizableProfile")}
              type="checkbox"
              id="customizableProfile"
              name="customizableProfile"
              value="true"
            />
            <label htmlFor="customizableProfile">Customizable profile</label>
            <p>Custom theme on your profile</p>
          </div>
        </fieldset>
        <section className="flex justify-between items-center">
          <Link href="/step2">Go Back</Link>

          <button
            type="submit"
            disabled={isLoading}
            className="capitalize w-[123px] h-12 self-end flex justify-center items-center text-center rounded-lg font-medium leading-[18px] text-white bg-[#022959] hover:bg-[#164A8A] active:scale-[0.92] duration-200 ease-in-out disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <BeatLoader color="#ffffff" size={"10px"} speedMultiplier={0.7} />
            ) : (
              "Next Step"
            )}
          </button>
        </section>
      </form>
    </main>
  );
}
