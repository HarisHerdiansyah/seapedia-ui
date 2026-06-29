import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SidebarContent from "./SidebarContent";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Navbar />
      <main className="flex-1 overflow-hidden p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-full">
          <div className="hidden lg:block h-full">
            <SidebarContent />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-4 h-full col-span-1 lg:col-span-4 overflow-y-auto flex flex-col">
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Menu className="h-4 w-4" />
                    Store Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-75 p-0 border-none">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
