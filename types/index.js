/**
 * @typedef {object} User
 * @property {number} id - The user's unique identifier.
 * @property {string} email - The user's email address, should be a valid email and normalized.
 * @property {string} password - The user's password. Should not be included in API responses, but may be used internally in components during sign up and sign in.
 */

/**
 * @typedef {object} Goal
 * @property {number} id - The goal's unique identifier.
 * @property {number} userId - The ID of the user who owns the goal.
 * @property {string} name - The name of the goal.
 * @property {string} [description] - Additional details about the goal.
 * @property {number} target - The target value for the goal.
 * @property {string} unit - The unit of measurement for the target.
 * @property {string} [startDate] - The goal's start date (YYYY-MM-DD format).
 * @property {string} [endDate] - The goal's end date (YYYY-MM-DD format).
 */

/**
 * @typedef {object} Progress
 * @property {number} id - The unique identifier for the progress record.
 * @property {number} goalId - The ID of the goal to which the progress is related.
 * @property {number} value - The progress value.
 * @property {string} date - The date when the progress was recorded (YYYY-MM-DD format).
 */
export {};