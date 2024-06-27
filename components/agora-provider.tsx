"use client";

import { AgoraRTCProvider, IAgoraRTCClient } from "agora-rtc-react";
import { useEffect, useState } from "react";

export default function AgoraProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);

  // Because of server side rendering, we need to initialize agoraIO only on the client
  useEffect(() => {
    const initializeAgoraSDK = async () => {
      const AgoraRTC = (await import("agora-rtc-react")).default;
      // TODO: I think I really need `mode: "live"` in the config
      const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

      setClient(agoraClient);
    };

    initializeAgoraSDK();
  }, []);

  return client ? (
    <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>
  ) : (
    <p>There was an error creating agoraio</p>
  );
}
