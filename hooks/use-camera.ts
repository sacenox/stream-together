import AgoraRTC, { useLocalCameraTrack } from "agora-rtc-react";
import { useEffect, useState } from "react";

export default function useCamera(videoStarted: boolean) {
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
      setSelectedCameraId(cameras[0].deviceId);
    };
    void getCameras();
  }, []);

  const { localCameraTrack } = useLocalCameraTrack(videoStarted, {
    cameraId: selectedCameraId,
  });

  return {
    localCameraTrack,
    availableCameras,
    selectedCameraId,
    setSelectedCameraId,
  };
}
