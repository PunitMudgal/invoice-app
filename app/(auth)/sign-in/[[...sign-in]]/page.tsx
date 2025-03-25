import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <>
      <div className="login-bg-lining">
        <div className="login-bg-glow" />
      </div>
      <SignIn />
    </>
  );
};

export default Login;
