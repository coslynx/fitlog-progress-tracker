import validator from 'validator';
import { isDateValid } from './helpers';

/**
 * Validates if the provided string is a valid email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
  if (typeof email !== 'string') {
    return false;
  }
  return validator.isEmail(email);
};

/**
 * Validates if the provided password meets the security criteria.
 * The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
 * @param {string} password - The password to validate.
 * @returns {boolean} - True if the password is secure, false otherwise.
 */
const isPasswordSecure = (password) => {
  if (typeof password !== 'string') {
    return false;
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validates if the provided string is not empty and contains only non-whitespace characters.
 * @param {string} str - The string to validate.
 * @returns {boolean} - True if the string is valid, false otherwise.
 */
const isNonEmptyString = (str) => {
  if (typeof str !== 'string') {
    return false;
  }
  return str.trim().length > 0;
};

/**
 * Checks if a value is an integer.
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is an integer, false otherwise.
 */
const isInteger = (value) => {
  return Number.isInteger(Number(value));
};

/**
 * Checks if a value is a positive integer.
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a positive integer, false otherwise.
 */
const isPositiveInteger = (value) => {
  return isInteger(value) && Number(value) > 0;
};


/**
 * Validates if a string represents a valid date in YYYY-MM-DD format.
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} - True if the date string is valid, false otherwise.
 * @throws {Error} - If the date string is not a valid date.
 */
const isValidDateString = (dateString) => {
    if (!dateString) {
        return false;
    }
  if (!isDateValid(dateString)) {
    return false;
  }
  return true;
};

/**
 * Validates goal data object using the specific validator functions created in this file.
 * @param {object} goalData - The goal data object to validate.
 * @param {string} goalData.name - The name of the goal.
 * @param {number} goalData.target - The target for the goal.
 * @param {string} goalData.unit - The unit for the goal.
 * @param {string} [goalData.startDate] - The start date for the goal.
 * @param {string} [goalData.endDate] - The end date for the goal.
 * @returns {object} An object with `isValid` boolean, and `errors: object`.
 * @throws {Error} If goalData is null or undefined
 */
const validateGoalData = (goalData) => {

  if (!goalData) {
    throw new Error('Goal data is required');
  }

  const errors = {};
  let isValid = true;


  if (!isNonEmptyString(goalData.name)) {
    errors.name = 'Name is required';
    isValid = false;
  }

  if (!isPositiveInteger(goalData.target)) {
    errors.target = 'Target must be a positive integer';
    isValid = false;
  }

  if (!isNonEmptyString(goalData.unit)) {
    errors.unit = 'Unit is required';
     isValid = false;
  }

  if (goalData.startDate && !isValidDateString(goalData.startDate)) {
      errors.startDate = 'Invalid start date';
      isValid = false;
  }

  if (goalData.endDate && !isValidDateString(goalData.endDate)) {
    errors.endDate = 'Invalid end date';
      isValid = false;
  }

    if(goalData.startDate && goalData.endDate && isValidDateString(goalData.startDate) && isValidDateString(goalData.endDate)){
            const startDate = new Date(goalData.startDate);
            const endDate = new Date(goalData.endDate);

            if(startDate > endDate){
                errors.startDate = "Start date cannot be after end date"
                isValid = false;
                errors.endDate = "End date cannot be before start date"
            }
    }


    return {isValid, errors};
};


/**
 * Validates progress data object using specific validator functions created in this file.
 * @param {object} progressData - The progress data object to validate.
 * @param {number} progressData.goalId - The ID of the goal.
 * @param {number} progressData.value - The value of the progress.
 * @param {string} progressData.date - The date of the progress.
 * @returns {object} An object with `isValid` boolean, and `errors: object`.
  * @throws {Error} If progressData is null or undefined
 */
const validateProgressData = (progressData) => {
    if (!progressData) {
        throw new Error('Progress data is required');
    }

  const errors = {};
  let isValid = true;

  if (!isPositiveInteger(progressData.goalId)) {
    errors.goalId = 'Goal ID must be a positive integer';
    isValid = false;
  }

  if (!isPositiveInteger(progressData.value)) {
    errors.value = 'Value must be a positive integer';
    isValid = false;
  }


  if (!isValidDateString(progressData.date)) {
    errors.date = 'Invalid date';
    isValid = false;
  }

  return { isValid, errors };
};



export {
  isValidEmail,
  isPasswordSecure,
  isNonEmptyString,
  isInteger,
  isPositiveInteger,
  isValidDateString,
  validateGoalData,
  validateProgressData,
};