import styles from './Error.module.css';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Error = () => {
    return (
        <main className={styles.main}>
            <div className={styles.mainInner}>
                <Typography
                    variant="h5"
                    component="h1"
                    color="textPrimary"
                    className={styles.errorNumber}
                >
                    404
                </Typography>

                <Divider orientation="vertical" flexItem />

                <Typography
                    variant="body2"
                    component="p"
                    color="textPrimary"
                    className={styles.errorText}
                >
                    This page could not be found
                </Typography>
            </div>
        </main>
    );
};

export default compose(withLogoutRedirect)(Error);
