import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withLogoutRedirect } from '../../../hoc/withAuthRedirect';
import { getDialogs, getMessages, uploadImage } from '../../../redux/reducers/ChatReducer';
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
    input: {
        display: 'none',
    },
    borderRight500: {
        borderRight: '1px solid',
        borderRightColor: theme.palette.chat.borderColor,
    },
    messageImage: {
        paddingTop: '10px',
    },
}));

const Chat = (props) => {
    const { token, getMessages, getDialogs, language, dialogs, user, messages, uploadImage } = props;
    const translate = getLanguage(language);
    const initialValues = { messageInput: '', uploadFile: null };

    const classes = useStyles();

    useEffect(() => {
        getDialogs(token, user.id);
    }, []);

    const onClickDialog = () => {
        getMessages(token, 1);
    };

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        console.log(values);
    };

    const validate = (values) => {
        const errors = {};

        if (!values.messageInput) {
            errors.messageInput = '';
        }

        return errors;
    };

    return (
        <Grid container className={styles.chatSection}>
            <Grid item xs={12} md={3} className={classes.borderRight500}>
                <div className={styles.dialogs}>
                    <div style={{ padding: '12px' }}>
                        <Search onInput={() => console.log(1)} />
                    </div>

                    <List className={styles.list}>
                        {dialogs.map(({ id, user, messages }) => (
                            <ListItem key={id} button onClick={onClickDialog}>
                                <ListItemAvatar>
                                    <Avatar alt={user.name} src={user.avatar}>
                                        {user.name[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${user.name} ${user.surname}`}
                                    secondary={messages[0].text}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Grid>

            <Grid item xs={9}>
                <Grid item xs={12}>
                    {messages.length > 0 ? (
                        <Navbar
                            name={messages[0].dialog.user.name}
                            surname={messages[0].dialog.user.surname}
                            avatar={messages[0].dialog.user.avatar}
                        />
                    ) : (
                        <Navbar />
                    )}
                </Grid>

                <List className={classes.messageArea}>
                    {messages.map((message) => {
                        if (message.isUserMessage) {
                            return (
                                <ListItem key={message.id} className={classes.listItemSelf}>
                                    <ListItemText
                                        className={classes.listItemText}
                                        primary={`${user.name} ${user.surname}`}
                                        secondary={message.text}
                                    ></ListItemText>
                                    <img
                                        className={classes.messageImage}
                                        src={message.photo}
                                        alt={message.id}
                                    />
                                </ListItem>
                            );
                        }
                        return (
                            <ListItem key={message.id} className={classes.listItemFriend}>
                                <ListItemAvatar>
                                    <Avatar
                                        className={classes.avatar}
                                        alt={message.dialog.user.name}
                                        src={message.dialog.user.avatar}
                                    >
                                        {message.dialog.user.name[0]}
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                    className={classes.listItemText}
                                    primary={`${message.dialog.user.name} ${message.dialog.user.surname}`}
                                    secondary={message.text}
                                ></ListItemText>
                            </ListItem>
                        );
                    })}
                </List>

                <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
                    {({ submitForm, isSubmitting, setFieldValue }) => (
                        <Form className={styles.messageForm}>
                            <input
                                className={classes.input}
                                accept="image/x-png,image/gif,image/jpeg"
                                type="file"
                                placeholder="Upload an image"
                                id="icon-button-file"
                                name="uploadFile"
                                onChange={(event) => {
                                    uploadImage(event, setFieldValue);
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
    connect(mapStateToProps, { getMessages, getDialogs, uploadImage }),
    withLogoutRedirect,
)(Chat);
