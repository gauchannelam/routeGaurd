import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "./modal";

const ModalContainer = styled.div`
  position: relative;
  margin: 0 auto;
  border-radius: 0.25rem;
  cursor: auto;
  background: transparent;
  width: 100%;
  max-width: 500px;
`;

const ScrollingContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  border-radius: 0.25rem;
  padding: 2rem;
  background: transparent;
  max-height: 75vh;
`;

const ModalBodyWrapper = styled.div`
  .close-icon {
    position: absolute;
    top: 2rem;
    right: 4rem;
    color: white;
    font-size: 2.25rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .close-icon {
      top: 1rem;
      right: 2rem;
    }
  }
`;

const ModalWrapper = ({ closeModal, children }) => {
  const modalRef = useRef(null);
  const closeOuter = useCallback(
    (e) => {
      if (modalRef.current && e.target === modalRef.current.parentNode) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    // window.addEventListener("popstate", function(event) {
    //   window.history.pushState(null, null, window.location.href);
    // })
    window.addEventListener("click", closeOuter);

    return () => window.removeEventListener("click", closeOuter);
  }, [closeOuter]);

  return (
    <Modal>
      <ModalContainer ref={modalRef}>
        <ScrollingContainer>
          <ModalBodyWrapper>
            <button className="close-icon" onClick={closeModal}>
              &times;
            </button>
            {children}
          </ModalBodyWrapper>
        </ScrollingContainer>
      </ModalContainer>
    </Modal>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ModalWrapper;
