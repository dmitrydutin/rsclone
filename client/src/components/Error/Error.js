import styles from './Error.module.css';
import { connect } from 'react-redux';

const Error = ({language}) => {
    return (
        <main className={styles.main}>
            <div className={styles.mainInner}>
                <h1 className={styles.errorNumber}>404</h1>
                <p className={styles.errorText}>{language.notFound}</p>
            </div>
        </main>
    );
};

const mapStateToProps = function (state) {    
    return {        
        language: state.lang.language,
    };
};

export default connect(mapStateToProps)(Error);
