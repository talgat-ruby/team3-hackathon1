"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const pathname = usePathname();

  const list = [
    { label: "Your Info" },
    { label: "Select Plan" },
    { label: "Add-Ons" },
    { label: "Summary" },
  ];

  return (
    <div>
      <ul className="flex flex-row lg:flex-col lg:gap-8">
        {list.map((item, i) => (
          <li key={item.label}>
            <Link href={`/step` + (i + 1)}>
              <div className="flex gap-4 items-start">
                <div
                  className={`w-[33px] h-[33px] flex justify-center items-center text-sm leading-4 font-bold font-ubuntu border border-solid rounded-full duration-300 ease-in-out ${pathname === `/step${i + 1}` ? "bg-[#BEE2FD] text-[#022959] border-[#BEE2FD]" : "text-white border-white bg-transparent"}`}
                >
                  {i + 1}
                </div>
                <div className="flex flex-col text-left gap-1">
                  <p className="uppercase text-[#ABBCFF] text-xs leading-3 tracking-[0px]">
                    {`Step ${i + 1}`}
                  </p>
                  <p className="uppercase font-bold text-white text-sm leading-4 tracking-[1px]">
                    {item.label}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
