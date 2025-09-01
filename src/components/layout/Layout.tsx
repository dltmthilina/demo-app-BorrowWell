import { Bell, HelpCircle, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className=" flex flex-col bg-white h-screen">
      <header className="w-full bg-white shadow px-4 py-4 flex items-center justify-between border">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-primary">Demo</h1>
          <h1 className="text-xl md:text-2xl ">App</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className=" rounded-full bg-muted">
            <Search className="w-2 h-2 md:w-5 md:h-5 text-black" />
          </Button>
          <Button size="sm" className="p-1 rounded-full bg-muted">
            <HelpCircle className="w-2 h-2 md:w-5 md:h-5 text-black" />
          </Button>
          <Button size="sm" className="p-2 rounded-full bg-muted ">
            <Bell className="w-2 h-2 md:w-5 md:h-5 text-black" />
          </Button>
        </div>
      </header>
      <div className="h-full ">
        <Outlet />
      </div>
    </div>
  );
}
