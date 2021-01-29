import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { toggleTheme, toggleLanguage } from '../../redux/reducers/AppReducer';
import { getLanguage } from '../../languages/index';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import TranslateIcon from '@material-ui/icons/Translate';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.header.background,
        borderBottom: `1px solid ${theme.palette.header.border}`,
        color: theme.palette.header.contrastText,
    },
    companyName: {
        marginRight: 'auto',
    },
}));

const Header = ({ isAuth, language, toggleTheme, toggleLanguage, theme }) => {
    const classes = useStyles();
    const translate = getLanguage(language);

    const changeTheme = () => {
        toggleTheme(theme);
    };

    const changeLanguage = () => {
        toggleLanguage(language);
    };

    return (
        <AppBar className={classes.header} elevation={0}>
            <Container>
                <Toolbar disableGutters>
                    <Link
                        component={RouterLink}
                        to="/feed"
                        color="inherit"
                        underline="none"
                        className={classes.companyName}
                    >
                        <Typography variant="h6" component="h1">
                            {translate['header.companyName']}
                        </Typography>
                    </Link>

                    <Button
                        color="inherit"
                        size="large"
                        startIcon={<TranslateIcon />}
                        onClick={changeLanguage}
                    >
                        {translate['header.language']}
                    </Button>

                    <IconButton color="inherit" onClick={changeTheme}>
                        {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>

                    {isAuth ? (
                        <>
                            <IconButton color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </>
                    ) : (
                        <div>
                            <Button color="inherit" component={RouterLink} to="/login">
                                {translate['header.login']}
                            </Button>

                            <Button color="inherit" component={RouterLink} to="/join">
                                {translate['header.join']}
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    language: state.app.language,
    theme: state.app.theme,
});

export default connect(mapStateToProps, { toggleTheme, toggleLanguage })(Header);
