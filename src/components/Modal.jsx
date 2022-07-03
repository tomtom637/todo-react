import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { displayModalAtom, stopDisplayingModalAtom } from '../store';
import Button from './Button';

export default function Modal({ heading, content, modalAction }) {
  const [displayModal, setDisplayModal] = useAtom(displayModalAtom);
  const [stopDisplayingModal, setStopDisplayingModal] = useAtom(stopDisplayingModalAtom);
  const okayRef = useRef(null);
  const checkboxRef = useRef(null);

  const handleKeydown = e => {
    if (e.key === 'Escape') {
      setDisplayModal(false);
    }
  };

  const handleOkay = () => {
    modalAction();
    if (checkboxRef.current.checked) {
      setStopDisplayingModal(true);
    }
    setDisplayModal(false);
  }

  useEffect(() => {
    // Focus on the okay button when the modal is displayed
    if (displayModal) {
      okayRef.current.focus();
    }
    // allows the escape key to close the modal
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [displayModal]);



  return (
    <div className='modal'>
      <div className="modal__dark-bg" onClick={() => setDisplayModal(false)} />
      <div className="modal__container">
        <button className="modal__close-btn" onClick={() => setDisplayModal(false)}>
          <span>&#215;</span>
        </button>
        <div className="modal__header">
          <h5 className='modal__heading'>{heading}</h5>
        </div>
        <div className='modal__content'>{content}</div>
        <div className="modal__remember">
          <input ref={checkboxRef} className="modal__checkbox" id="remember" type="checkbox" />
          <label htmlFor="remember" className="modal__label">Always proceed without confirmation</label>
        </div>
        <div className="modal__buttons-container">
          <Button
            onClick={() => setDisplayModal(false)}
          >Cancel</Button>
          <Button
            okayRef={okayRef}
            buttonColor='danger'
            onClick={handleOkay}
          >Okay</Button>
        </div>
      </div>
    </div>
  );
}