"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { pacifico } from "@/components/pacifico-font";
import PrimaryButton from "@/components/primary-button";
import slugify from "@/lib/slugify";

export default function NewStreamPage() {
  const [appId, setAppId] = useLocalStorage("app-id", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [channel, setChannel] = useLocalStorage("channel", "");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name: string = e.target.name;

      if (name === "app-id") setAppId(e.target.value);
      if (name === "token") setToken(e.target.value);
      if (name === "channel") setChannel(e.target.value);

      // Clear the error if it exists after a new change
      if (error) setError("");
    },
    [error, setAppId, setToken, setChannel],
  );

  const handleNextClick = useCallback(() => {
    if (!appId || !token || !channel) setError("All fields are required.");
    else {
      const slug = slugify(channel);
      router.push("/" + slug);
    }
  }, [appId, token, channel, router]);

  return (
    <div className="flex flex-col items-center gap-8">
      <h3
        className={`text-2xl font-bold p-16 text-rose-300 ${pacifico.className}`}
      >
        Please fill in the details bellow,
      </h3>
      <p>
        All this information can be acquired from the{" "}
        <Link
          className="text-rose-600 active:text-rose-300 visited:text-rose-800"
          target="_blank"
          href="https://console.agora.io/v2/project-management"
        >
          AgoraIO Console
        </Link>
      </p>
      <div className="w-1/2 flex flex-col gap-4">
        <label>Tell us your App ID from AgoraIO</label>
        <input
          className="text-stone-200 bg-stone-800 rounded-xl p-4 w-full placeholder:text-stone-700"
          name="app-id"
          type="text"
          value={appId}
          onChange={handleChange}
          placeholder="Your app id here..."
        />
      </div>

      <div className="w-1/2 flex flex-col gap-4">
        <label>Tell us your AgoraIO token</label>
        <input
          className="text-stone-200 bg-stone-800 rounded-xl p-4 w-full placeholder:text-stone-700"
          name="token"
          type="text"
          value={token}
          onChange={handleChange}
          placeholder="Your token here..."
        />
      </div>

      <div className="w-1/2 flex flex-col gap-4">
        <label>Tell us your AgoraIO channel name</label>
        <input
          className="text-stone-200 bg-stone-800 rounded-xl p-4 w-full placeholder:text-stone-700"
          name="channel"
          type="text"
          value={channel}
          onChange={handleChange}
          placeholder="Your token here..."
        />
      </div>

      <div className="w-1/2 flex flex-col gap-4">
        <button onClick={handleNextClick}>
          <PrimaryButton>Next</PrimaryButton>
        </button>
        {error && <p className="text-rose-600">{error}</p>}
      </div>
    </div>
  );
}
