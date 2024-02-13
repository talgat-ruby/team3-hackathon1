"use client";

import { createContext, use, useContext } from "react";

export type UserData = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  period: string;
  addOns: {
    onlineService?: boolean;
    largerStorage?: boolean;
    customizableProfile?: boolean;
  };
  planPrice: number;
};

const initialVal: UserData = {
  name: "",
  email: "",
  phone: "",
  plan: "",
  period: "",
  addOns: {
    onlineService: true,
    largerStorage: true,
    customizableProfile: true,
  },
  planPrice: 0,
};

initialVal.addOns["onlineService"];

export const Context = createContext<UserData>(initialVal);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value: UserData = useContext(Context);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
