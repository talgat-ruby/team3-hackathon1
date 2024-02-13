"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Context } from "../context-provider";
import Link from "next/link";

const schema = z.object({
  plan: z.string(),
  // period: z.string(),
});

type SchemaType = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const contextData = useContext(Context);
  const [isChecked, setIsChecked] = useState(
    contextData.period === "yearly" || false,
  );

  console.log(isChecked);

  const { register, handleSubmit } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SchemaType> = async (formData) => {
    setIsLoading(true);

    console.log(formData);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const period = isChecked ? "yearly" : "monthly";

    contextData.plan = formData.plan;
    contextData.period = period;
    let total = 0;
    if (period === "monthly") {
      if (formData.plan === "arcade") {
        total = 9;
      } else if (formData.plan === "advanced") {
        total = 12;
      } else {
        total = 15;
      }
    } else {
      if (formData.plan === "arcade") {
        total = 9 * 10;
      } else if (formData.plan === "advanced") {
        total = 12 * 10;
      } else {
        total = 15 * 10;
      }
    }
    contextData.planPrice = total;

    setIsLoading(false);
    router.push("/step3");
  };

  return (
    <main className="main font-ubuntu text-[--color-text-primary] min-h-[100%]">
      <h1 className="uppercase text-[32px] font-bold leading-[37px]">
        Select your plan
      </h1>
      <p className="mt-[0.75rem] mb-9 text-[--color-text-secondary]">
        You have the option of monthly or yearly billing.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <fieldset className="flex gap-[1.125rem]">
          <label htmlFor="plan1" className="cursor-pointer">
            <input
              {...register("plan")}
              type="radio"
              name="plan"
              id="plan1"
              value="arcade"
              defaultChecked={contextData.plan === "arcade"}
              className="hidden peer sr-only"
            />
            <div className="peer-checked:border-[--color-accent-purple] font-medium max-w-[8.625rem] grow-0 pt-[6.1875rem] pr-[4.3125rem] pb-4 pl-4 border border-solid border-[#D6D9E6] rounded-lg bg-[url('/assets/icon-arcade.svg')] bg-[15%_17%] bg-no-repeat">
              <p>Arcade</p>
              {!isChecked ? (
                <span className="font-normal">$9/mo</span>
              ) : (
                <span className="font-normal">$90/yr</span>
              )}
            </div>
          </label>

          <label htmlFor="plan2" className="cursor-pointer">
            <input
              {...register("plan")}
              type="radio"
              name="plan"
              id="plan2"
              value="advanced"
              defaultChecked={contextData.plan === "advanced"}
              className="hidden peer sr-only"
            />
            <div className="peer-checked:border-[--color-accent-purple] font-medium max-w-[8.625rem] grow-0 pt-[6.1875rem] pr-[4.3125rem] pb-4 pl-4 border border-solid border-[#D6D9E6] rounded-lg bg-[url('/assets/icon-advanced.svg')] bg-[15%_17%] bg-no-repeat">
              <p>Advanced</p>
              {!isChecked ? (
                <span className="font-normal">$12/mo</span>
              ) : (
                <span className="font-normal">$120/yr</span>
              )}
            </div>
          </label>

          <label htmlFor="plan3" className="cursor-pointer">
            <input
              {...register("plan")}
              type="radio"
              name="plan"
              id="plan3"
              value="pro"
              defaultChecked={contextData.plan === "pro"}
              className="hidden peer sr-only"
            />
            <div className="peer-checked:border-[--color-accent-purple] font-medium max-w-[8.625rem] grow-0 pt-[6.1875rem] pr-[4.3125rem] pb-4 pl-4 border border-solid border-[#D6D9E6] rounded-lg bg-[url('/assets/icon-pro.svg')] bg-[15%_17%] bg-no-repeat">
              <p>Pro</p>
              {!isChecked ? (
                <span className="font-normal">$15/mo</span>
              ) : (
                <span className="font-normal">$150/yr</span>
              )}
            </div>
          </label>
        </fieldset>

        <fieldset className="bg-[#F8F9FF] px-[8.375rem] py-[0.8125rem] text-[0.875rem] flex gap-6 text-[--color-text-primary]">
          <span>Monthly</span>
          <label htmlFor="switch" className="cursor-pointer">
            <input
              // {...register("period")}
              type="checkbox"
              name="period"
              defaultChecked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              id="switch"
              className="hidden peer"
            />
            <div
              className="inline-block w-[38px] h-[20px] bg-[--color-text-primary] rounded-[10px] relative
            after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-[12px] after:h-[12px] after:bg-white
            after:rounded-[90px] after:duration-[0.3s] peer-checked:after:left-[calc(100%-5px)] peer-checked:after:translate-x-[-100%]"
            ></div>
          </label>
          <span>Yearly</span>
        </fieldset>

        <section className="flex justify-between items-center mt-auto">
          <Link href="/step1" className="text-[--color-text-secondary]">
            Go Back
          </Link>

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
