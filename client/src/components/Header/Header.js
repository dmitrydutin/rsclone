import styles from './Header.module.css';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { FormControlLabel, Switch as SwitchComponent } from '@material-ui/core';
import NightsIcon from '@material-ui/icons/NightsStay';
import SunIcon from '@material-ui/icons/Brightness5';
import TranslateIcon from '@material-ui/icons/Translate';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
        <AppBar>
            <Toolbar className={styles.container}>
                <Link component={RouterLink} to="/" color="inherit" underline="none">
                    <Typography variant="h6" component="h1">
                        Facebook
                    </Typography>
                </Link>

                {isAuth ? (
                    <>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <IconButton color="inherit" component={RouterLink} to="/feed">
                            Feed
                        </IconButton>
                    </>
                ) : (
                    <>
                        <div>
                            <Button color="inherit" component={RouterLink} to="/login">
                                Login
                            </Button>

                            <Button color="inherit" component={RouterLink} to="/join">
                                Join
                            </Button>
                        </div>
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
                        <div className={currentThemeCheck ? styles.iconContainer : styles.night}>
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
        </AppBar>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    language: state.lang.language,
});

export default connect(mapStateToProps)(Header);
