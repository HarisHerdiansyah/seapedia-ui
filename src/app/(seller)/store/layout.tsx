import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SidebarContent from "./SidebarContent";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Navbar />
      <main className="flex-1 overflow-hidden p-4">
        <div className="grid grid-cols-5 gap-4 h-full">
          <SidebarContent />
          <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-4 h-full col-span-4 overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
