import RandomSnippet from "@/components/RandomSnippet";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col container mx-auto my-4">
      <div className="h-24 flex flex-col items-center space-y-2">
        <h1 className="text-lg font-medium">
          Welcome visitor! This application is powered by{" "}
          <Link
            href="https://nextjs.org/"
            className="underline font-bold"
            target="_blank"
          >
            Next.js
          </Link>{" "}
          {"& "}
          <Link
            href="https://supabase.com/"
            className="underline font-bold"
            target="_blank"
          >
            supabase
          </Link>
          .
        </h1>
        <p>
          Use navigation to go to other pages where you can create or list
          snippets. This is only a showcase app, so use it only as a playground.
        </p>
      </div>
      <RandomSnippet />
    </div>
  );
}
