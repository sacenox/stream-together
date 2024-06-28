import { IoVideocamOutline as VideoOnIcon } from "react-icons/io5";
import { IoVideocamOffOutline as VideoOffIcon } from "react-icons/io5";

import SecondaryButton from "./secondary-button";

export default function VideoToggleButton({
  videoStarted,
  handleToggleVideo,
}: Readonly<{
  videoStarted: boolean;
  handleToggleVideo: () => void;
}>) {
  return (
    <button
      onClick={handleToggleVideo}
      title={videoStarted ? "Turn video off" : "Turn video on"}
    >
      <SecondaryButton>
        <div className="flex flex-row items-center gap-2 p-2">
          {videoStarted ? (
            <VideoOnIcon size="1.5em" />
          ) : (
            <VideoOffIcon size="1.5em" />
          )}
          <p>{videoStarted ? "Turn video off" : "Turn video on"}</p>
        </div>
      </SecondaryButton>
    </button>
  );
}
