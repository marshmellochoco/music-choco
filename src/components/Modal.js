import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ header, children, open, onConfirm, onCancel = null }) => {
    const [domReady, setDomReady] = React.useState(false);
    React.useEffect(() => {
        setDomReady(true);
    }, []);

    const closeModal = (e) => {
        if (e.target.className === "modal-container") onCancel();
    };

    return open && domReady
        ? createPortal(
              <div className="modal-container" onMouseDown={closeModal}>
                  <div>
                      <h2 className="title2">{header}</h2>
                      <div>
                          <p className="mb-4">{children}</p>
                          <div className="flex gap-2">
                              {onCancel && (
                                  <button
                                      className="w-full"
                                      onClick={onCancel}
                                  >
                                      Cancel
                                  </button>
                              )}
                              <button
                                  className="btn-primary w-full"
                                  onClick={onConfirm}
                              >
                                  Confirm
                              </button>
                          </div>
                      </div>
                  </div>
              </div>,
              document.getElementById("modal")
          )
        : null;
};

export default Modal;
