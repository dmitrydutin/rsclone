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
import { FormControlLabel, Switch as SwitchComponent, Breadcrumbs } from '@material-ui/core';
import NightsIcon from '@material-ui/icons/NightsStay';
import SunIcon from '@material-ui/icons/Brightness5';
import sunImg from './assets/images/sun.png';
import moonImg from './assets/images/moon.png';

const Header = (props) => {
    const { isAuth, language } = props;

    const dispatch = useDispatch();
    const toggleChecked = () => {
        dispatch({ type: 'CHANGE_THEME' });
    };
    const currentThemeCheck = useSelector((state) => state.theme.light);

    function handleClickBreadCrumbsEng(event) {
        event.preventDefault();
        dispatch({ type: 'SET_ENGLISH' });
    }

    function handleClickBreadCrumbsRus(event) {
        event.preventDefault();
        dispatch({ type: 'SET_RUSSIAN' });
    }

    function handleClickBreadCrumbsBy(event) {
        event.preventDefault();
        dispatch({ type: 'SET_BELARUSSIAN' });
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
                            <Button color="inherit" component={RouterLink} to="/login">
                                {language.login}
                            </Button>

                            <Button color="inherit" component={RouterLink} to="/join">
                            {language.join}
                            </Button>
                        </>
                    )}
                    <FormControlLabel
                        control={
                            <SwitchComponent checked={currentThemeCheck} onChange={toggleChecked} />
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
                    <Breadcrumbs color="white">
                        <Typography
                            className={styles.languageBreadcrumb}
                            onClick={handleClickBreadCrumbsEng}
                        >
                            ENG
                        </Typography>
                        <Typography
                            className={styles.languageBreadcrumb}
                            onClick={handleClickBreadCrumbsRus}
                        >
                            RUS
                        </Typography>
                        <Typography
                            className={styles.languageBreadcrumb}
                            onClick={handleClickBreadCrumbsBy}
                        >
                            BY
                        </Typography>
                    </Breadcrumbs>
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
