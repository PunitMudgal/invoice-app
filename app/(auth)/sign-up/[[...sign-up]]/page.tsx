import { SignUp } from "@clerk/nextjs";
import React from "react";

const Register = () => {
  return (
    <>
      <div className="login-bg-lining">
        <div className="login-bg-glow" />
      </div>
      <SignUp />
    </>
  );
};

export default Register;
