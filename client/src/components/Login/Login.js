import styles from './Login.module.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/reducers/AuthReducer';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import Container from '@material-ui/core/Container';
import LoginForm from './LoginForm/LoginForm';

const Login = (props) => {
    const { login } = props;

    const initialValues = { login: '', password: '' };

    const onSubmit = (values, { setSubmitting }) => {
        login(values.login, values.password, setSubmitting);
    };

    return (
        <main className={styles.main}>
            <Container maxWidth="xs" className={styles.container}>
                <LoginForm initialValues={initialValues} onSubmit={onSubmit} />
            </Container>
        </main>
    );
};

export default compose(connect(null, { login }), withLoginRedirect)(Login);
