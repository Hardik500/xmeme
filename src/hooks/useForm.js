//useForm.js

// This file contains a custom hook to handle form functionilties like handling of validation and taking in the form values

import { useState, useEffect } from 'react';


const useForm = (callback, validate, initialProps = {}, customErrors = {}) => {

    const [values, setValues] = useState(initialProps);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If there are no errors and user is trying to submit, call the respective function which is passed
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    //Submits and checks if there are errors in the form and passes it
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors({...customErrors, ...validate(values)});
        setIsSubmitting(true);
    };

    //Adds the values in an object WRT their names as key
    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    }
};

export default useForm;
