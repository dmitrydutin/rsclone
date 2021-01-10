import styles from './Login.module.css';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

const Login = (props) => {
    return (
        <main className={styles.main}>
            <Container maxWidth="xs" className={styles.container}>
                <h1>Login form</h1>
            </Container>
        </main>
    );
};

export default connect(null)(Login);
