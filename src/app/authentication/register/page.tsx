import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full shrink-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Seapedia</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="justify-center">
          <p>
            Already have an account?{" "}
            <Link
              href="/authentication/login"
              className="hover:cursor-pointer hover:underline"
            >
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
