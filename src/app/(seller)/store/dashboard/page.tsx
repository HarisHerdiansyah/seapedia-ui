import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import StoreInfoPanel from "./StoreInfoPanel";

const storeStats = [
  {
    icon: Package,
    label: "Total Registered Products",
    value: "0",
    color: "blue",
  },
  {
    icon: ShoppingCart,
    label: "Total Sold Products",
    value: "0",
    color: "green",
  },
  {
    icon: DollarSign,
    label: "Total Sales",
    value: "$0.00",
    color: "yellow",
  },
  {
    icon: TrendingUp,
    label: "Best Selling Category",
    value: "-",
    color: "purple",
  },
];

const colorStyles: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  yellow:
    "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  purple:
    "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
};

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
      <div
        className={`p-3 rounded-full mb-3 ${colorStyles[color] || colorStyles.blue}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default async function StorePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-2xl font-semibold text-primary mb-4">
          Store Dashboard
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold border-b border-gray-100 dark:border-gray-700 pb-2">
          Store Information
        </h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeInfoItems.map((item, index) => (
            <StoreInfoItem key={index} {...item} />
          ))}
        </div> */}
        <StoreInfoPanel />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {storeStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}
