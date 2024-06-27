"use client";

import {
  LocalUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
} from "agora-rtc-react";
import { useCallback, useState } from "react";

import PrimaryButton from "./primary-button";

export default function AgoraHost({
  config: { appId, channel, token },
}: {
  config: { appId: string; channel: string; token: string };
}) {
  const [callStarted, setCallStarted] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(!muted);
  const { localCameraTrack } = useLocalCameraTrack(videoStarted);

  const handleCall = useCallback(() => {
    setCallStarted(true);
    setVideoStarted(true);
  }, []);

  useJoin(
    {
      appid: appId,
      channel: "stream-together",
      token,
    },
    callStarted,
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  return (
    <div className="flex flex-col gap-8">
      <div style={{ width: 640, height: 480 }}>
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={videoStarted}
          micOn={!muted}
        >
          You
        </LocalUser>
      </div>

      <button onClick={handleCall}>
        <PrimaryButton>Call</PrimaryButton>
      </button>
    </div>
  );
}
