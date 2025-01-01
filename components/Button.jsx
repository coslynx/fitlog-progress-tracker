import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable button component with customizable appearance and behavior.
 * @param {object} props - The props object.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {React.ReactNode} props.children - The content to be displayed within the button.
 * @param {string} [props.type] - The type of the button (e.g., 'button', 'submit').
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @returns {JSX.Element} The button element.
 */
const Button = ({ onClick, children, type = 'button', disabled = false }) => {

  const handleClick = (event) => {
      if (disabled) {
          event.preventDefault();
          return;
      }
      if (typeof onClick === 'function') {
          onClick(event);
      } else if (onClick != null) {
          console.warn('onClick prop must be a function or undefined for Button component.');
      }
  };


  return (
    <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        role="button"
        className={`
            px-4 py-2 rounded-md
            text-white
            bg-blue-500
            hover:bg-blue-700
            disabled:opacity-50
            disabled:bg-gray-400
            disabled:cursor-not-allowed
            cursor-pointer
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-opacity-50
          `}
    >
      {children}
    </button>
  );
};


Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};


export default Button;