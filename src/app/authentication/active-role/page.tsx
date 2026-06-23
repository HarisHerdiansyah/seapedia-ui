import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function ActiveRolePage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full shrink-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Select Active Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Card className="cursor-pointer bg-primary-foreground border border-primary">
                <CardContent className="relative h-32">
                  <Image
                    src="/buyer-role.svg"
                    alt="Buyer"
                    className="object-contain"
                    fill
                  />
                </CardContent>
                <CardFooter className="justify-center">
                  <p className="text-lg">Buyer</p>
                </CardFooter>
              </Card>
              <Card className="cursor-pointer">
                <CardContent className="relative h-32">
                  <Image
                    src="/seller-role.svg"
                    alt="Seller"
                    className="object-contain"
                    fill
                  />
                </CardContent>
                <CardFooter className="justify-center">
                  <p className="text-lg">Seller</p>
                </CardFooter>
              </Card>
              <Card className="cursor-pointer">
                <CardContent className="relative h-32">
                  <Image
                    src="/driver-role.svg"
                    alt="Driver"
                    className="object-contain"
                    fill
                  />
                </CardContent>
                <CardFooter className="justify-center">
                  <p className="text-lg">Driver</p>
                </CardFooter>
              </Card>
            </div>
          </CardContent>
          <CardFooter className="">
            <Button className="w-full">Select Role</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
