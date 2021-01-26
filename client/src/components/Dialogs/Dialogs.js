import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Search from './Search/Search';
import Messages from './last-messages.json'

const Dialogs = () => {

    const useStyles = makeStyles((theme) => ({
        list: {
            marginBottom: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 700,
            margin: '0 auto',
        },
    }));

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Search />
            <List className={classes.list}>
                {Messages.map(({ id, name, message, avatar }) => (
                    <React.Fragment key={id}>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar alt={name} src={avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={name} secondary={message} />
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
        </React.Fragment>
    );
}

export default Dialogs;
