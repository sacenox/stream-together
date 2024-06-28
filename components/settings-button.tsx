import { GoGear as GearIcon } from "react-icons/go";

import SecondaryButton from "./secondary-button";

export default function SettingsButton({
  showSettingsModal,
  setShowSettingsModal,
}: Readonly<{
  showSettingsModal: boolean;
  setShowSettingsModal: (arg0: boolean) => void;
}>) {
  return (
    <button onClick={() => setShowSettingsModal(!showSettingsModal)}>
      <SecondaryButton>
        <div className="p-2 flex flex-row gap-2 items-center">
          <GearIcon size="1.5em" />
          <p>Settings</p>
        </div>
      </SecondaryButton>
    </button>
  );
}
