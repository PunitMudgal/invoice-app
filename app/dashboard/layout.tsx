import { Toaster } from "@/components/ui/sonner";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="grid min-h-screen w-full md:gird-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />

        <div className="flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="bottom-right" expand={true} richColors closeButton />
    </>
  );
};

export default layout;
