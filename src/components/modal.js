import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  font-family: "Roboto";
  top: 0;
  left: 0%;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  z-index: 1005;
`;

function Modal({ children }) {
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<ModalWrapper>{children}</ModalWrapper>, elRef.current);
}

export default Modal;
