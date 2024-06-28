"use client";

import { AgoraRTCProvider, IAgoraRTCClient } from "agora-rtc-react";
import { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";

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
    <div className="flex flex-col flex-grow items-center justify-center">
      <ImSpinner10 size="4rem" className="animate-spin" />
    </div>
  );
}
