import { UserButton } from "@clerk/nextjs";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar userId={userId} />
      <Hero userId={userId} />
    </main>
  );
}
