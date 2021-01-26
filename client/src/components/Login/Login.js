import styles from './Login.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/reducers/AuthReducer';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import Container from '@material-ui/core/Container';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    login: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
    password: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
});

const Login = (props) => {
    const { login } = props;
    const initialValues = { login: '', password: '' };

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        login(values.login, values.password, setSubmitting, setErrors);
    };

    return (
        <main className={styles.main}>
            <Container maxWidth="xs">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={LoginSchema}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={styles.form} autoComplete="off">
                            <h1 className={styles.title}>Login</h1>

                            <Field
                                component={TextField}
                                name="login"
                                label="Login"
                                variant="outlined"
                                className={styles.field}
                            />

                            <Field
                                component={TextField}
                                name="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                className={styles.field}
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
            </Container>
        </main>
    );
};

export default compose(connect(null, { login }), withLoginRedirect)(Login);
