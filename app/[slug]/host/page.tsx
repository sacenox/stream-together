"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { FaRegCopy as CopyIcon } from "react-icons/fa";
import { IoMdCheckmark as CheckmarkIcon } from "react-icons/io";
import { useCopyToClipboard, useLocalStorage } from "usehooks-ts";

const AgoraProvider = dynamic(() => import("@/components/agora-provider"), {
  ssr: false,
});

const AgoraHost = dynamic(() => import("@/components/agora-host-video"), {
  ssr: false,
});

export default function StreamSetupPage({
  params,
}: {
  params: { slug: string };
}) {
  const [appId] = useLocalStorage("app-id", "");
  const [token] = useLocalStorage("token", "");
  const [channel] = useLocalStorage("channel", "");
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, copy] = useCopyToClipboard();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <AgoraProvider>
      <div className="flex flex-col items-center gap-16">
        <div className="max-w-xl w-full text-center">
          <p className="text-lg p-2">
            Share this url with your co-host for them to join you!
          </p>

          <button
            className="flex flex-row justify-between bg-stone-600 p-4 rounded-xl w-full"
            onClick={() => copy(currentUrl)}
          >
            <pre className="">{currentUrl}</pre>
            {copied === currentUrl ? (
              <CheckmarkIcon size="1.25em" />
            ) : (
              <CopyIcon size="1.25em" />
            )}
          </button>
        </div>

        <AgoraHost />
      </div>
    </AgoraProvider>
  );
}
