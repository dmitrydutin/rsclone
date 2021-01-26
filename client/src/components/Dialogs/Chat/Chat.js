import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Messages from '../last-messages.json'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar/Navbar'
import styles from './Chat.module.css'
import clip from './assets/images/clip.png'
import Upload from '../../Upload/Upload';
import smile from './assets/images/smile.svg'


const Chat = (props) => {

    return (
        <div>
            <Grid container component={Paper} className={styles.chatSection}>
                <Grid item xs={3} className={styles.borderRight500}>
                    <Grid item xs={12} style={{ padding: '18px' }}>
                        <TextField label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List className={styles.list}>
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
                    <Divider />
                </Grid>
                <Grid item xs={9}>
                    <Grid item xs={12}>
                        <Navbar />
                    </Grid>
                    <List className={styles.messageArea}>
                        <ListItem className={styles.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={styles.avatar} alt={Messages[0].name} src={Messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={styles.listItemText} primary={Messages[0].name} secondary={Messages[0].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemSelf}>
                            <ListItemText className={styles.listItemText} primary={Messages[1].name} secondary={Messages[1].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={styles.avatar} alt={Messages[0].name} src={Messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={styles.listItemText} primary={Messages[0].name} secondary={Messages[2].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemSelf}>
                            <ListItemText className={styles.listItemText} primary={Messages[1].name} secondary={Messages[3].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemFriend}>
                            <ListItemAvatar>
                                <Avatar className={styles.avatar} alt={Messages[0].name} src={Messages[0].avatar} />
                            </ListItemAvatar>
                            <ListItemText className={styles.listItemText} primary={Messages[0].name} secondary={Messages[4].message}>
                            </ListItemText>
                        </ListItem>
                        <ListItem className={styles.listItemSelf}>
                            <ListItemText className={styles.listItemText} primary={Messages[1].name} secondary={Messages[5].message}>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Grid container className={styles.sendMessageContainer}>
                        <Grid item xs={1} align="left" className={styles.gridClip}>
                            <img className={styles.clip} src={clip} alt='clip'></img>
                            {/* <Upload></Upload> */}
                        </Grid>
                        <Grid item xs={9}>
                            <TextField label="Type Something" fullWidth />
                        </Grid>
                        <Grid item xs={1} align="right">
                            <img className={styles.clip} src={smile} alt='smile'></img>
                        </Grid>
                        <Grid item xs={1} align="right" style={{flexBasis: 'unset'}}>
                            <Fab color="primary" aria-label="add" className={styles.sendIcon}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;
