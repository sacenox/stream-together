"use client";

import AgoraRTC, {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineAudio as UnmuteIcon } from "react-icons/ai";
import { AiOutlineAudioMuted as MuteIcon } from "react-icons/ai";
import { CiStreamOn as StreamOnIcon } from "react-icons/ci";
import { CiStreamOff as StreamOffIcon } from "react-icons/ci";
import { GoGear as GearIcon } from "react-icons/go";
import { IoVideocamOutline as VideoOnIcon } from "react-icons/io5";
import { IoVideocamOffOutline as VideoOffIcon } from "react-icons/io5";

import useNoiseReduction from "@/hooks/agora-ai-noise-reduction";
import useVirtualBackground from "@/hooks/agora-virtual-background";

import { Modal } from "./modal";
import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";

const appId = process.env.NEXT_PUBLIC_APP_ID ?? "";
const token = process.env.NEXT_PUBLIC_TOKEN ?? "";
const channel = process.env.NEXT_PUBLIC_CHANNEL ?? "";

export default function AgoraHost() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [callStarted, setCallStarted] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const [availableCameras, setAvailableCameras] = useState<
    { id: string; label: string }[]
  >([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");

  useEffect(() => {
    const getCameras = async () => {
      const cameras = await AgoraRTC.getCameras();
      setAvailableCameras(
        cameras.map((c) => ({ id: c.deviceId, label: c.label })),
      );
      // Choose the first one as a default
      setSelectedCameraId(cameras[0].deviceId);
    };
    getCameras();
  }, []);

  const { localCameraTrack } = useLocalCameraTrack(videoStarted, {
    cameraId: selectedCameraId,
  });

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(audioStarted);
  useNoiseReduction({ localMicrophoneTrack });

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

  const virtualBackgroundRef = useVirtualBackground({ localCameraTrack });

  const handleBlurBackground = useCallback(() => {
    const enableBlur = async () => {
      if (virtualBackgroundRef.current?.enabled) {
        virtualBackgroundRef.current?.disable();
      } else {
        virtualBackgroundRef.current?.setOptions({
          type: "blur",
          blurDegree: 2,
        });
        virtualBackgroundRef.current?.enable();
      }
    };
    void enableBlur();
  }, [virtualBackgroundRef]);

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
      <div className="rounded-3xl overflow-hidden bg-black w-full max-w-2xl aspect-[4/3]">
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
              <div className="flex flex-row justify-center gap-4">
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

      <Modal
        openButton={
          <button onClick={() => setShowSettingsModal(!showSettingsModal)}>
            <SecondaryButton>
              <div className="py-2 px-4 flex flex-row gap-2 items-center">
                <GearIcon size="2em" />
                <p>Settings</p>
              </div>
            </SecondaryButton>
          </button>
        }
        showModal={showSettingsModal}
      >
        <div className="p-4 bg-stone-800 rounded-2xl flex flex-col gap-4">
          <div>
            <h4 className="font-bold pb-4">Select your video device:</h4>
            {availableCameras.map((c) => {
              return (
                <label key={c.id} className="flex flex-row gap-2">
                  <input
                    type="radio"
                    name="selected-camera"
                    value={c.id}
                    checked={c.id === selectedCameraId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedCameraId(id);
                    }}
                  />
                  <div>{c.label}</div>
                </label>
              );
            })}
          </div>

          <div>
            <h4 className="font-bold pb-4">Blur your background?</h4>
            <div className="flex flex-row justify-start">
              <button onClick={handleBlurBackground}>
                <SecondaryButton>
                  <p className="px-4 py-2">Toggle</p>
                </SecondaryButton>
              </button>
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => setShowSettingsModal(false)}>
              <PrimaryButton>
                <p className="px-4 py-2">Close</p>
              </PrimaryButton>
            </button>
          </div>
        </div>
      </Modal>

      {otherHosts.map((host) => {
        return (
          <div
            key={host.uid}
            className="rounded-3xl overflow-hidden bg-black w-full max-w-2xl aspect-[4/3]"
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
