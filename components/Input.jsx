import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { formatDate } from '../utils/helpers';

/**
 * Reusable input component with customizable appearance and behavior, compatible with Formik.
 * @param {object} props - The props object.
 * @param {string} props.type - The type of the input (e.g., 'text', 'email', 'password', 'date').
 * @param {string} props.id - The unique ID of the input element, also used for the label.
 * @param {string} props.name - The name of the input element.
 * @param {any} props.value - The value of the input element.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {Function} props.onChange - The function to call when the input value changes.
 * @param {Function} [props.onBlur] - The function to call when the input loses focus.
 * @param {string} [props.error] - The error message to display.
 * @param {boolean} [props.disabled] - Whether the input is disabled.
  * @param {string} [props.label] - The label for the input.
 * @returns {JSX.Element} The input element.
 */
const Input = ({
    type = 'text',
    id,
    name,
    value,
    placeholder,
    onChange,
    onBlur,
    error,
    disabled = false,
    label,
}) => {

    if(!id) {
        console.warn('Input component requires an id prop for accessibility.');
    }

    if(!name) {
        console.warn('Input component requires a name prop for form handling.');
    }

    if (typeof onChange !== 'function') {
        console.warn('Input component requires an onChange function.');
    }


  const handleChange = (event) => {
        let sanitizedValue = validator.escape(event.target.value);
        if (type === 'date') {
              try{
                 const dateObj = new Date(sanitizedValue);
                    if(!isNaN(dateObj.getTime())) {
                        sanitizedValue = dateObj.toISOString().split('T')[0];
                    }

              } catch (error) {
                  console.error("Error converting date", error);
              }
        }
    if (typeof onChange === 'function') {
        onChange(event.target.name, sanitizedValue);
    }
  };

  const handleBlur = (event) => {
        if (typeof onBlur === 'function') {
            onBlur(event);
        }
  };



  const inputClassName = `
    border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
  `;


  const formattedValue = type === 'date' ? formatDate(value) : value;

  return (
    <div className="mb-4">
       {label &&  (
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
        )}
      <input
        type={type}
        id={id}
        name={name}
        value={formattedValue || ''}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        autoComplete={type === 'password' ? 'current-password' : 'off'}
        className={inputClassName}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : null}
      />
      {error && <p id={`${id}-error`} className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

export default Input;