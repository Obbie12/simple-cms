import React from 'react';
import * as Form from '@radix-ui/react-form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      if (values.username === 'admin' && values.password === 'password') {
        dispatch(loginSuccess({ username: values.username }));
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Login</h2>
        <Form.Root onSubmit={formik.handleSubmit} className="space-y-4">
            <Form.Field name="username" className="grid mb-[10px]">
              <Form.Label className="block text-sm text-gray-700 mb-1">Username</Form.Label>
              <Form.Control asChild>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...formik.getFieldProps('username')}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200 text-lg"
                />
              </Form.Control>
              {formik.touched.username && formik.errors.username ? (
                <Form.Message className="mt-2 text-sm text-red-500">{formik.errors.username}</Form.Message>
              ) : null}
            </Form.Field>
            
            <Form.Field name="password" className="grid mb-[10px]">
              <Form.Label className="block text-sm text-gray-700 mb-1">Password</Form.Label>
              <Form.Control asChild>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...formik.getFieldProps('password')}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200 text-lg"
                />
              </Form.Control>
              {formik.touched.password && formik.errors.password ? (
                <Form.Message className="mt-2 text-sm text-red-500">{formik.errors.password}</Form.Message>
              ) : null}
            </Form.Field>
            
            <Form.Submit asChild>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md transform hover:scale-105"
              >
                Login
              </button>
            </Form.Submit>
          </Form.Root>
      </div>
    </div>
  );
};

export default LoginPage;
