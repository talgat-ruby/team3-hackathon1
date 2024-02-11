"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  plan: z.string(),
  period: z.string(),
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
        plan: formData.plan,
        period: formData.period,
        addOns: { onlineService: false, largerStorage: false },
      }),
    );
    setIsLoading(false);

    console.log(formData);
    console.log("thissss is the local storage", localStorage);

    router.push("/step3");
  };

  return (
    <main className="main font-ubuntu text-[--color-text-primary]">
      <h1 className="uppercase text-[32px] font-bold leading-[37px]">
        Select your plan
      </h1>
      <p className="mt-[0.75rem] mb-9 text-[--color-text-secondary]">
        You have the option of monthly or yearly billing.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <fieldset className="flex gap-[1.125rem]">
          <input
            {...register("plan")}
            type="radio"
            name="plan"
            id="plan1"
            value="arcade"
            defaultChecked
            className="hidden"
          />
          <label
            htmlFor="plan1"
            className="font-medium max-w-[8.625rem] grow-0 pt-[6.1875rem] pr-[4.3125rem] pb-4 pl-4 border border-solid border-[#D6D9E6] rounded-lg bg-[url('/assets/icon-arcade.svg')] bg-[15%_17%] bg-no-repeat"
          >
            <p>Arcade</p>
            <span className="font-normal">$9/mo</span>
          </label>

          <input
            {...register("plan")}
            type="radio"
            name="plan"
            id="plan2"
            value="advanced"
            className="hidden"
          />
          <label
            htmlFor="plan2"
            className="font-medium max-w-[8.625rem] grow-0 pt-[6.1875rem] pr-[4.3125rem] pb-4 pl-4 border border-solid border-[#D6D9E6] rounded-lg bg-[url('/assets/icon-advanced.svg')] bg-[15%_17%] bg-no-repeat"
          >
            <p>Advanced</p>
            <span className="font-normal">$12/mo</span>
          </label>

          <input
            {...register("plan")}
            type="radio"
            name="plan"
            id="plan3"
            value="pro"
            className="hidden"
          />
          <label
            htmlFor="plan3"
            className="font-medium max-w-[8.625rem] grow-0 pt-[6.1875rem] pr-[4.3125rem] pb-4 pl-4 border border-solid border-[#D6D9E6] rounded-lg bg-[url('/assets/icon-pro.svg')] bg-[15%_17%] bg-no-repeat"
          >
            <p>Pro</p>
            <span className="font-normal">$15/mo</span>
          </label>
        </fieldset>

        <fieldset>
          <input
            {...register("period")}
            type="radio"
            name="period"
            id="period1"
            value="monthly"
            defaultChecked
          />
          <label htmlFor="period1">Monthly</label>

          <input
            {...register("period")}
            type="radio"
            name="period"
            id="period2"
            value="yearly"
          />
          <label htmlFor="period2">Yearly</label>
        </fieldset>

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
    </main>
  );
}
