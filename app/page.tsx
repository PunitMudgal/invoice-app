import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      jai shree shyam
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
