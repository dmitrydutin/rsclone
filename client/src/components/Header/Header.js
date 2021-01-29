import styles from './Header.module.css';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { FormControlLabel, Switch as SwitchComponent } from '@material-ui/core';
import NightsIcon from '@material-ui/icons/Brightness4';
import SunIcon from '@material-ui/icons/Brightness7';
import TranslateIcon from '@material-ui/icons/Translate';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { setTheme } from '../../redux/reducers/AppReducer';
import { setLanguage } from '../../redux/reducers/AppReducer';
import { getLanguage, toggleLanguage } from '../../languages/index';
import { toggleTheme } from '../../themes/index';

const Header = (props) => {
    const { isAuth, language, setTheme, setLanguage, theme } = props;
    const currentLanguage = getLanguage(language);

    const changeTheme = () => {
        const selectedTheme = toggleTheme(theme);
        setTheme(selectedTheme);
    };

    const changeLanguage = () => {
        const selectedLanguage = toggleLanguage(language);
        setLanguage(selectedLanguage);
    };

    return (
        <AppBar>
            <Toolbar className={styles.container}>
                <Link component={RouterLink} to="/" color="inherit" underline="none">
                    <IconButton color="inherit" variant="h6" component={RouterLink} to="/feed">
                        Facebook
                    </IconButton>
                </Link>

                {isAuth ? (
                    <>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <div>
                            <Button color="inherit" component={RouterLink} to="/login">
                                {currentLanguage['Header.login']}
                            </Button>

                            <Button color="inherit" component={RouterLink} to="/join">
                                {currentLanguage['Header.join']}
                            </Button>
                        </div>
                    </>
                )}

                <FormControlLabel
                    className={styles.languageContainer}
                    control={
                        <SwitchComponent
                            checked={theme === 'light'}
                            onChange={changeTheme}
                            className={styles.languageSwitch}
                        />
                    }
                    label={
                        <div>
                            {theme === 'light' ? (
                                <SunIcon className={styles.iconSun} />
                            ) : (
                                <NightsIcon className={styles.iconMoon} />
                            )}
                        </div>
                    }
                />
                
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<TranslateIcon />}
                    onClick={changeLanguage}
                    className={styles.button}
                >
                    {language}
                </Button>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    language: state.app.language,
    theme: state.app.theme,
});

export default connect(mapStateToProps, { setTheme, setLanguage })(Header);
