import { TbMicrophone as UnmuteIcon } from "react-icons/tb";
import { TbMicrophoneOff as MuteIcon } from "react-icons/tb";

import SecondaryButton from "./secondary-button";

export default function MuteButton({
  audioStarted,
  handleToggleAudio,
}: Readonly<{
  audioStarted: boolean;
  handleToggleAudio: () => void;
}>) {
  return (
    <button
      onClick={handleToggleAudio}
      title={audioStarted ? "Mute" : "Unmute"}
    >
      <SecondaryButton>
        <div className="flex flex-row items-center gap-2 p-2">
          {audioStarted ? (
            <UnmuteIcon size="1.5em" />
          ) : (
            <MuteIcon size="1.5em" />
          )}
          <p>{audioStarted ? "Mute" : "Unmute"}</p>
        </div>
      </SecondaryButton>
    </button>
  );
}
