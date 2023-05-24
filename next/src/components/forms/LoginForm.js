import React from 'react';
import { Form, withFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import { signIn } from 'next-auth/react';

import PropTypes from 'prop-types';
import FormField from './fields/FormField';
import Alert from '../atoms/Alert';
import { getFormPropTypes } from '../../types/forms';
import axiosInstance from '../../utils/axios';
import { formErrorsHandler } from '../../utils/formErrors';

const Login = function ({ status, isSubmitting }) {
    return (
        <Form>
            <FormField
                id="email"
                name="email"
                type="text"
                label="Email"
                ˇ
                placeholder="Enter email"
                disabled={isSubmitting}
                labelSize={4}
            />
            <FormField
                id="password"
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                disabled={isSubmitting}
                labelSize={4}
            />

            {status !== undefined && (
                <Alert
                    className="mt-3"
                    type={status.color === undefined ? 'info' : status.color}
                    text={status.message}
                />
            )}

            <button type="submit" disabled={isSubmitting} className="btn btn-md btn-block btn-primary my-3">
                Log in
            </button>
        </Form>
    );
};

Login.defaultProps = {
    next: '/',
    setUserData: () => {},
};
Login.propTypes = {
    ...getFormPropTypes(['email', 'password']),
    next: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    setUserData: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

const setUser = (setCallback) => {
    axiosInstance
        .get('/api/user/me')
        .then((response) => {
            setCallback(response.data);
        })
        .catch(() => {});
};

const LoginForm = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    }),

    handleSubmit: async (values, { props, ...formik }) => {
        await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
        }).then((stuff) => {
            console.log('stuff in handlesubmit', stuff);
        });
        // console.log('RESULT WQAS', result);
        // axiosInstance({
        //     data: values,
        //     method: 'POST',
        //     url: '/api/user/login',
        // })
        //     .then(() => {
        //         const { next, setUserData } = props;
        //         formik.setSubmitting(false);
        //         // setUser(setUserData);
        //         Router.push(next || '/');
        //     })
        //     .catch((error) => {
        //         formik.setSubmitting(false);
        //         formErrorsHandler(error, formik);
        //     });
    },

    displayName: 'LoginForm', // helps with React DevTools
})(Login);

export default LoginForm;
