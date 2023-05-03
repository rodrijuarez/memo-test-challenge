import React from 'react';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="bg-white p-6 rounded shadow-lg z-50">
        {children}
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default Modal;
