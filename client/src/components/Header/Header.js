import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../../redux/reducers/AuthReducer';
import { toggleTheme, toggleLanguage } from '../../redux/reducers/AppReducer';
import { getLanguage } from '../../languages/index';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import DesktopMenu from './parts/DesktopMenu';
import MobileMenu from './parts/MobileMenu';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.header.background,
        borderBottom: `1px solid ${theme.palette.header.border}`,
        color: theme.palette.header.contrastText,
    },
    companyName: {
        marginRight: '20px',
        padding: '8px 11px',
        fontSize: '15px',
        fontWeight: '500',
        textTransform: 'uppercase',
        '&:hover': {
            opacity: 0.75,
        },
    },
}));

const Header = ({ isAuth, user, token, logout, language, toggleLanguage, theme, toggleTheme }) => {
    const classes = useStyles();
    const translate = getLanguage(language);

    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900 ? setMobileView(true) : setMobileView(false);
        };

        setResponsiveness();
        window.addEventListener('resize', () => setResponsiveness());
    }, []);

    const changeTheme = () => {
        toggleTheme(theme);
    };

    const changeLanguage = () => {
        toggleLanguage(language);
    };

    return (
        <AppBar className={classes.header} elevation={0} position='sticky'>
            <Container>
                <Toolbar disableGutters>
                    <Typography variant="body1" component="h1" className={classes.companyName}>
                        <Link component={RouterLink} to="/feed" color="inherit" underline="none">
                            {translate['header.companyName']}
                        </Link>
                    </Typography>

                    {mobileView ? (
                        <MobileMenu
                            isAuth={isAuth}
                            token={token}
                            logout={logout}
                            language={language}
                            changeLanguage={changeLanguage}
                            theme={theme}
                            changeTheme={changeTheme}
                        />
                    ) : (
                        <DesktopMenu
                            isAuth={isAuth}
                            user={user}
                            token={token}
                            logout={logout}
                            language={language}
                            changeLanguage={changeLanguage}
                            theme={theme}
                            changeTheme={changeTheme}
                        />
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    token: state.auth.token,
    language: state.app.language,
    theme: state.app.theme,
});

export default connect(mapStateToProps, { logout, toggleTheme, toggleLanguage })(Header);
