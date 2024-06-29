import AgoraRTC, { useLocalMicrophoneTrack } from "agora-rtc-react";
import { useEffect, useState } from "react";

import useNoiseReduction from "./use-agora-ai-noise-reduction";

export default function useMicrophone(audioStarted: boolean) {
  const [availableMicrophones, setAvailableMicrophones] = useState<
    { id: string; label: string }[]
  >([]);

  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState("");

  useEffect(() => {
    const getMicrophones = async () => {
      const microphones = await AgoraRTC.getCameras();
      setAvailableMicrophones(
        microphones.map((c) => ({ id: c.deviceId, label: c.label })),
      );
      setSelectedMicrophoneId(microphones[0].deviceId);
    };
    void getMicrophones();
  }, []);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(audioStarted, {
    microphoneId: selectedMicrophoneId,
  });
  useNoiseReduction({ localMicrophoneTrack });

  useEffect(() => {
    localMicrophoneTrack?.setDevice(selectedMicrophoneId);
  }, [localMicrophoneTrack, selectedMicrophoneId]);

  return {
    localMicrophoneTrack,
    availableMicrophones,
    selectedMicrophoneId,
    setSelectedMicrophoneId,
  };
}
