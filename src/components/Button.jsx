import React from 'react';

export default function Button({ children, onClick, ...props }) {
  const resolveButtonColor = () => {
    switch (props.buttonColor) {
      case 'primary':
        return 'button button--primary';
      case 'secondary':
        return 'button button--secondary';
      case 'success':
        return 'button button--success';
      case 'danger':
        return 'button button--danger';
      default:
        return 'button';
  }
}
  return (
    <button
      className={resolveButtonColor()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
