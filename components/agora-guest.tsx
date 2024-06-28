import { RemoteUser, useJoin, useRemoteUsers } from "agora-rtc-react";
import { useState } from "react";

import { appId, channel, HOST, OWNER, token } from "@/lib/config";

export default function AgoraGuest() {
  useJoin(
    {
      appid: appId,
      channel,
      token,
    },
    true,
  );

  const remoteUsers = useRemoteUsers();
  const hosts = remoteUsers.filter((u) => u.uid === OWNER || u.uid === HOST);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
      {hosts.map((host) => {
        return (
          <div
            key={host.uid}
            className="rounded-3xl overflow-hidden bg-black w-full max-w-2xl aspect-[4/3]"
          >
            <RemoteUser user={host} />
          </div>
        );
      })}
    </div>
  );
}
