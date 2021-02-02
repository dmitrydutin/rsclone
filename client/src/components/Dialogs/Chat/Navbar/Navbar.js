import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Messages from '../../last-messages.json'
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        background: theme.palette.chat.background,
        color: theme.palette.chat.color,
        minHeight: 70,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
    avatar: {
        marginTop: '10px',
    }
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar} alt={Messages[0].name} src={Messages[0].avatar} />
                    </ListItemAvatar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {Messages[0].name}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
