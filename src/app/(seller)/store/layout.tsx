import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogOut, Store, ShoppingBasket } from "lucide-react";
import Link from "next/link";

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
          <div
            id="card"
            className="bg-white rounded-2xl shadow-sm border border-border/50 p-2 h-full flex flex-col items-start justify-between"
          >
            <aside className="w-full">
              <Link href="/store/dashboard">
                <Button variant="link" className="text-black text-base">
                  <Store className="w-5 h-5" />
                  Store Dashboard
                </Button>
              </Link>
              <Separator />
              <Link href="/store/products">
                <Button variant="link" className="text-black text-base">
                  <ShoppingBasket className="w-5 h-5" />
                  Manage Products
                </Button>
              </Link>
            </aside>
            <Button variant="link" className="text-red-500 text-base">
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-4 h-full col-span-4 overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
