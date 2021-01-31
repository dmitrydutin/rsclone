import styles from './Login.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/reducers/AuthReducer';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import { getLanguage } from '../../languages/index';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const Login = ({ language, login }) => {
    const translate = getLanguage(language);
    const initialValues = { login: '', password: '' };

    const LoginSchema = Yup.object().shape({
        login: Yup.string()
            .min(5, translate['login.yup.short'])
            .max(30, translate['login.yup.long'])
            .required(translate['login.yup.required']),
        password: Yup.string()
            .min(5, translate['login.yup.short'])
            .max(30, translate['login.yup.long'])
            .required(translate['login.yup.required']),
    });

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        login(values.login, values.password, setSubmitting, setErrors, translate);
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
                                            {translate['login.signIn']}
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
                                            {translate['login.haveAccount']}
                                            <Link
                                                component={RouterLink}
                                                to="/join"
                                                variant="h6"
                                                underline="none"
                                                className={styles.link}
                                            >
                                                {translate['login.signUp']}
                                            </Link>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="login"
                                            label={translate['login.form.login']}
                                            variant="outlined"
                                            fullWidth={true}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="password"
                                            type="password"
                                            label={translate['login.form.password']}
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
                                            {translate['login.form.requiredFields']}
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
                                            {translate['login.form.send']}
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

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default compose(connect(mapStateToProps, { login }), withLoginRedirect)(Login);
