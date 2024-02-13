"use client";

import Image from "next/image";
import IconConfirmation from "../../public/assets/icon-confirmation.svg";
import Link from "next/link";
import { use, useContext } from "react";
import { Context } from "../context-provider";
import AddonItem from "../components/add-on-item";
import { postData } from "../lib/actions";

export default function Home() {
  const contextData = useContext(Context);
  const period = contextData.period === "monthly" ? "mo" : "yr";
  const miltiplier = contextData.period === "monthly" ? 1 : 10;
  const total = contextData.planPrice + (((contextData.addOns["onlineService"] ? 1 : 0) + (contextData.addOns["largerStorage"] ? 2 : 0) + (contextData.addOns["customizableProfile"] ? 2 : 0)) * miltiplier);

  const handleClick = async () => {
    try{
      console.log(contextData);

      const response = await postData({ name: contextData.name, email: contextData.email, phone: contextData.phone, plan: contextData.plan, period: contextData.period, addOns: contextData.addOns })
      console.log('Response from server:', response);

    } catch(error){
      console.error("Error:", error);
    }
  }

  return (
    <main className="main">
      <div className="w-full h-[512px] relative">
        {/* <Image src={IconConfirmation} alt="confirmation-svg" /> */}
        <h1 className="uppercase text-[32px] mb-3 font-bold leading-[37px] text-[#022959]">
          Finishing up
        </h1>
        <p className="mb-9 text-[#9699AA] leading-6">
          Double-check everything looks OK before confirming.
        </p>
        <div className="w-full flex flex-col px-6 pt-4 pb-6 bg-[#F8F9FF] gap-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-2">
              <p className="text-[#022959] font-medium leading-[18px] capitalize">
                {contextData.plan} ({contextData.period})
              </p>
              <Link
                href="/step2"
                className="text-[#9699AA] underline text-sm hover:text-[#483EFF]"
              >
                Change
              </Link>
            </div>
            <div className="text-[#022959] font-bold leading-5">
              ${contextData.planPrice}/
              {period}
            </div>
          </div>
          <div className="bg-[#9699AA] h-[1px] opacity-20 w-full mt-[6px]"></div>
          {contextData.addOns["onlineService"] &&
            <div className="flex justify-between items-center">
              <div className="text-[#9699AA] text-sm leading-5">
                Online service
              </div>
              <div className="text-[#022959] text-sm leading-5">
                +${(contextData.addOns["onlineService"] ? 1 : 0) * miltiplier}/{period}
              </div>
            </div>
          }

          {
            contextData.addOns["largerStorage"] &&
            <div className="flex justify-between items-center">
              <div className="text-[#9699AA] text-sm leading-5">
                Larger storage
              </div>
              <div className="text-[#022959] text-sm leading-5">
                +${(contextData.addOns["largerStorage"] ? 2 : 0) * miltiplier}/{period}
              </div>
            </div>
          }
          {
            contextData.addOns["customizableProfile"] &&
            <div className="flex justify-between items-center">
              <div className="text-[#9699AA] text-sm leading-5">
                Larger storage
              </div>
              <div className="text-[#022959] text-sm leading-5">
                +${(contextData.addOns["customizableProfile"] ? 2 : 0) * miltiplier}/{period}
              </div>
            </div>
          }
        </div>
        <div className="w-full flex flex-col px-6 mt-6">
          <div className="flex justify-between items-center">
            <div className="text-[#9699AA] text-sm leading-5">
              Total (per {contextData.period === "monthly" ? "month" : "year"})
            </div>
            <div className="text-[#483EFF] font-bold text-lg">
              +${total}/
              {period}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center absolute right-0 left-0 bottom-0">
          <Link
            href="/step3"
            className="font-medium leading-[18px] text-[#9699AA] hover:text-[#022959] active:scale-[0.92] duration-200 ease-in-out"
          >
            Go Back
          </Link>
          <button
            type="submit"
            className="capitalize w-[123px] h-12 flex justify-center items-center text-center rounded-lg font-medium leading-[18px] text-white bg-[#483EFF] hover:bg-[#928CFF] active:scale-[0.92] duration-200 ease-in-out disabled:cursor-not-allowed"
            onClick={handleClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </main>
  );
}
