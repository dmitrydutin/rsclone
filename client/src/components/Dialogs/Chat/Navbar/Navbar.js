import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Messages from '../../last-messages.json';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        background: theme.palette.chat.background,
        color: theme.palette.chat.color,
        minHeight: 70,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
    },
    title: {
        paddingLeft: theme.spacing(2),
    },
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.toolbar}>
            <Avatar alt="Avatar" src={Messages[0].avatar} className={classes.avatar}>
                A
            </Avatar>

            <Typography className={classes.title} variant="h6" noWrap>
                {Messages[0].name}
            </Typography>
        </div>
    );
}
