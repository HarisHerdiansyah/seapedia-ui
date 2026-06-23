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
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="max-w-3xl w-full shrink-0">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Seapedia</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <FieldSet>
              <FieldLegend>Registration Form</FieldLegend>
              <div className="grid grid-cols-2 gap-4">
                <Field className="gap-1">
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" name="username" type="text" />
                  <FieldDescription>
                    Must contain 8-50 characters
                  </FieldDescription>
                  {/*<FieldError>Field Error</FieldError>*/}
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" name="email" type="email" />
                  <FieldDescription>
                    Must be a valid email address
                  </FieldDescription>
                  {/*<FieldError>Field Error</FieldError>*/}
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field className="gap-1">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" />
                  <FieldDescription>
                    Must contain 8-16 characters, combining uppercase, number,
                    and special character
                  </FieldDescription>
                  {/*<FieldError>Field Error</FieldError>*/}
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                  />
                  <FieldDescription>Must match the password</FieldDescription>
                  {/*<FieldError>Field Error</FieldError>*/}
                </Field>
              </div>
              <Field>
                <Button type="button">Register</Button>
              </Field>
            </FieldSet>
          </form>
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
