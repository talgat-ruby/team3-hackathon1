import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "reset-css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import "./styles/global.css";
import SideNav from "./ui/side-nav";
const inter = Inter({ subsets: ["latin"] });
import ContextProvider from "./context-provider";

export const metadata: Metadata = {
  title: "Multi Step Form",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen w-full justify-center items-center bg-[#bee2fd]">
          <section className="max-w-[940px] w-full h-[600px] flex items-start p-4 gap-24 bg-white rounded-[15px]">
            <aside className="bg-[#483EFF] bg-[url('/assets/desktop/desktop-navigation.svg')] bg-[center_bottom_-8rem] bg-no-repeat flex flex-col pl-8 pr-[5.5625rem] py-10 rounded-[10px] h-full">
              <SideNav />
            </aside>

            <div className="max-w-[28.125rem] w-full h-full pt-10 pb-4 duration-200 ease-in-out">
              <ContextProvider>{children}</ContextProvider>

            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
