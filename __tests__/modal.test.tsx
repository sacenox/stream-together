import { render, screen } from "@testing-library/react";

import { Modal } from "@/components/modal";

describe("Modal component", () => {
  it("renders the modal", async () => {
    render(
      <Modal openButton={<button>open</button>} showModal={true}>
        <p>Modal content should be visible</p>
      </Modal>,
    );

    const openButton = await screen.findByText("open");
    expect(openButton).toBeInTheDocument();

    const modalContent = await screen.findByText(
      "Modal content should be visible",
    );
    expect(modalContent).toBeInTheDocument();
  });
});
