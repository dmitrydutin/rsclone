import styles from './Error.module.css';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import Divider from '@material-ui/core/Divider';

const Error = () => {
    return (
        <main className={styles.main}>
            <div className={styles.mainInner}>
                <h1 className={styles.errorNumber}>404</h1>
                <Divider orientation="vertical" flexItem />
                <p className={styles.errorText}>This page could not be found</p>
            </div>
        </main>
    );
};

export default compose(withLogoutRedirect)(Error);
