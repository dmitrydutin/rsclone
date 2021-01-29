import styles from './Error.module.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { getLanguage } from '../../languages/index';

const Error = ({ language }) => {
    const currentLanguage = getLanguage(language);

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
                    {currentLanguage['Error.notFound']}
                </Typography>
            </div>
        </main>
    );
};

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default compose(connect(mapStateToProps), withLogoutRedirect)(Error);
