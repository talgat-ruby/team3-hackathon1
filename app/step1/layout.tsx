import SideNav from "../ui/side-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-[#bee2fd]">
      <div className="max-w-[940px] w-full h-[600px] flex items-start p-4 gap-24 bg-white rounded-[15px]">
        <div className="flex flex-col w-[274px] h-full px-8 py-10 rounded-[10px] bg-[#483EFF] bg-center bg-no-repeat bg-cover">
          <SideNav />
        </div>
        <div className="h-full py-14">{children}</div>
      </div>
    </div>
  );
}
