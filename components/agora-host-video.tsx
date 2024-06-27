"use client";

import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useCallback, useState } from "react";
import { AiOutlineAudio as UnmuteIcon } from "react-icons/ai";
import { AiOutlineAudioMuted as MuteIcon } from "react-icons/ai";
import { CiStreamOn as StreamOnIcon } from "react-icons/ci";
import { CiStreamOff as StreamOffIcon } from "react-icons/ci";
import { IoVideocamOutline as VideoOnIcon } from "react-icons/io5";
import { IoVideocamOffOutline as VideoOffIcon } from "react-icons/io5";

import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";

export default function AgoraHost({
  config: { appId, channel, token },
}: {
  config: { appId: string; channel: string; token: string };
}) {
  const [callStarted, setCallStarted] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(audioStarted);
  const { localCameraTrack } = useLocalCameraTrack(videoStarted);

  const isConnected = useIsConnected();

  const handleStarCall = useCallback(() => {
    setCallStarted(true);
  }, []);

  const handleEndCall = useCallback(() => {
    setCallStarted(false);
  }, []);

  const handleToggleAudio = useCallback(() => {
    setAudioStarted(!audioStarted);
  }, [audioStarted]);

  const handleToggleVideo = useCallback(() => {
    setVideoStarted(!videoStarted);
  }, [videoStarted]);

  useJoin(
    {
      appid: appId,
      channel,
      token,
    },
    callStarted,
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const otherHosts = useRemoteUsers();

  return (
    <div className="flex flex-col gap-8 w-full items-center">
      <div className="rounded-3xl overflow-hidden bg-black w-1/2 h-80">
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={videoStarted}
          micOn={audioStarted}
        >
          <div className="flex flex-col justify-between h-full p-2">
            <p className="p-2">Your broadcast</p>
            {callStarted && isConnected ? (
              <div className="flex flex-row justify-center gap-4">
                <button
                  onClick={handleToggleAudio}
                  title={audioStarted ? "Mute" : "Unmute"}
                >
                  <SecondaryButton>
                    {audioStarted ? (
                      <MuteIcon className="p-2" size="3em" />
                    ) : (
                      <UnmuteIcon className="p-2" size="3em" />
                    )}
                  </SecondaryButton>
                </button>
                <button
                  onClick={handleToggleVideo}
                  title={videoStarted ? "Turn video off" : "Turn video on"}
                >
                  <SecondaryButton>
                    {videoStarted ? (
                      <VideoOffIcon className="p-2" size="3em" />
                    ) : (
                      <VideoOnIcon className="p-2" size="3em" />
                    )}
                  </SecondaryButton>
                </button>
                <button onClick={handleEndCall} title="End stream">
                  <PrimaryButton>
                    <StreamOffIcon className="p-1" size="3em" />
                  </PrimaryButton>
                </button>
              </div>
            ) : callStarted ? (
              <div>Loading...</div>
            ) : (
              <div className="text-center">
                <button onClick={handleStarCall} title="Go live!">
                  <PrimaryButton>
                    <div className="flex flex-row items-center px-2 gap-2">
                      <p>Go live!</p>
                      <StreamOnIcon className="p-1" size="3em" />
                    </div>
                  </PrimaryButton>
                </button>
              </div>
            )}
          </div>
        </LocalUser>
      </div>

      {otherHosts.map((host) => {
        console.log(host);
        return (
          <div
            key={host.uid}
            className="rounded-3xl overflow-hidden bg-black w-1/2 h-80"
          >
            <RemoteUser user={host}>
              <p className="p-4">{host.uid}</p>
            </RemoteUser>
          </div>
        );
      })}
    </div>
  );
}
