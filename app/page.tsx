"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import slugify from "@/lib/slugify";

import Logo from "../components/logo";
import PrimaryButton from "../components/primary-button";

export default function Home() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      if (error) setError("");
    },
    [error, setTitle],
  );

  const handleNextClick = useCallback(() => {
    if (!title) setError("Please tell us the title of your stream first.");
    else {
      const slug = slugify(title);
      router.push("/" + slug + "/stream");
    }
  }, [title, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-20">
      <Logo />

      <div className="w-1/2 flex flex-col gap-4">
        <label>What is the title of your stream?</label>
        <input
          className="text-stone-200 bg-stone-800 rounded-xl p-4 w-full placeholder:text-stone-700"
          name="title"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Stream title here..."
        />
        {error && <p className="text-rose-600">{error}</p>}
      </div>

      <div className="w-1/2 flex flex-col gap-4">
        <div className="text-center">
          <button onClick={handleNextClick}>
            <PrimaryButton>
              <p className="px-4 py-2">Go Live!</p>
            </PrimaryButton>
          </button>
        </div>
      </div>
    </main>
  );
}
