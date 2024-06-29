import { render, screen } from "@testing-library/react";

import Logo from "@/components/logo";

describe("Logo component", () => {
  it("renders the logo", async () => {
    render(<Logo />);

    const logo = await screen.findByAltText("Stream together brand");
    expect(logo).toBeInTheDocument();
  });
});
