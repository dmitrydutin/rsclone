import styles from './LoginForm.module.css';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import validate from './validate';

const LoginForm = (props) => {
    const { initialValues, onSubmit } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
        >
            {({ submitForm, isSubmitting }) => (
                <Form className={styles.form}>
                    <h1 className={styles.title}>Login</h1>
                    <p className={styles.subtitle}>Welcome back</p>

                    <Field
                        component={TextField}
                        name="login"
                        label="Login"
                        variant="outlined"
                        autoComplete="off"
                    />
                    <Field
                        component={TextField}
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        autoComplete="off"
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        Login
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
