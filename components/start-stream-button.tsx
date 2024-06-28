import { CiStreamOn as StreamOnIcon } from "react-icons/ci";

import PrimaryButton from "./primary-button";

export default function StartStreamButton({
  handleStartCall,
}: Readonly<{ handleStartCall: () => void }>) {
  return (
    <button onClick={handleStartCall} title="End stream">
      <PrimaryButton>
        <div className="flex flex-row items-center gap-2 p-2">
          <StreamOnIcon size="1.5em" />
          <p>Go live!</p>
        </div>
      </PrimaryButton>
    </button>
  );
}
