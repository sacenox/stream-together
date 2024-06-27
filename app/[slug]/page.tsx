"use client";

import dynamic from "next/dynamic";
import { useLocalStorage } from "usehooks-ts";

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
  const [title] = useLocalStorage("title", "");

  return (
    <AgoraProvider>
      <div className="flex flex-col items-center gap-16">
        <h2 className="text-2xl text-rose-600">
          {title} ({params.slug})
        </h2>

        <div>
          <AgoraHost config={{ appId, channel: title, token }} />
        </div>
      </div>
    </AgoraProvider>
  );
}
