import { Ban } from "lucide-react";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div className="flex flex-col flex-1 h-ful items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in  fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10">
        <Ban className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">No Invoice</h2>
      <p className="mb-8 mt-2 text-sm text-muted-foreground max-w-xm mx-auto text-center">
        Create an invoice to get started
      </p>

      {/* Button */}
      <Link href="/dashboard/invoices/create">
        <div className="relative inline-flex items-center justify-center gap-4 group">
          <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
          <div className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 dark:bg-gray-300 px-8 py-3 font-semibold text-white dark:text-black transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30">
            Get Started For Free
            <svg
              aria-hidden="true"
              viewBox="0 0 10 10"
              height="10"
              width="10"
              fill="none"
              className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2 dark:stroke-black"
            >
              <path
                d="M0 5h7"
                className="transition opacity-0 group-hover:opacity-100"
              ></path>
              <path
                d="M1 1l4 4-4 4"
                className="transition group-hover:translate-x-[3px]"
              ></path>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EmptyState;
