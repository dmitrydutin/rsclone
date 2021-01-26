import styles from './Join.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { join } from '../../redux/reducers/AuthReducer';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import Container from '@material-ui/core/Container';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
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

    const onSubmit = (values, { setSubmitting }) => {
        join(values.name, values.surname, values.login, values.password, setSubmitting);
    };

    return (
        <main className={styles.main}>
            <Container maxWidth="xs">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={JoinSchema}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form className={styles.form} autoComplete="off">
                            <h1 className={styles.title}>Join</h1>

                            <div className={styles.fieldGroup}>
                                <Field
                                    component={TextField}
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    className={styles.field}
                                />

                                <Field
                                    component={TextField}
                                    name="surname"
                                    label="Surname"
                                    variant="outlined"
                                    className={styles.field}
                                />
                            </div>

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
                                Join
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </main>
    );
};

export default compose(connect(null, { join }), withLoginRedirect)(Join);
