"use client";

import dynamic from "next/dynamic";

const AgoraProvider = dynamic(() => import("@/components/agora-provider"), {
  ssr: false,
});

const AgoraGuest = dynamic(() => import("@/components/agora-guest"), {
  ssr: false,
});

export default function ViewerPage() {
  return (
    <AgoraProvider>
      <div className="flex flex-col items-center gap-16">
        <AgoraGuest />
      </div>
    </AgoraProvider>
  );
}
