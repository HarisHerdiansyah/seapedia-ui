import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItemData } from "./CartItem";

type CartSummaryProps = {
  items: CartItemData[];
};

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.1; // 10% tax for example
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Subtotal ({items.length} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Estimated Tax (10%)</span>
          <span className="font-medium">${taxAmount.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total</span>
          <span className="font-bold text-lg text-primary">${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
