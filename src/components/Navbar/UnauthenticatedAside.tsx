import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthenticatedAside() {
  return (
    <>
      <Link href="/authentication/register" className="w-full md:w-auto">
        <Button
          variant="outline"
          size="lg"
          className="border border-primary bg-primary-foreground cursor-pointer w-full"
        >
          Sign Up
        </Button>
      </Link>
      <Link href="/authentication/login" className="w-full md:w-auto">
        <Button size="lg" className="cursor-pointer w-full">
          Log In
        </Button>
      </Link>
    </>
  );
}
