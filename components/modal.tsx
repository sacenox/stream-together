type ModalProps = {
  openButton: React.ReactNode;
  showModal: boolean;
} & React.PropsWithChildren;

const Modal = function ({ openButton, showModal, children }: ModalProps) {
  return (
    <>
      {openButton}

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative w-11/12 max-w-xl">{children}</div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-60 dark:opacity-75" />
        </>
      ) : null}
    </>
  );
};

export { Modal };
