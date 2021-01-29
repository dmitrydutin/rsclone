import styles from './Join.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { join } from '../../redux/reducers/AuthReducer';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';

const JoinSchema = Yup.object().shape({
    name: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
    surname: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
    login: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
    password: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
});

const Join = (props) => {
    const { join } = props;
    const initialValues = { name: '', surname: '', login: '', password: '' };

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        join(values.name, values.surname, values.login, values.password, setSubmitting, setErrors);
    };

    return (
        <main>
            <Container>
                <div className={styles.inner}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={JoinSchema}
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
                                            Sign up
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h6"
                                            component="h6"
                                            align="center"
                                            color="textSecondary"
                                            className={styles.subtitle}
                                        >
                                            Register to send messages, photos and videos to your
                                            friends.
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Field
                                            component={TextField}
                                            name="name"
                                            label="First name *"
                                            variant="outlined"
                                            fullWidth={true}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Field
                                            component={TextField}
                                            name="surname"
                                            label="Last name *"
                                            variant="outlined"
                                            fullWidth={true}
                                        />
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

export default compose(connect(null, { join }), withLoginRedirect)(Join);
