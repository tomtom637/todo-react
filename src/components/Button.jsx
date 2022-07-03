import React, { useRef } from 'react';

export default function Button({ children, onClick, ...props }) {
  const resolveButtonColor = () => {
    switch (props.buttonColor) {
      case 'primary':
        return 'button button--primary';
      case 'dark':
        return 'button button--dark';
      case 'success':
        return 'button button--success';
      case 'danger':
        return 'button button--danger';
      default:
        return 'button';
    }
  };
  return (
    <button
      ref={props.okayRef ? props.okayRef : null}
      className={resolveButtonColor()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
