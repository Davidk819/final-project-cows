import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useMutation } from '@apollo/client';
import { AUTHENTICATE_MUTATION } from '../../graphql';
import { Login } from '../../mainAtom';
import { useAtom, useSetAtom } from 'jotai';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

export default function SignIn() {
  const navigate = useNavigate();
  const [Login1, setLogin1] = useAtom(Login);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [authenticate, { data }] = useMutation(AUTHENTICATE_MUTATION);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    if (storedToken) {
      console.log(storedToken);

      navigate('/home');
    }
  }, []);
  const handleAuthentication = async () => {
    console.log(formData.password);
    try {
      const result = await authenticate({
        variables: {
          input: {
            email: formData.email,
            password: formData.password,
          },
        },
      });

      const jwtToken = result.data.authenticate.jwtToken;
      if (jwtToken) {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('email', formData.email);
        setLogin1(true);
        navigate('/home');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    handleAuthentication();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Invalid email or password.
        </Alert>
      </Snackbar>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://as2.ftcdn.net/v2/jpg/00/51/47/41/1000_F_51474102_UEXRLTDrKHh5nU4HSQ9RFhzlwDytW76r.jpg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <button
            // onClick={() =>
            //   handleAuthentication(formData.email, formData.password)
            // }
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
