const validate = (values) => {
    const errors = {};

    if (!values.login) {
        errors.login = 'Required';
    } else if (!/^[A-Z0-9.-]{5,15}$/i.test(values.login)) {
        errors.login = 'Invalid login';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (!/^[A-Z0-9.-]{5,15}$/i.test(values.password)) {
        errors.password = 'Invalid password';
    }

    return errors;
};

export default validate;
