import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-border/50 py-6 px-12 flex items-center gap-8">
        <aside className="rounded-full w-36 h-36 relative">
          <Image
            src="https://placehold.co/144/ecfdf5/007a55.avif"
            alt="Image"
            className="rounded-full object-cover"
            loading="eager"
            fill
          />
        </aside>
        <article>
          <p className="text-2xl font-semibold">Profile Username</p>
          <div className="my-2">
            <p className="text-sm">Selectod Role: Admin</p>
            <p className="text-sm">Active Since: Admin</p>
          </div>
        </article>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 text-base">
            <div>
              <label className="font-semibold">Username</label>
              <p>Haris Herdiansyah</p>
            </div>
            <div>
              <label className="font-semibold">Email</label>
              <p>haris54237@gmail.com</p>
            </div>
            <div>
              <label className="font-semibold">Selected Role</label>
              <p>Buyer</p>
            </div>
            <div>
              <label className="font-semibold">Allowed Roles</label>
              <p>Buyer, Seller, Driver</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
