import { Bell, HelpCircle, MenuIcon, Search} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">Demo</h1>
          <h1 className="text-2xl ">App</h1>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button className="p-2 rounded-full hover:bg-neutral-100">
            <Search className="w-5 h-5 text-neutral-600" />
          </Button>
          <Button className="p-2 rounded-full hover:bg-neutral-100">
            <HelpCircle className="w-5 h-5 text-neutral-600" />
          </Button>
          <Button className="p-2 rounded-full hover:bg-neutral-100">
            <Bell className="w-5 h-5 text-neutral-600" />
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button
                variant="outline"
                className="bg-white border border-primary"
              >
                {<MenuIcon className="text-primary" />}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-primary">Demo</h1>
                  <h1 className="text-2xl ">App</h1>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="m-2">
        <Outlet />
      </div>
    </div>
  );
}
