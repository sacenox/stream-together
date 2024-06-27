import Link from "next/link";
import LogoSmall from "./logo-sm";
import PrimaryButton from "./primary-button";

export default function Header() {
  return (
    <div className="flex flex-row justify-between">
      <LogoSmall />
    </div>
  );
}
