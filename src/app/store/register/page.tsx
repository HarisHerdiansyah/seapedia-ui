import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StoreRegisterForm from "./StoreRegisterForm";

export default function StoreRegisterPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="max-w-lg w-full shrink-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Seapedia Store</CardTitle>
        </CardHeader>
        <CardContent>
          <StoreRegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
