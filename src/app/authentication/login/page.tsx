import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shrink-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Seapedia</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="justify-center">
          <p>
            Don't have an account yet?{" "}
            <Link
              href="/authentication/register"
              className="hover:cursor-pointer hover:underline"
            >
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
