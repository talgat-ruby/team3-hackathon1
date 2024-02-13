"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Context } from "../context-provider";
import Link from "next/link";

const schema = z.object({
  addOds: z.object({
    // onlineService: z.boolean(),
    // largerStorage: z.boolean(),
    // customizableProfile: z.boolean(),
  }),
});

type SchemaType = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const contextData = useContext(Context);
  const [isChecked1, setIsChecked1] = useState(
    contextData.addOns.onlineService || false,
  );
  const [isChecked2, setIsChecked2] = useState(
    contextData.addOns.largerStorage || false,
  );
  const [isChecked3, setIsChecked3] = useState(
    contextData.addOns.customizableProfile || false,
  );

  console.log(contextData);

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleCheckboxChange3 = () => {
    setIsChecked3(!isChecked3);
  };

  const { register, handleSubmit } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    contextData.addOns.onlineService = isChecked1;
    contextData.addOns.largerStorage = isChecked2;
    contextData.addOns.customizableProfile = isChecked3;

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
      <form className="flex flex-col gap-6">
        <fieldset className="flex flex-col gap-4">
          <div
            className={`border border-solid ${isChecked1 ? "border-[#483EFF]" : "border-[#D6D9E6]"} flex gap-6 items-center pt-4 pr-6 pb-5 pl-6 rounded-lg min-w-[28.125rem]`}
          >
            <input
              // {...register("addOds.onlineService")}
              type="checkbox"
              id="onlineService"
              name="onlineService"
              value="true"
              checked={isChecked1}
              onChange={handleCheckboxChange1}
            />

            <div>
              <label htmlFor="onlineService">Online service</label>
              <p className="text-[--color-text-secondary]">
                Access to multiplayer games
              </p>
            </div>

            <div className="ml-auto text-[14px] text-[--color-accent-purple]">
              {contextData.period === "monthly" ? (
                <span>+$1/mo</span>
              ) : (
                <span>+$10/yr</span>
              )}
            </div>
          </div>

          <div
            className={`border border-solid ${isChecked2 ? "border-[#483EFF]" : "border-[#D6D9E6]"} flex gap-6 items-center pt-4 pr-6 pb-5 pl-6 border rounded-lg border-[#D6D9E6] min-w-[28.125rem]"`}
          >
            <input
              // {...register("addOds.largerStorage")}
              type="checkbox"
              id="largerStorage"
              name="largerStorage"
              value="true"
              checked={isChecked2}
              onChange={handleCheckboxChange2}
            />
            <div>
              <label htmlFor="largerStorage">Larger storage</label>
              <p className="text-[--color-text-secondary]">
                Extra 1TB of cloud save
              </p>
            </div>

            <div className="ml-auto text-[14px] text-[--color-accent-purple]">
              {contextData.period === "monthly" ? (
                <span>+$2/mo</span>
              ) : (
                <span>+$20/yr</span>
              )}
            </div>
          </div>

          <div
            className={`border border-solid ${isChecked3 ? "border-[#483EFF]" : "border-[#D6D9E6]"} flex gap-6 items-center pt-4 pr-6 pb-5 pl-6 rounded-lg border-[#D6D9E6] min-w-[28.125rem]`}
          >
            <input
              // {...register("addOds.customizableProfile")}
              type="checkbox"
              id="customizableProfile"
              name="customizableProfile"
              value="true"
              checked={isChecked3}
              onChange={handleCheckboxChange3}
            />
            <div>
              <label htmlFor="customizableProfile">Customizable profile</label>
              <p className="text-[--color-text-secondary]">
                Custom theme on your profile
              </p>
            </div>

            <div className="ml-auto text-[14px] text-[--color-accent-purple]">
              {contextData.period === "monthly" ? (
                <span>+$2/mo</span>
              ) : (
                <span>+$20/yr</span>
              )}
            </div>
          </div>
        </fieldset>
        <section className="flex justify-between items-center">
          <Link href="/step2" className="text-[--color-text-secondary]">
            Go Back
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            onClick={onSubmit}
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
