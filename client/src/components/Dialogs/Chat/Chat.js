import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withLogoutRedirect } from '../../../hoc/withAuthRedirect';
import {
    getDialogs,
    getMessages,
    uploadImage,
    createMessage,
} from '../../../redux/reducers/ChatReducer';
import { getLanguage } from '../../../languages/index';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';

import Grid from '@material-ui/core/Grid';
import { TextField } from 'formik-material-ui';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SendIcon from '@material-ui/icons/Send';
import Navbar from './Navbar/Navbar';
import styles from './Chat.module.css';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Search from '../Search/Search';

const useStyles = makeStyles((theme) => ({
    messageArea: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.messageArea.background,
        height: 'calc(100vh - 65px - 71px - 80px - 76px)',
        fontSize: '20px',
        overflowY: 'scroll',
        [theme.breakpoints.down('959')]: {
            height: '600px',
        },
    },
    listItemContainer: {
        display: 'flex',
        alignSelf: 'flex-start',
        paddingTop: '10px'
    },
    listItemFriend: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.chatMessagesFriend.background,
        width: 'fit-content',
        borderRadius: '15px',
        margin: '0 0 10px 10px',
        paddingTop: '0px',
        paddingBottom: '0px',
        maxWidth: '500px',
    },
    friendAvatar: {
        alignSelf: 'flex-start',
    },
    listItemSelf: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#9bc4fd',
        width: 'fit-content',
        borderRadius: '15px',
        margin: '0 10px 10px 10px',
        paddingTop: '0px',
        paddingBottom: '0px',
        alignSelf: 'flex-end',
        maxWidth: '500px',
    },
    listItemText: {
        alignSelf: 'flex-start',
    },
    input: {
        display: 'none',
    },
    borderRight500: {
        borderRight: '1px solid',
        borderRightColor: theme.palette.chat.borderColor,
    },
    messageImage: {
        width: '250px',
        paddingBottom: '10px',
    },
}));

const Chat = (props) => {
    const {
        token,
        getMessages,
        getDialogs,
        language,
        dialogs,
        user,
        messages,
        uploadImage,
        createMessage,
    } = props;

    const [dialogId, setDialogId] = useState(null);
    const [senderUser, setSenderUser] = useState(null);
    const translate = getLanguage(language);
    const initialValues = { messageInput: '', uploadFile: null };

    const classes = useStyles();

    useEffect(() => {
        getDialogs(token, user.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickDialog = (user, id) => {
        setDialogId(id);
        setSenderUser(user);
        getMessages(token, id);
    };

    const handleSubmit = (values, { setSubmitting, setFieldValue }) => {
        createMessage(
            token,
            values.messageInput,
            values.uploadFile,
            dialogId,
            user.id,
            setSubmitting,
        );
        setFieldValue('messageInput', '');
        setFieldValue('uploadFile', null);
    };

    const validate = (values) => {
        const errors = {};

        if (!values.messageInput) {
            errors.messageInput = '';
        }

        return errors;
    };

    const searchHandler = (event) => {
        getDialogs(token, user.id, event.target.value);
    };

    return (
        <Grid container className={styles.chatSection}>
            <Grid item xs={12} md={3} className={classes.borderRight500}>
                <div className={styles.dialogs}>
                    <div style={{ padding: '12px' }}>
                        <Search onInput={searchHandler} />
                    </div>

                    <List className={styles.list}>
                        {dialogs.map(({ id, user, messages }) => (
                            <ListItem key={id} button onClick={() => onClickDialog(user, id)}>
                                <ListItemAvatar>
                                    <Avatar alt={user.name} src={user.avatar}>
                                        {user.name[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${user.name} ${user.surname}`}
                                    secondary={messages.length > 0 ? messages[0].text : ''}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Grid>

            <Grid item xs={12} md={9}>
                {dialogs.length > 0 ? (
                    <Navbar
                        name={senderUser?.name}
                        surname={senderUser?.surname}
                        avatar={senderUser?.avatar}
                    />
                ) : (
                    <Navbar />
                )}

                <List className={classes.messageArea}>
                    {messages.map((message) => {
                        if (message.userId === user.id) {
                            return (
                                <ListItem key={message.id} className={classes.listItemSelf}>
                                    <ListItemText
                                        className={classes.listItemText}
                                        primary={`${user.name} ${user.surname}`}
                                        secondary={message.text}
                                    ></ListItemText>
                                    {message.photo !== null && (
                                        <img
                                            className={classes.messageImage}
                                            src={message.photo}
                                            alt={message.id}
                                        />
                                    )}
                                </ListItem>
                            );
                        }
                        return (
                            <ListItem key={message.id} className={classes.listItemFriend}>
                                <div className={classes.listItemContainer}>
                                    <ListItemAvatar className={classes.friendAvatar}>
                                        <Avatar
                                            className={classes.avatar}
                                            alt={senderUser?.name}
                                            src={senderUser?.avatar}
                                        >
                                            {senderUser?.name?.slice(0, 1)}
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        className={classes.listItemText}
                                        primary={`${senderUser?.name} ${senderUser?.surname}`}
                                        secondary={message.text}
                                    ></ListItemText>
                                </div>

                                {message.photo !== null && (
                                    <img
                                        className={classes.messageImage}
                                        src={message.photo}
                                        alt={message.id}
                                    />
                                )}
                            </ListItem>
                        );
                    })}
                </List>

                <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
                    {({ submitForm, isSubmitting, setFieldValue, setSubmitting }) => (
                        <Form className={styles.messageForm}>
                            <input
                                className={classes.input}
                                accept="image/x-png,image/gif,image/jpeg"
                                type="file"
                                placeholder="Upload an image"
                                id="icon-button-file"
                                name="uploadFile"
                                onChange={(event) => {
                                    uploadImage(event, setFieldValue, setSubmitting);
                                }}
                            />

                            <label htmlFor="icon-button-file">
                                <IconButton
                                    aria-label="upload picture"
                                    component="span"
                                    disabled={isSubmitting}
                                >
                                    <AttachFileIcon />
                                </IconButton>
                            </label>

                            <Field
                                component={TextField}
                                name="messageInput"
                                multiline={true}
                                label={translate['chat.messagePlaceholder']}
                                variant="outlined"
                                fullWidth={true}
                            />

                            <IconButton
                                className={classes.iconButton}
                                aria-label="search"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                <SendIcon />
                            </IconButton>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
    language: state.app.language,
    dialogs: state.chat.dialogs,
    messages: state.chat.messages,
    user: state.auth.user,
});

export default compose(
    connect(mapStateToProps, { getMessages, getDialogs, uploadImage, createMessage }),
    withLogoutRedirect,
)(Chat);
