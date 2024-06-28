import { CiStreamOff as StreamOffIcon } from "react-icons/ci";

import PrimaryButton from "./primary-button";

export default function EndStreamButton({
  handleEndCall,
}: Readonly<{ handleEndCall: () => void }>) {
  return (
    <button onClick={handleEndCall} title="End stream">
      <PrimaryButton>
        <div className="flex flex-row items-center gap-2 p-2">
          <StreamOffIcon size="1.5em" />
          <p>End</p>
        </div>
      </PrimaryButton>
    </button>
  );
}
