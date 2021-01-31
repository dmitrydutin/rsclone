import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withLogoutRedirect } from '../../../hoc/withAuthRedirect';
import { getDialogs, getMessages } from '../../../redux/reducers/ChatReducer';

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
import smile from './assets/images/smile.svg'



const Chat = (props) => {
    const { token, getMessages, getDialogs } = props;

    useEffect(() => {
        getDialogs(token, 1);
    }, []);

    const onClickDialog = () => {
        getMessages(token, 1);
    };


    return (
        <div>
            <Grid container className={styles.chatSection}>
                <Grid item xs={3} className={styles.borderRight500}>
                    <Grid item xs={12} style={{ padding: '12px' }}>
                        <TextField label="Search" variant="outlined" fullWidth />
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
                        <Navbar className={styles.navbar}/>
                    </Grid>
                    <List className={styles.messageArea}>
                        <ListItem className={styles.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={styles.avatar} alt={messages[0].name} src={messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={styles.listItemText} primary={messages[0].name} secondary={messages[0].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemSelf}>
                            <ListItemText className={styles.listItemText} primary={messages[1].name} secondary={messages[1].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={styles.avatar} alt={messages[0].name} src={messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={styles.listItemText} primary={messages[0].name} secondary={messages[2].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemSelf}>
                            <ListItemText className={styles.listItemText} primary={messages[1].name} secondary={messages[3].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={styles.avatar} alt={messages[0].name} src={messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={styles.listItemText} primary={messages[0].name} secondary={messages[4].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemSelf}>
                            <ListItemText className={styles.listItemText} primary={messages[1].name} secondary={messages[5].message}>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Grid container className={styles.sendMessageContainer}>
                        <Grid item xs={1} align="left" className={styles.gridClip}>
                            <img className={styles.clip} src={clip} alt='clip'></img>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField label="Type Something" fullWidth />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <img className={styles.clip} src={smile} alt='smile'></img>
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
})

export default compose(connect(mapStateToProps, { getMessages, getDialogs }), withLogoutRedirect)(Chat);
