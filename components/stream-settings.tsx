import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";

export default function StreamSettings({
  availableCameras,
  selectedCameraId,
  setSelectedCameraId,
  // availableMicrophones,
  // selectedMicrophoneId,
  // setSelectedMicrophone,
  handleBlurBackground,
}: Readonly<{
  availableCameras: { id: string; label: string }[];
  selectedCameraId: string;
  setSelectedCameraId: (agr0: string) => void;
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
    </>
  );
}
