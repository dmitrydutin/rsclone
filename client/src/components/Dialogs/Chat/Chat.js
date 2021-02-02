import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withLogoutRedirect } from '../../../hoc/withAuthRedirect';
import { getDialogs, getMessages } from '../../../redux/reducers/ChatReducer';
import { getLanguage } from '../../../languages/index';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { Paper } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import { TextField } from 'formik-material-ui';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import messages from '../last-messages.json';
import Navbar from './Navbar/Navbar';
import styles from './Chat.module.css';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Search from '../Search/Search';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';

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
}));

const Chat = (props) => {
    const { token, getMessages, getDialogs, language } = props;
    const translate = getLanguage(language);
    const initialValues = { messageInput: '' };
    const postState = useState(<SendIcon />);

    const classes = useStyles();

    useEffect(() => {
        getDialogs(token, 1);
    }, []);

    const onClickDialog = () => {
        getMessages(token, 1);
    };

    const handleSubmit = () => {
        console.log('click on submit');
    };

    const validate = (values, props /* only available when using withFormik */) => {
        const errors = {};

        if (!values.messageInput) {
            errors.messageInput = '';
        }

        return errors;
    };

    return (
        <Grid container className={styles.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <div className={styles.dialogs}>
                    <div style={{ padding: '12px' }}>
                        <Search />
                    </div>

                    <List className={styles.list}>
                        {messages.map(({ id, name, message, avatar }) => (
                            <ListItem key={id} button onClick={onClickDialog}>
                                <ListItemAvatar>
                                    <Avatar alt={name} src={avatar}>
                                        A
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={name} secondary={message} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Grid>

            <Grid item xs={9}>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>

                <List className={classes.messageArea}>
                    <ListItem className={classes.listItemFriend}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                alt={messages[0].name}
                                src={messages[0].avatar}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[0].name}
                            secondary={messages[0].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemSelf}>
                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[1].name}
                            secondary={messages[1].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemFriend}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                alt={messages[0].name}
                                src={messages[0].avatar}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[0].name}
                            secondary={messages[2].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemSelf}>
                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[1].name}
                            secondary={messages[3].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemFriend}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                alt={messages[0].name}
                                src={messages[0].avatar}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[0].name}
                            secondary={messages[4].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemFriend}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                alt={messages[0].name}
                                src={messages[0].avatar}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[0].name}
                            secondary={messages[4].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemFriend}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                alt={messages[0].name}
                                src={messages[0].avatar}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[0].name}
                            secondary={messages[4].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemFriend}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                alt={messages[0].name}
                                src={messages[0].avatar}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[0].name}
                            secondary={messages[4].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemFriend}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                alt={messages[0].name}
                                src={messages[0].avatar}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[0].name}
                            secondary={messages[4].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemFriend}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                alt={messages[0].name}
                                src={messages[0].avatar}
                            />
                        </ListItemAvatar>

                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[0].name}
                            secondary={messages[4].message}
                        ></ListItemText>
                    </ListItem>

                    <ListItem className={classes.listItemSelf}>
                        <ListItemText
                            className={classes.listItemText}
                            primary={messages[1].name}
                            secondary={messages[5].message}
                        ></ListItemText>
                    </ListItem>
                </List>

                {/* <Grid container className={styles.sendMessageContainer}>
                    <Grid item xs={1} align="left" className={styles.gridClip}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="icon-button-file"
                            type="file"
                        />

                        <label htmlFor="icon-button-file">
                            <IconButton aria-label="upload picture" component="span">
                                <AttachFileIcon />
                            </IconButton>
                        </label>
                    </Grid>

                    <Grid item xs={9}> */}
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
                    {({ submitForm, isSubmitting }) => (
                        <Form className={styles.messageForm}>
                            {/* <div className={styles.inputContainer}>
                                        <Paper component="form" className={classes.paper}> */}
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="icon-button-file"
                                type="file"
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
                                {postState}
                            </IconButton>
                            {/* </Paper>
                                    </div> */}
                        </Form>
                    )}
                </Formik>
                {/* </Grid>
                </Grid> */}
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
    language: state.app.language,
});

export default compose(
    connect(mapStateToProps, { getMessages, getDialogs }),
    withLogoutRedirect,
)(Chat);
