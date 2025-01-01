import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable modal component with customizable appearance and behavior.
 * @param {object} props - The props object.
 * @param {boolean} props.isOpen - Whether the modal is open or closed.
 * @param {Function} props.onClose - The function to call when the modal is closed.
 * @param {React.ReactNode} props.children - The content to be displayed within the modal.
 * @param {string} [props.title] - The optional title for the modal.
 * @returns {JSX.Element | null} The modal element or null if not open.
 */
const Modal = ({ isOpen, onClose, children, title }) => {
    const modalRef = useRef(null);
    const firstFocusableElementRef = useRef(null);

    if (typeof onClose !== 'function') {
        console.warn('Modal component requires a valid onClose function.');
    }

    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
         // Focus on the first focusable element when modal opens
         if (firstFocusableElementRef.current) {
            firstFocusableElementRef.current.focus();
         }

         //Traps the focus inside the modal, use tab and shift+tab to traverse the modal
           const trapFocus = (e) => {
             if (!modalRef.current) return;
             const focusableElements = modalRef.current.querySelectorAll(
               'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
             );
             const firstFocusable = focusableElements[0];
             const lastFocusable = focusableElements[focusableElements.length - 1];


             if (e.key === 'Tab' && focusableElements.length > 0) {
               if (e.shiftKey) {
                  if(document.activeElement === firstFocusable){
                     e.preventDefault();
                     lastFocusable.focus();
                  }

               }else {
                    if(document.activeElement === lastFocusable){
                        e.preventDefault();
                        firstFocusable.focus();
                     }
               }

            }
         };

           document.addEventListener('keydown', trapFocus);

      }

      return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keydown', trapFocus);
      };
    }, [isOpen, onClose]);



  if (!isOpen) {
    return null;
  }


  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
      style={{
        zIndex: 50,
      }}
    >
      <div
         ref={modalRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
      >
        {title && (
          <div className="px-6 py-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="focus:outline-none text-gray-600 hover:text-gray-800 cursor-pointer"
               ref={firstFocusableElementRef}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};


Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};


export default Modal;