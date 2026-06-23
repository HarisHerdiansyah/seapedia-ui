import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="max-w-lg w-full shrink-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Seapedia</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldSet>
              <FieldLegend>Login Form</FieldLegend>
              <FieldGroup>
                <Field className="gap-1">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@seapedia.com"
                  />
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder=""
                  />
                </Field>
              </FieldGroup>
              <Field>
                <Button type="button">Login</Button>
              </Field>
            </FieldSet>
          </form>
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
