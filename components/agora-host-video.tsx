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
import { ImSpinner10 } from "react-icons/im";

import useNoiseReduction from "@/hooks/agora-ai-noise-reduction";
import useVirtualBackground from "@/hooks/agora-virtual-background";

import EndStreamButton from "./end-stream-button";
import { Modal } from "./modal";
import MuteButton from "./mute-button";
import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";
import SettingsButton from "./settings-button";
import StartStreamButton from "./start-stream-button";
import StreamSettings from "./stream-settings";
import VideoToggleButton from "./video-toggle-button";

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
    <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
      <div className="w-full flex flex-col gap-2 max-w-2xl">
        <div className="rounded-3xl overflow-hidden bg-black w-full  aspect-[4/3]">
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
                  <MuteButton
                    audioStarted={audioStarted}
                    handleToggleAudio={handleToggleAudio}
                  />
                  <VideoToggleButton
                    videoStarted={videoStarted}
                    handleToggleVideo={handleToggleVideo}
                  />
                  <EndStreamButton handleEndCall={handleEndCall} />
                </div>
              ) : callStarted ? (
                <div className="flex flex-col flex-grow items-center justify-center">
                  <ImSpinner10 size="4rem" className="animate-spin" />
                </div>
              ) : (
                <div className="flex flex-row flex-grow justify-center">
                  <StartStreamButton handleStartCall={handleStarCall} />
                </div>
              )}
            </div>
          </LocalUser>
        </div>

        <div className="text-center">
          <Modal
            openButton={
              <SettingsButton
                showSettingsModal={showSettingsModal}
                setShowSettingsModal={setShowSettingsModal}
              />
            }
            showModal={showSettingsModal}
          >
            <StreamSettings
              availableCameras={availableCameras}
              selectedCameraId={selectedCameraId}
              setSelectedCameraId={setSelectedCameraId}
              handleBlurBackground={handleBlurBackground}
            />

            <div className="text-center">
              <button onClick={() => setShowSettingsModal(false)}>
                <PrimaryButton>
                  <p className="px-4 py-2">Close</p>
                </PrimaryButton>
              </button>
            </div>
          </Modal>
        </div>
      </div>

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
