import styles from './Header.module.css';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { FormControlLabel, Switch as SwitchComponent } from '@material-ui/core';
import NightsIcon from '@material-ui/icons/NightsStay';
import SunIcon from '@material-ui/icons/Brightness5';
import TranslateIcon from '@material-ui/icons/Translate';

const Header = (props) => {
    const { isAuth, language } = props;

    const dispatch = useDispatch();
    const toggleChecked = () => {
        dispatch({ type: 'CHANGE_THEME' });
    };
    const currentThemeCheck = useSelector((state) => state.theme.light);

    const currentLanguage = useSelector((state) => state.lang.status);
    function handleClickLanguage(event) {
        event.preventDefault();
        switch (currentLanguage) {
            case 'ENGLISH':
                dispatch({ type: 'SET_RUSSIAN' });
                break;
            case 'РУССКИЙ':
                dispatch({ type: 'SET_BELARUSSIAN' });
                break;
            case 'БЕЛАРУСКАЯ':
                dispatch({ type: 'SET_ENGLISH' });
                break;
            default:
                break;
        }
    }
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>
                        <Link component={RouterLink} to="/" color="inherit" underline="none">
                            Facebook
                        </Link>
                    </Typography>

                    {isAuth ? (
                        <div>{language.loggedIn}</div>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                className={styles.button}
                                component={RouterLink}
                                to="/login"
                            >
                                {language.login}
                            </Button>

                            <Button
                                color="inherit"
                                className={styles.button}
                                component={RouterLink}
                                to="/join"
                            >
                                {language.join}
                            </Button>
                        </>
                    )}
                    <FormControlLabel
                        className={styles.languageContainer}
                        control={
                            <SwitchComponent
                                checked={currentThemeCheck}
                                onChange={toggleChecked}
                                className={styles.languageSwitch}
                            />
                        }
                        label={
                            <div
                                className={currentThemeCheck ? styles.iconContainer : styles.night}
                            >
                                <NightsIcon className={styles.iconMoon} />
                                <SunIcon className={styles.iconSun} />
                            </div>
                        }
                    />
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<TranslateIcon />}
                        onClick={handleClickLanguage}
                        className={styles.button}
                    >
                        {currentLanguage}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    language: state.lang.language,
});

export default connect(mapStateToProps)(Header);
