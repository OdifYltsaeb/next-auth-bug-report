/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect, getIn } from 'formik';
import classNames from 'classnames';

import { FieldProps } from '../../../types/forms';

const FormField = function ({ name, label, formik, check, labelSize, onChange, ...props }) {
    const error = getIn(formik.errors, name, null);
    const value = getIn(formik.values, name, undefined);
    const touched = getIn(formik.touched, name, false);
    const { inputClasses, type } = props;

    let input = (
        <input
            {...props}
            name={name}
            value={value}
            touched={`${touched}`}
            onChange={(e) => {
                formik.handleChange(e);
                onChange(e);
            }}
            onBlur={formik.handleBlur}
            className={classNames(inputClasses, 'input input-bordered', {
                'input-error': !!(touched && error),
            })}
        />
    );

    if (type === 'toggle') {
        input = (
            <input
                {...props}
                type="checkbox"
                name={name}
                touched={`${touched}`}
                onChange={(e) => {
                    formik.handleChange(e);
                    onChange(e);
                }}
                onBlur={formik.handleBlur}
                className={classNames(inputClasses, 'toggle', {
                    'input-error': !!(touched && error),
                })}
                checked={value === true}
            />
        );
    }

    if (type === 'select') {
        const { options } = props;
        input = (
            <select
                name={name}
                value={value}
                touched={`${touched}`}
                onChange={(e) => {
                    formik.handleChange(e);
                    onChange(e);
                }}
                onBlur={formik.handleBlur}
                className={classNames(inputClasses, 'select select-bordered', {
                    'input-error': !!(touched && error),
                })}
            >
                {options.map((option) => (
                    <option key={`option-${option.value}`} value={option.value} label={option.label} />
                ))}
            </select>
        );
    }

    const inputComponent = (
        <>
            {input}
            {touched && error ? <p className="text-xs italic text-red mt-2">{formik.errors[name]}</p> : null}
        </>
    );

    let labelComponent = null;
    if (label) {
        labelComponent = (
            <label
                htmlFor={props.id || name}
                className={classNames('label', `text-${labelSize}`, { 'cursor-pointer': check })}
            >
                {label}
            </label>
        );
    }

    return (
        <div className={classNames('flex flex-col mt-3', { hidden: type === 'hidden' })} key={`field-${name}`}>
            {labelComponent}
            {inputComponent}
        </div>
    );
};

FormField.propTypes = FieldProps.props;
FormField.defaultProps = FieldProps.defaults;

export default connect(FormField);
