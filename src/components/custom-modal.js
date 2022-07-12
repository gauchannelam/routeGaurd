import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Prompt, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import ModalWrapper from "./modal-container";

const CustomModalHeader = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  color: white;

  span {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
`;

const CustomModalBody = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: white;
`;

const CustomModalButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    padding: 0.75rem 1.25rem;
    cursor: pointer;
  }

  button + button {
    margin-left: 1.5rem;
  }
`;

const CustomModal = ({ content, title, isBlocked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const [lastLocation, setLastLocation] = useState(location);
  const [shouldUnload, setShouldUnload] = useState(false);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setShouldUnload(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const showModal = (nextLocation) => {
    openModal();
    setLastLocation(nextLocation);
  };

  const handleBlockedRoute = (nextLocation) => {
    if (!confirmedNavigation && isBlocked) {
      showModal(nextLocation);
      return false;
    }

    return true;
  };

  const handleConfirmNavigationClick = () => {
    closeModal();
    setConfirmedNavigation(true);
  };

  // Block react routes
  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      setShouldUnload(true);
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation, history]);

  // Block non-react routes
  // useEffect(() => {
  //   const unload = (event) => {
  //     debugger;
  //     if (isBlocked && !shouldUnload) {
  //       // eslint-disable-next-line no-param-reassign
  //       event.returnValue = content;
  //     }
  //     if (shouldUnload) {
  //       // eslint-disable-next-line no-param-reassign
  //       event.returnValue = "";
  //     }
  //   };
  //   window.addEventListener("beforeunload", unload);

  //   return () => window.removeEventListener("beforeunload", unload);
  // }, [isBlocked, content, shouldUnload]);

  return (
    <>
      <Prompt when message={handleBlockedRoute} />
      {isModalOpen && (
        <ModalWrapper closeModal={closeModal}>
          <CustomModalHeader>{title}</CustomModalHeader>
          <CustomModalBody>{content}</CustomModalBody>
          <CustomModalButtons>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleConfirmNavigationClick}>Leave</button>
          </CustomModalButtons>
        </ModalWrapper>
      )}
    </>
  );
};

CustomModal.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isBlocked: PropTypes.bool.isRequired
};

export default CustomModal;
