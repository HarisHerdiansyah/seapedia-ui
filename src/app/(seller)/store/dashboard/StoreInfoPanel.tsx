"use client";

import { Store, MapPin, User, Mail, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMyStore } from "@/http/store";

export default function StoreInfoPanel() {
  const { data } = useQuery({
    queryKey: ["my-store"],
    queryFn: getMyStore,
    select: (data) => data.data,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="flex items-center gap-3">
        <Store className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Store Name</p>
          <p className="font-medium">{data?.storeName}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
          <p className="font-medium">{data?.location}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
          <p className="font-medium">{data?.username}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="font-medium">{data?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Joined At</p>
          <p className="font-medium">
            {data?.joinedAt
              ? new Date(data.joinedAt).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
