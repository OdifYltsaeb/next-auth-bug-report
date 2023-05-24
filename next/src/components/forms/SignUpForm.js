'use client';

import React from 'react';
import { Form, withFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

import PropTypes from 'prop-types';
import FormField from './fields/FormField';
import Alert from '../atoms/Alert';
import { getFormPropTypes } from '../../types/forms';
import { tNoop } from '../../utils/text';
import axiosInstance from '../../utils/axios';
import { formErrorsHandler } from '../../utils/formErrors';

const SignUp = function ({ status, isSubmitting }) {
    return (
        <Form className="form-control">
            <FormField
                id="name"
                name="name"
                type="text"
                label="Name"
                placeholder="Enter your name"
                disabled={isSubmitting}
                labelSize={4}
            />
            <FormField
                id="email"
                name="email"
                type="text"
                label="Email"
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
            <FormField
                id="password2"
                name="password2"
                type="password"
                label="Password (again)"
                placeholder="Enter your password (again)"
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
                Sign up
            </button>
        </Form>
    );
};

SignUp.defaultProps = {
    next: '/',
};
SignUp.propTypes = {
    ...getFormPropTypes(['email', 'password']),
    next: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

const SignUpForm = withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        password: '',
        password2: '',
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required(tNoop('Name is required')),
        email: Yup.string().email(tNoop('Invalid email address')).required(tNoop('Email is required')),
        password: Yup.string().required(tNoop('Password is required')),
        password2: Yup.string().test('password-match', tNoop('Passwords do not match'), function passwordTest(value) {
            const { password } = this.parent;
            return password === value;
        }),
    }),

    handleSubmit: (values, { props, ...formik }) => {
        const toastId = 'loginToast';
        const router = useRouter();
        toast('Please wait...', {
            position: 'top-right',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            toastId,
        });
        axiosInstance({
            data: values,
            method: 'POST',
            url: '/api/user/signup',
        })
            .then(() => {
                const { next } = props;
                formik.setSubmitting(false);
                toast.update(toastId, {
                    render: "You've successfully signed up. Log in to continue.",
                    type: 'success',
                    isLoading: false,
                });
                router.push(next || '/');
            })
            .catch((error) => {
                formik.setSubmitting(false);
                formErrorsHandler(error, formik);
                // display errors
                toast.update(toastId, {
                    render: 'Something went wrong. Please try again',
                    type: 'error',
                    isLoading: false,
                });
            })
            .then(() => {
                // console.log('clear');
            });
    },

    displayName: 'SignUpForm', // helps with React DevTools
})(SignUp);

export default SignUpForm;
