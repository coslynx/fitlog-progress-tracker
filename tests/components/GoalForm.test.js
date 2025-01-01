import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GoalForm from '../../components/GoalForm.jsx';
import api from '../../services/api.js';
import { validateGoalData } from '../../utils/validators.js';

jest.mock('../../services/api.js');
jest.mock('../../utils/validators.js');

describe('GoalForm Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnClose.mockClear();
  });

  it('renders correctly with default values (empty inputs)', () => {
    render(<GoalForm onClose={mockOnClose} />);

    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();

    const nameInput = screen.getByLabelText('Name');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue('');
    expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    expect(nameInput).toHaveAttribute('aria-describedby', null);

    const targetInput = screen.getByLabelText('Target');
      expect(targetInput).toBeInTheDocument();
    expect(targetInput).toHaveValue('');
     expect(targetInput).toHaveAttribute('aria-invalid', 'false');
    expect(targetInput).toHaveAttribute('aria-describedby', null);


      const unitInput = screen.getByLabelText('Unit');
     expect(unitInput).toBeInTheDocument();
     expect(unitInput).toHaveValue('');
      expect(unitInput).toHaveAttribute('aria-invalid', 'false');
    expect(unitInput).toHaveAttribute('aria-describedby', null);

    const startDateInput = screen.getByLabelText('Start Date');
      expect(startDateInput).toBeInTheDocument();
      expect(startDateInput).toHaveValue('');
       expect(startDateInput).toHaveAttribute('aria-invalid', 'false');
    expect(startDateInput).toHaveAttribute('aria-describedby', null);


    const endDateInput = screen.getByLabelText('End Date');
      expect(endDateInput).toBeInTheDocument();
      expect(endDateInput).toHaveValue('');
     expect(endDateInput).toHaveAttribute('aria-invalid', 'false');
     expect(endDateInput).toHaveAttribute('aria-describedby', null);
  });

    it('renders correctly with initial goal prop', () => {
        const initialGoal = {
            id: 1,
            name: 'Test Goal',
            target: 100,
            unit: 'km',
            startDate: '2024-01-01',
            endDate: '2024-01-31',
        };
        render(<GoalForm goal={initialGoal} onClose={mockOnClose} />);

        const nameInput = screen.getByLabelText('Name');
        expect(nameInput).toHaveValue(initialGoal.name);

        const targetInput = screen.getByLabelText('Target');
        expect(targetInput).toHaveValue(String(initialGoal.target));

        const unitInput = screen.getByLabelText('Unit');
        expect(unitInput).toHaveValue(initialGoal.unit);

          const startDateInput = screen.getByLabelText('Start Date');
          expect(startDateInput).toHaveValue(initialGoal.startDate);


        const endDateInput = screen.getByLabelText('End Date');
        expect(endDateInput).toHaveValue(initialGoal.endDate);

    });



    it('submits the form with valid data and calls resetForm and onClose', async () => {
        api.createGoal.mockResolvedValue({id: 1, name: 'New Goal', target: 100, unit: 'km', startDate: '2024-01-01', endDate: '2024-01-31'});

        render(<GoalForm onClose={mockOnClose} />);

        const nameInput = screen.getByLabelText('Name');
        fireEvent.change(nameInput, { target: { value: 'New Goal' } });

        const targetInput = screen.getByLabelText('Target');
        fireEvent.change(targetInput, { target: { value: '100' } });


         const unitInput = screen.getByLabelText('Unit');
        fireEvent.change(unitInput, { target: { value: 'km' } });

        const startDateInput = screen.getByLabelText('Start Date');
        fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });


         const endDateInput = screen.getByLabelText('End Date');
        fireEvent.change(endDateInput, { target: { value: '2024-01-31' } });


        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);


        await waitFor(() => {
           expect(api.createGoal).toHaveBeenCalledTimes(1);
           expect(api.createGoal).toHaveBeenCalledWith('New Goal', null, 100, 'km', '2024-01-01', '2024-01-31');
           expect(mockOnClose).toHaveBeenCalledTimes(1);
        });


        expect(nameInput).toHaveValue('');
         expect(targetInput).toHaveValue('');
          expect(unitInput).toHaveValue('');
         expect(startDateInput).toHaveValue('');
          expect(endDateInput).toHaveValue('');

    });

    it('displays validation errors when form is submitted with invalid data', async () => {
          validateGoalData.mockReturnValue({
              isValid: false,
                errors: {
                     name: 'Name is required',
                      target: 'Target must be a positive integer',
                    unit: 'Unit is required',
                }
          });

      render(<GoalForm  onClose={mockOnClose}/>);

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton);

        await waitFor(() => {
           const nameError = screen.getByText('Name is required');
           expect(nameError).toBeInTheDocument();

             const targetError = screen.getByText('Target must be a positive integer');
           expect(targetError).toBeInTheDocument();

             const unitError = screen.getByText('Unit is required');
            expect(unitError).toBeInTheDocument();
        });

           const nameInput = screen.getByLabelText('Name');
           expect(nameInput).toHaveAttribute('aria-invalid', 'true');
          expect(nameInput).toHaveAttribute('aria-describedby', 'goal-name-error');

        const targetInput = screen.getByLabelText('Target');
         expect(targetInput).toHaveAttribute('aria-invalid', 'true');
         expect(targetInput).toHaveAttribute('aria-describedby', 'goal-target-error');

        const unitInput = screen.getByLabelText('Unit');
           expect(unitInput).toHaveAttribute('aria-invalid', 'true');
          expect(unitInput).toHaveAttribute('aria-describedby', 'goal-unit-error');
  });



  it('handles submission error and displays error message', async () => {
    const mockError = { message: 'Failed to create goal', startDate: "Invalid start date"};
    api.createGoal.mockRejectedValue(mockError);

    render(<GoalForm onClose={mockOnClose} />);

    const nameInput = screen.getByLabelText('Name');
        fireEvent.change(nameInput, { target: { value: 'Test Goal' } });

      const targetInput = screen.getByLabelText('Target');
        fireEvent.change(targetInput, { target: { value: '100' } });


         const unitInput = screen.getByLabelText('Unit');
        fireEvent.change(unitInput, { target: { value: 'km' } });

      const startDateInput = screen.getByLabelText('Start Date');
         fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });


      const endDateInput = screen.getByLabelText('End Date');
        fireEvent.change(endDateInput, { target: { value: '2024-01-31' } });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    await waitFor(() => {
       expect(api.createGoal).toHaveBeenCalledTimes(1);
        expect(mockOnClose).not.toHaveBeenCalled();
      const nameError = screen.getByText('Failed to create goal');
      expect(nameError).toBeInTheDocument();

       const startDateError = screen.getByText('Invalid start date');
      expect(startDateError).toBeInTheDocument();
    });
  });

  it('calls the onClose handler when cancel button is clicked', () => {
        render(<GoalForm onClose={mockOnClose} />);
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelButton);
         expect(mockOnClose).toHaveBeenCalledTimes(1);
   });

  it('disables the submit button when loading state is true', async () => {
        api.createGoal.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

         render(<GoalForm onClose={mockOnClose} />);


       const nameInput = screen.getByLabelText('Name');
        fireEvent.change(nameInput, { target: { value: 'New Goal' } });

        const targetInput = screen.getByLabelText('Target');
        fireEvent.change(targetInput, { target: { value: '100' } });


         const unitInput = screen.getByLabelText('Unit');
        fireEvent.change(unitInput, { target: { value: 'km' } });

        const startDateInput = screen.getByLabelText('Start Date');
          fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });


        const endDateInput = screen.getByLabelText('End Date');
         fireEvent.change(endDateInput, { target: { value: '2024-01-31' } });

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        expect(submitButton).not.toBeDisabled();


         fireEvent.click(submitButton);
      expect(submitButton).toBeDisabled();

       await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
  });
});