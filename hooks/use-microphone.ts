import AgoraRTC, { useLocalMicrophoneTrack } from "agora-rtc-react";
import { useEffect, useState } from "react";

import useNoiseReduction from "./agora-ai-noise-reduction";

export default function useMicrophone(audioStarted: boolean) {
  const [availableMicrophones, setAvailableMicrophones] = useState<
    { id: string; label: string }[]
  >([]);

  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState("");

  useEffect(() => {
    const getCameras = async () => {
      const cameras = await AgoraRTC.getCameras();
      setAvailableMicrophones(
        cameras.map((c) => ({ id: c.deviceId, label: c.label })),
      );
      setSelectedMicrophoneId(cameras[0].deviceId);
    };
    void getCameras();
  }, []);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(audioStarted);
  useNoiseReduction({ localMicrophoneTrack });

  return {
    localMicrophoneTrack,
    availableMicrophones,
    selectedMicrophoneId,
    setSelectedMicrophoneId,
  };
}
