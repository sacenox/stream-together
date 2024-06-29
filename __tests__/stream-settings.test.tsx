import { render, screen } from "@testing-library/react";

import StreamSettings from "@/components/stream-settings";

describe("Settings component", () => {
  it("renders the inputs", async () => {
    const availableCameras = [{ id: "selectedCam", label: "testCam" }];
    const selectedCameraId = "selectedCam";
    const setSelectedCameraId = jest.fn;

    const availableMicrophones = [{ id: "selectedMic", label: "testMic" }];
    const selectedMicrophoneId = "selectedMic";
    const setSelectedMicrophoneId = jest.fn;

    const backgroundBlurred = false;
    const handleBlurBackground = jest.fn;

    render(
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
      />,
    );

    const cameraSelection = await screen.findByText("testCam");
    expect(cameraSelection).toBeInTheDocument();

    const micSelection = await screen.findByText("testMic");
    expect(micSelection).toBeInTheDocument();

    const blurInput = await screen.findByText("Blur your background?");
    expect(blurInput).toBeInTheDocument();
  });
});
