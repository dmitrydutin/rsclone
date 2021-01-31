import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { getLanguage } from '../../../languages/index';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ChatIcon from '@material-ui/icons/Chat';
import TranslateIcon from '@material-ui/icons/Translate';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    mlAuto: {
        marginLeft: 'auto',
    },
    companyName: {
        padding: '5px 0px',
        fontSize: '15px',
        fontWeight: '500',
        textTransform: 'uppercase',
        [theme.breakpoints.down('xs')]: {
            padding: '1px 0px',
        },
    },
    list: {
        width: 250,
    },
}));

const MobileMenu = ({ isAuth, token, logout, language, changeLanguage, theme, changeTheme }) => {
    const classes = useStyles();
    const translate = getLanguage(language);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const logoutHandler = (event) => {
        logout(token);
    };

    return (
        <>
            <IconButton color="inherit" onClick={handleDrawerOpen} className={classes.mlAuto}>
                <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                <List className={classes.list}>
                    <ListItem button component={RouterLink} to="/feed">
                        <ListItemText
                            primary={translate['header.companyName']}
                            primaryTypographyProps={{
                                variant: 'body1',
                                className: classes.companyName,
                            }}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem button component={RouterLink} to="/feed">
                        <ListItemIcon>
                            <RssFeedIcon />
                        </ListItemIcon>
                        <ListItemText primary={translate['header.news']} />
                    </ListItem>

                    <ListItem button component={RouterLink} to="/messenger">
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary={translate['header.messenger']} />
                    </ListItem>

                    {isAuth ? (
                        <>
                            <ListItem button component={RouterLink} to="/profile">
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={translate['header.profile']} />
                            </ListItem>

                            <ListItem button onClick={logoutHandler}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary={translate['header.logout']} />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button component={RouterLink} to="/login">
                                <ListItemIcon>
                                    <LockIcon />
                                </ListItemIcon>
                                <ListItemText primary={translate['header.login']} />
                            </ListItem>

                            <ListItem button component={RouterLink} to="/join">
                                <ListItemIcon>
                                    <LockIcon />
                                </ListItemIcon>
                                <ListItemText primary={translate['header.join']} />
                            </ListItem>
                        </>
                    )}

                    <Divider />

                    <ListItem button onClick={changeLanguage}>
                        <ListItemIcon>
                            <TranslateIcon />
                        </ListItemIcon>
                        <ListItemText primary={translate['header.language']} />
                    </ListItem>

                    <ListItem button onClick={changeTheme}>
                        <ListItemIcon>
                            {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </ListItemIcon>
                        <ListItemText primary={translate['header.theme']} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default MobileMenu;
