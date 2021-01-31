import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { getLanguage } from '../../../languages/index';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TranslateIcon from '@material-ui/icons/Translate';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles((theme) => ({
    link: {
        padding: '8px 11px',
        fontSize: '15px',
        fontWeight: '500',
        '&:hover': {
            opacity: 0.75,
        },
    },
    mlAuto: {
        marginLeft: 'auto',
    },
    avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}));

const DesktopMenu = ({
    isAuth,
    user,
    token,
    logout,
    language,
    changeLanguage,
    theme,
    changeTheme,
}) => {
    const classes = useStyles();
    const translate = getLanguage(language);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = (event) => {
        handleClose(event);
        logout(token);
    };

    return (
        <>
            <Typography variant="body1" component="h1" className={classes.link}>
                <Link component={RouterLink} to="/feed" color="inherit" underline="none">
                    {translate['header.news']}
                </Link>
            </Typography>

            <Typography variant="body1" component="h1" className={classes.link}>
                <Link component={RouterLink} to="/messenger" color="inherit" underline="none">
                    {translate['header.messenger']}
                </Link>
            </Typography>

            <Button
                color="inherit"
                size="large"
                startIcon={<TranslateIcon />}
                onClick={changeLanguage}
                className={classes.mlAuto}
            >
                {translate['header.language']}
            </Button>

            <IconButton color="inherit" onClick={changeTheme}>
                {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>

            {isAuth ? (
                <>
                    <IconButton color="inherit" onClick={handleClick}>
                        <Avatar
                            alt="Avatar"
                            src={user.avatar}
                            className={classes.avatar}
                            variant="rounded"
                        >
                            {user.name.slice(0, 1)}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component={RouterLink} to="/profile">
                            {translate['header.profile']}
                        </MenuItem>
                        <MenuItem onClick={logoutHandler}>{translate['header.logout']}</MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <Button color="inherit" size="large" component={RouterLink} to="/login">
                        {translate['header.login']}
                    </Button>

                    <Button color="inherit" size="large" component={RouterLink} to="/join">
                        {translate['header.join']}
                    </Button>
                </>
            )}
        </>
    );
};

export default DesktopMenu;
