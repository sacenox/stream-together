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
  const [channel] = useLocalStorage("channel", "");

  return (
    <AgoraProvider>
      <div className="flex flex-col items-center gap-16">
        <AgoraHost config={{ appId, channel, token }} />
      </div>
    </AgoraProvider>
  );
}
