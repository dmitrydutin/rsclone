import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withLogoutRedirect } from '../../../hoc/withAuthRedirect';
import { getDialogs, getMessages } from '../../../redux/reducers/ChatReducer';
import { getLanguage } from '../../../languages/index';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import messages from '../last-messages.json'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Navbar from './Navbar/Navbar'
import styles from './Chat.module.css'

import clip from './assets/images/clip.png'

const Chat = (props) => {
    const { token, getMessages, getDialogs, language } = props;
    const translate = getLanguage(language);

    const useStyles = makeStyles((theme) => ({
        messageArea: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.messageArea.background,
            height: '77%',
            fontSize: '20px',
            overflowY: 'scroll',
        },
        listItemFriend: {
            backgroundColor: theme.palette.chatMessagesFriend.background,
            width: 'fit-content',
            borderRadius: '15px',
            margin: '0 0 10px 10px',
            paddingTop: '0px',
            paddingBottom: '0px',
            maxWidth: '500px',
        },
        listItemSelf: {
            backgroundColor: '#9bc4fd',
            width: 'fit-content',
            borderRadius: '15px',
            margin: '0 10px 10px 10px',
            paddingTop: '0px',
            paddingBottom: '0px',
            alignSelf: 'flex-end',
            maxWidth: '500px',
        },
    }));

    useEffect(() => {
        getDialogs(token, 1);
    }, []);

    const onClickDialog = () => {
        getMessages(token, 1);
    };

    const classes = useStyles();

    return (
        <div>
            <Grid container className={styles.chatSection}>
                <Grid item xs={3} className={styles.borderRight500}>
                    <Grid item xs={12} style={{ padding: '12px' }}>
                        <TextField label={translate['chat.searchPlaceholder']} variant="outlined" fullWidth />
                    </Grid>
                    <List className={styles.list}>
                        {messages.map(({ id, name, message, avatar }) => (
                            <ListItem key={id} button onClick={onClickDialog}>
                                <ListItemAvatar>
                                    <Avatar alt={name} src={avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={name} secondary={message} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <Grid item xs={12}>
                        <Navbar />
                    </Grid>
                    <List className={classes.messageArea}>
                        <ListItem className={classes.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar} alt={messages[0].name} src={messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={classes.listItemText} primary={messages[0].name} secondary={messages[0].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemSelf}>
                            <ListItemText className={classes.listItemText} primary={messages[1].name} secondary={messages[1].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar} alt={messages[0].name} src={messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={classes.listItemText} primary={messages[0].name} secondary={messages[2].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemSelf}>
                            <ListItemText className={classes.listItemText} primary={messages[1].name} secondary={messages[3].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={classes.avatar} alt={messages[0].name} src={messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={classes.listItemText} primary={messages[0].name} secondary={messages[4].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItemSelf}>
                            <ListItemText className={classes.listItemText} primary={messages[1].name} secondary={messages[5].message}>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Grid container className={styles.sendMessageContainer}>
                        <Grid item xs={1} align="left" className={styles.gridClip}>
                            <img className={styles.clip} src={clip} alt='clip' />
                        </Grid>
                        <Grid item xs={9}>
                            <TextField label={translate['chat.messagePlaceholder']} fullWidth />
                        </Grid>
                        <Grid item xs={1} align="right">
                        </Grid>
                        <Grid item xs={1} align="right" style={{ flexBasis: 'unset' }}>
                            <Fab color="primary" aria-label="add" className={styles.sendIcon}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    language: state.app.language,
})

export default compose(connect(mapStateToProps, { getMessages, getDialogs }), withLogoutRedirect)(Chat);
