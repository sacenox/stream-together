import {
  ICameraVideoTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { useCallback, useState } from "react";

import useVirtualBackground from "@/hooks/use-agora-virtual-background";
import useCamera from "@/hooks/use-camera";
import useMicrophone from "@/hooks/use-microphone";

export default function StreamSettings({
  availableCameras,
  selectedCameraId,
  setSelectedCameraId,
  availableMicrophones,
  selectedMicrophoneId,
  setSelectedMicrophoneId,
  backgroundBlurred,
  handleBlurBackground,
}: Readonly<{
  availableCameras: {
    id: string;
    label: string;
  }[];
  selectedCameraId: string;
  setSelectedCameraId: (arg0: string) => void;
  availableMicrophones: {
    id: string;
    label: string;
  }[];
  selectedMicrophoneId: string;
  setSelectedMicrophoneId: (arg0: string) => void;
  backgroundBlurred: boolean;
  handleBlurBackground: () => void;
}>) {
  return (
    <>
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

        <label className="flex flex-row gap-2 pt-2">
          <input
            type="checkbox"
            defaultChecked={backgroundBlurred}
            onClick={handleBlurBackground}
          />
          <p>Blur your background?</p>
        </label>
      </div>

      <div className="border-t-stone-700 border-t-2"></div>

      <div>
        <h4 className="font-bold pb-4">Select your audio device:</h4>
        {availableMicrophones.map((m) => {
          return (
            <label key={m.id} className="flex flex-row gap-2">
              <input
                type="radio"
                name="selected-microphone"
                value={m.id}
                checked={m.id === selectedMicrophoneId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedMicrophoneId(id);
                }}
              />
              <div>{m.label}</div>
            </label>
          );
        })}
      </div>
    </>
  );
}
