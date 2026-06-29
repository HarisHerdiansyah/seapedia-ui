import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

export type CartItemData = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartItemProps = {
  item: CartItemData;
};

export default function CartItem({ item }: CartItemProps) {
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-border rounded-xl bg-white shadow-sm">
      <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden border border-border">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between h-full w-full">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-semibold text-lg line-clamp-2">{item.name}</h3>
          <p className="font-bold text-primary whitespace-nowrap">
            ${item.price.toFixed(2)}
          </p>
        </div>
        
        <div className="flex justify-between items-end mt-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500 hidden sm:block">
              Subtotal: <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
            </p>
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 sm:hidden mt-2">
          Subtotal: <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
