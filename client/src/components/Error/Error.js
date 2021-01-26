import styles from './Error.module.css';

import { connect } from 'react-redux';

import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';

const Error = ({ language }) => {
    return (
        <main className={styles.main}>
            <div className={styles.mainInner}>
                <h1 className={styles.errorNumber}>404</h1>
                <p className={styles.errorText}>{language.notFound}</p>
            </div>
        </main>
    );
};

export default compose(withLogoutRedirect)(Error);
