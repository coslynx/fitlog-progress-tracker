import React, { useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import Input from './Input.jsx';
import api from '../services/api.js';
import { validateProgressData } from '../utils/validators.js';

/**
 * ProgressInput component renders a form for inputting fitness progress for a specific goal.
 * @param {object} props - The props object.
 * @param {number} props.goalId - The ID of the goal for which to input progress.
 * @returns {JSX.Element} The progress input form element.
 */
const ProgressInput = ({ goalId }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      date: '',
      value: '',
    },
    validate: (values) => {
        const { isValid, errors } = validateProgressData({ ...values, goalId });
          if(!isValid) {
            return errors;
        }
          return {};
    },
    onSubmit: async (values, { setFieldError, resetForm }) => {
      setLoading(true);
      try {
        const response = await api.addProgress(goalId, values.value, values.date);
          if(response){
              resetForm();
          }
      } catch (error) {
        console.error('Progress input failed:', error);
          if (error.message) {
              setFieldError('date', error.message);
              setFieldError('value', error.message);
          } else {
              setFieldError('date', 'An error occurred. Please try again.');
              setFieldError('value', 'An error occurred. Please try again.');
          }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
        <Input
            type="date"
            id="progress-date"
            name="date"
            label="Date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.date && formik.errors.date}
            aria-invalid={formik.touched.date && !!formik.errors.date}
            aria-describedby={formik.touched.date && formik.errors.date ? "progress-date-error" : null}
        />
        <Input
            type="number"
            id="progress-value"
            name="value"
            label="Value"
            value={formik.values.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             error={formik.touched.value && formik.errors.value}
            aria-invalid={formik.touched.value && !!formik.errors.value}
            aria-describedby={formik.touched.value && formik.errors.value ? "progress-value-error" : null}
        />
      <Button type="submit" disabled={loading || !formik.isValid}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

ProgressInput.propTypes = {
    goalId: PropTypes.number.isRequired,
};


export default ProgressInput;