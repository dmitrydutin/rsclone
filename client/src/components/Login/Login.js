import styles from './Login.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/reducers/AuthReducer';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    login: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
    password: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
});

const Login = ({ login }) => {
    const initialValues = { login: '', password: '' };

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        login(values.login, values.password, setSubmitting, setErrors);
    };

    return (
        <main>
            <Container>
                <div className={styles.inner}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={LoginSchema}
                    >
                        {({ submitForm, isSubmitting }) => (
                            <Form className={styles.form} autoComplete="off">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h3"
                                            component="h1"
                                            align="center"
                                            color="textPrimary"
                                        >
                                            Sign in
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h6"
                                            component="p"
                                            align="center"
                                            color="textSecondary"
                                            className={styles.subtitle}
                                        >
                                            Don’t have an account?
                                            <Link
                                                component={RouterLink}
                                                to="/join"
                                                variant="h6"
                                                underline="none"
                                                className={styles.link}
                                            >
                                                Sign up.
                                            </Link>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="login"
                                            label="Login *"
                                            variant="outlined"
                                            fullWidth={true}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="password"
                                            type="password"
                                            label="Password *"
                                            variant="outlined"
                                            fullWidth={true}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            component="i"
                                            color="textSecondary"
                                        >
                                            Fields that are marked with * sign are required.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            onClick={submitForm}
                                            fullWidth={true}
                                            size="large"
                                        >
                                            Send
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </main>
    );
};

export default compose(connect(null, { login }), withLoginRedirect)(Login);
