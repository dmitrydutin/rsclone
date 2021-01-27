import styles from './Error.module.css';

import { connect } from 'react-redux';

import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import russian from '../../languages/russian';
import english from '../../languages/english';

const Error = ({ language }) => {
    const currentLanguage = language === 'ENGLISH' ? english : russian;

    return (
        <main className={styles.main}>
            <div className={styles.mainInner}>
                <h1 className={styles.errorNumber}>404</h1>
                <p className={styles.errorText}>{currentLanguage.notFound}</p>
            </div>
        </main>
    );
};

const mapStateToProps = (state) => ({
    language: state.app.language,
});
export default compose(connect(mapStateToProps), withLogoutRedirect)(Error);
