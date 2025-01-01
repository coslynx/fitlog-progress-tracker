import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button.jsx';
import Input from './Input.jsx';
import auth from '../services/auth.js';
import { AuthContext } from '../context/AuthContext.js';

/**
 * LoginForm component renders a login form and handles user authentication.
 * @returns {JSX.Element} The login form element.
 */
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
      validationSchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      setLoading(true);
      try {
        const response = await auth.login(values.email, values.password);
          dispatch({ type: 'LOGIN', payload: { token: response.token } });
          resetForm();
           navigate('/dashboard');
      } catch (error) {
          console.error('Login failed:', error);
        if (error.message) {
             setFieldError('email', error.message);
             setFieldError('password', error.message);
        } else {
            setFieldError('email', 'An error occurred. Please try again.');
             setFieldError('password', 'An error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Input
            type="email"
            id="login-email"
            name="email"
            placeholder="Email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
              aria-invalid={formik.touched.email && !!formik.errors.email}
              aria-describedby={formik.touched.email && formik.errors.email ? "login-email-error" : null}
          />
          <Input
            type="password"
            id="login-password"
            name="password"
            placeholder="Password"
              label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              aria-invalid={formik.touched.password && !!formik.errors.password}
              aria-describedby={formik.touched.password && formik.errors.password ? "login-password-error" : null}

          />
          <Button type="submit" disabled={loading || !formik.isValid}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
  );
};

export default LoginForm;