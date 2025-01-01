import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button.jsx';

describe('Button Component', () => {
  it('renders correctly with provided children', () => {
    render(<Button data-testid="test-button">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Click Me' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} data-testid="test-button">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

   it('does not call the onClick handler when disabled', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock} disabled data-testid="test-button">Click Me</Button>);
      const buttonElement = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(buttonElement);
    expect(onClickMock).not.toHaveBeenCalled();
  });

   it('correctly applies disabled styles when the disabled prop is set to true', () => {
        render(<Button disabled data-testid="test-button">Click Me</Button>);
        const buttonElement = screen.getByRole('button', { name: 'Click Me' });
        expect(buttonElement).toHaveClass('opacity-50');
        expect(buttonElement).toHaveClass('bg-gray-400');
        expect(buttonElement).toHaveClass('cursor-not-allowed');
         expect(buttonElement).toBeDisabled();
    });
});