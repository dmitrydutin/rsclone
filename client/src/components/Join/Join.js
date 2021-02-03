import styles from './Join.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { join } from '../../redux/reducers/AuthReducer';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import { getLanguage } from '../../languages/index';

import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Join = ({ language, join }) => {
    const translate = getLanguage(language);
    const initialValues = { name: '', surname: '', login: '', password: '' };

    const JoinSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, translate['join.yup.short'])
            .max(30, translate['join.yup.long'])
            .required(translate['join.yup.required']),
        surname: Yup.string()
            .min(5, translate['join.yup.short'])
            .max(30, translate['join.yup.long'])
            .required(translate['join.yup.required']),
        login: Yup.string()
            .min(5, translate['join.yup.short'])
            .max(30, translate['join.yup.long'])
            .required(translate['join.yup.required']),
        password: Yup.string()
            .min(5, translate['join.yup.short'])
            .max(30, translate['join.yup.long'])
            .required(translate['join.yup.required']),
    });

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        join(
            values.name,
            values.surname,
            values.login,
            values.password,
            setSubmitting,
            setErrors,
            translate,
        );
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
                            <Form className={styles.form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="h3"
                                            component="h1"
                                            align="center"
                                            color="textPrimary"
                                        >
                                            {translate['join.signUp']}
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
                                            {translate['join.reasonForRegistration']}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Field
                                            component={TextField}
                                            name="name"
                                            label={translate['join.form.name']}
                                            variant="outlined"
                                            fullWidth={true}
                                            autoComplete='true'
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Field
                                            component={TextField}
                                            name="surname"
                                            label={translate['join.form.surname']}
                                            variant="outlined"
                                            fullWidth={true}
                                            autoComplete='true'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="login"
                                            label={translate['join.form.login']}
                                            variant="outlined"
                                            fullWidth={true}
                                            autoComplete='true'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="password"
                                            type="password"
                                            label={translate['join.form.password']}
                                            variant="outlined"
                                            fullWidth={true}
                                            autoComplete='true'
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            component="i"
                                            color="textSecondary"
                                        >
                                            {translate['join.form.requiredFields']}
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
                                            {translate['join.form.send']}
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

export default compose(connect(mapStateToProps, { join }), withLoginRedirect)(Join);
