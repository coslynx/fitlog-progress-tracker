import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from './Button.jsx';
import Input from './Input.jsx';
import api from '../services/api.js';
import { validateGoalData } from '../utils/validators.js';
import { formatDate } from '../utils/helpers.js';
import PropTypes from 'prop-types';

/**
 * GoalForm component renders a form for creating or editing fitness goals.
 * @param {object} props - The props object.
 * @param {object} [props.goal] - The goal object to edit.
 * @param {Function} props.onClose - The function to call when the modal is closed.
 * @returns {JSX.Element} The goal form element.
 */
const GoalForm = ({ goal, onClose }) => {
    const [loading, setLoading] = useState(false);


    const initialValues = {
        name: goal?.name || '',
        target: goal?.target || '',
        unit: goal?.unit || '',
        startDate: goal?.startDate ? formatDate(goal.startDate) : '',
        endDate: goal?.endDate ? formatDate(goal.endDate) : '',
    };


  const formik = useFormik({
    initialValues,
    validate: (values) => {
        const { isValid, errors } = validateGoalData(values);
          if(!isValid) {
            return errors;
        }
          return {};
    },
    onSubmit: async (values, { setFieldError, resetForm }) => {
      setLoading(true);
        try {
            const sanitizedValues = { ...values };

            if(sanitizedValues.startDate === '') {
                sanitizedValues.startDate = null;
            }

            if(sanitizedValues.endDate === '') {
                 sanitizedValues.endDate = null;
            }


          let response;
          if(goal) {
                response = await api.updateGoal(goal.id, sanitizedValues.name, null, sanitizedValues.target, sanitizedValues.unit, sanitizedValues.startDate, sanitizedValues.endDate);
            } else {
                response = await api.createGoal(sanitizedValues.name, null, sanitizedValues.target, sanitizedValues.unit, sanitizedValues.startDate, sanitizedValues.endDate);
          }

          if(response) {
                resetForm();
               onClose();
          }
        } catch (error) {
              console.error('Goal form submission failed:', error);
             if (error.message) {
                 setFieldError('name', error.message);
                 setFieldError('target', error.message);
                 setFieldError('unit', error.message);
                  if(error.startDate){
                       setFieldError('startDate', error.startDate);
                 }
                 if(error.endDate){
                       setFieldError('endDate', error.endDate);
                  }
              } else {
                  setFieldError('name', 'An error occurred. Please try again.');
              }
        } finally {
            setLoading(false);
        }
    },
  });


  return (
        <form onSubmit={formik.handleSubmit} noValidate>
          <Input
            type="text"
            id="goal-name"
            name="name"
            placeholder="Goal Name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
             aria-invalid={formik.touched.name && !!formik.errors.name}
             aria-describedby={formik.touched.name && formik.errors.name ? "goal-name-error" : null}
          />
           <Input
            type="number"
            id="goal-target"
            name="target"
            placeholder="Target"
            label="Target"
            value={formik.values.target}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
               error={formik.touched.target && formik.errors.target}
            aria-invalid={formik.touched.target && !!formik.errors.target}
              aria-describedby={formik.touched.target && formik.errors.target ? "goal-target-error" : null}

          />
          <Input
            type="text"
            id="goal-unit"
            name="unit"
            placeholder="Unit"
             label="Unit"
            value={formik.values.unit}
             onChange={formik.handleChange}
            onBlur={formik.handleBlur}
              error={formik.touched.unit && formik.errors.unit}
              aria-invalid={formik.touched.unit && !!formik.errors.unit}
              aria-describedby={formik.touched.unit && formik.errors.unit ? "goal-unit-error" : null}
          />
          <Input
              type="date"
              id="goal-startDate"
              name="startDate"
             label="Start Date"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.startDate && formik.errors.startDate}
            aria-invalid={formik.touched.startDate && !!formik.errors.startDate}
              aria-describedby={formik.touched.startDate && formik.errors.startDate ? "goal-startDate-error" : null}
          />
          <Input
            type="date"
            id="goal-endDate"
            name="endDate"
              label="End Date"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
              error={formik.touched.endDate && formik.errors.endDate}
            aria-invalid={formik.touched.endDate && !!formik.errors.endDate}
             aria-describedby={formik.touched.endDate && formik.errors.endDate ? "goal-endDate-error" : null}
          />
          <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} disabled={loading}>
            Cancel
            </Button>
          <Button type="submit" disabled={loading || !formik.isValid}>
                {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
  );
};


GoalForm.propTypes = {
    goal: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        target: PropTypes.number,
        unit: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};


export default GoalForm;