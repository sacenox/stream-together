"use client";

import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useCallback, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { IoEye } from "react-icons/io5";

import useVirtualBackground from "@/hooks/use-agora-virtual-background";
import useCamera from "@/hooks/use-camera";
import useMicrophone from "@/hooks/use-microphone";
import { appId, channel, HOST, OWNER, token } from "@/lib/config";

import EndStreamButton from "./end-stream-button";
import { Modal } from "./modal";
import MuteButton from "./mute-button";
import PrimaryButton from "./primary-button";
import SettingsButton from "./settings-button";
import StartStreamButton from "./start-stream-button";
import StreamSettings from "./stream-settings";
import VideoToggleButton from "./video-toggle-button";

export default function AgoraHost({
  userType,
}: Readonly<{ userType: number }>) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const {
    localCameraTrack,
    availableCameras,
    selectedCameraId,
    setSelectedCameraId,
  } = useCamera(videoStarted);
  const {
    localMicrophoneTrack,
    availableMicrophones,
    selectedMicrophoneId,
    setSelectedMicrophoneId,
  } = useMicrophone(audioStarted);
  const isConnected = useIsConnected();
  const remoteUsers = useRemoteUsers();
  const otherHosts = remoteUsers.filter((u) => u.uid === HOST);
  const guests = remoteUsers.filter((u) => u.uid !== HOST && u.uid !== OWNER);

  useJoin(
    {
      appid: appId,
      channel,
      token,
      uid: userType,
    },
    callStarted,
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const handleToggleAudio = useCallback(() => {
    setAudioStarted(!audioStarted);
  }, [audioStarted]);

  const handleToggleVideo = useCallback(() => {
    setVideoStarted(!videoStarted);
  }, [videoStarted]);

  const { backgroundBlurred, handleBlurBackground } = useVirtualBackground({
    localCameraTrack,
  });

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
        <div className="w-full flex flex-col gap-2 max-w-2xl">
          <div className="rounded-3xl overflow-hidden bg-black w-full  aspect-[4/3]">
            <LocalUser
              audioTrack={localMicrophoneTrack}
              videoTrack={localCameraTrack}
              cameraOn={videoStarted}
              micOn={audioStarted}
              playAudio={false}
            >
              <div className="flex flex-col justify-between h-full p-4">
                <div className="flex flex-row justify-end">
                  <Modal
                    openButton={
                      <SettingsButton
                        showSettingsModal={showSettingsModal}
                        setShowSettingsModal={setShowSettingsModal}
                      />
                    }
                    showModal={showSettingsModal}
                  >
                    <div className="p-4 bg-stone-800 rounded-2xl flex flex-col gap-4 text-left">
                      <StreamSettings
                        {...{
                          availableCameras,
                          selectedCameraId,
                          setSelectedCameraId,
                          availableMicrophones,
                          selectedMicrophoneId,
                          setSelectedMicrophoneId,
                          backgroundBlurred,
                          handleBlurBackground,
                        }}
                      />

                      <div className="text-center">
                        <button onClick={() => setShowSettingsModal(false)}>
                          <PrimaryButton>
                            <p className="px-4 py-2">Close</p>
                          </PrimaryButton>
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>

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
                    <EndStreamButton
                      handleEndCall={() => setCallStarted(false)}
                    />
                  </div>
                ) : callStarted ? (
                  <div className="flex flex-col flex-grow items-center justify-center">
                    <ImSpinner10 size="4rem" className="animate-spin" />
                  </div>
                ) : (
                  <div className="flex flex-row flex-grow justify-center">
                    <StartStreamButton
                      handleStartCall={() => setCallStarted(true)}
                    />
                  </div>
                )}
              </div>
            </LocalUser>
          </div>
        </div>

        {otherHosts.map((host) => {
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

      <div className="text-center p-8 bg-stone-800 shadow-md shadow-stone-800 rounded-2xl max-w-2xl flex flex-row justify-center gap-2">
        <IoEye size="1.5em" />
        <p>Viewers: {guests?.length ?? 0}</p>
      </div>
    </div>
  );
}
