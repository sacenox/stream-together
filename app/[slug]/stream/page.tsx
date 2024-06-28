"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCopy as CopyIcon } from "react-icons/fa";
import { IoMdCheckmark as CheckmarkIcon } from "react-icons/io";
import { useCopyToClipboard } from "usehooks-ts";

import { HOST, OWNER } from "@/lib/config";

const AgoraProvider = dynamic(() => import("@/components/agora-provider"), {
  ssr: false,
});
const AgoraHost = dynamic(() => import("@/components/agora-host"), {
  ssr: false,
});

export default function HostPage() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, copy] = useCopyToClipboard();
  const searchParams = useSearchParams();

  const userType = searchParams.has("host") ? HOST : OWNER;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href + "?host=1");
    }
  }, []);

  return (
    <AgoraProvider>
      <div className="flex flex-col items-center gap-16">
        {userType === OWNER && (
          <div className="text-center p-8 bg-stone-800 shadow-md shadow-stone-800 rounded-2xl max-w-xl">
            <p className="text-lg p-2">
              Share this url with your co-host for them to join you!
            </p>

            <button
              className="flex flex-row justify-between bg-stone-600 p-4 rounded-xl w-full"
              onClick={() => copy(currentUrl)}
            >
              <pre className="min-w-0 max-w-full overflow-hidden overflow-ellipsis">
                {currentUrl}
              </pre>
              {copied === currentUrl ? (
                <CheckmarkIcon size="1.25em" />
              ) : (
                <CopyIcon size="1.25em" />
              )}
            </button>
          </div>
        )}

        <AgoraHost userType={userType} />
      </div>
    </AgoraProvider>
  );
}
