import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import { signIn } from "../utils/auth";

const Login = () => {
  return (
    <>
      <div className="login-bg-lining">
        <div className="login-bg-glow"></div>
      </div>
      <div className="flex h-screen w-full items-center justify-center px-4 z-20">
        <Card className="max-w-sm bg-slate-100  border border-gray-300 card-shadow">
          <Image
            src={"/icons/logo-black.png"}
            width={200}
            height={300}
            className="mx-auto"
            alt="logo"
          />
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="hello@hello.com"
                />
              </div>
              {/* <SubmitButton text="Login" /> */}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
