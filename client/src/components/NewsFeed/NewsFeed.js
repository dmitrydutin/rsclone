import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import styles from './NewsFeed.module.css';
import { Avatar, Button, Paper, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';
import { uploadImage } from './helper.js';
import { setPost } from '../../redux/reducers/NewsReducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getLanguage } from '../../languages/index';
import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        paddingTop: 70,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    newPost: {
        margin: '25px auto',
        borderRadius: '10px',
        padding: '15px',
    },
    submitButton: {
        marginLeft: '15px',
        [theme.breakpoints.down('400')]: {
            marginTop: '15px',
        },
    },
}));

function NewsFeed({ language, user, token, setPost }) {
    const classes = useStyles();

    const initialValues = { text: '' };
    const translate = getLanguage(language);

    const [postState, setPostState] = useState(translate['newsfeed.post']);
    const [state, setState] = useState({ file: '', previewUrl: '' });

    const PostSchema = Yup.object().shape({
        text: Yup.string().required(translate['newsfeed.required']),
    });

    let { previewUrl } = state;
    let preview = null;

    if (previewUrl) {
        preview = (
            <>
                <img src={previewUrl} alt={'Preview'} />
                <button className={styles.closeButton} onClick={(e) => handleClose(e)}>
                    <CloseIcon />
                </button>
            </>
        );
    } else {
        preview = <></>;
    }

    const handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setState({
                file: file,
                previewUrl: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    const handleClose = (e) => {
        setState({
            file: '',
            previewUrl: '',
        });
        preview = <></>;
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setPostState(<CircularProgress style={{ height: '40px', width: '35px' }} />);
        uploadImage(state.file).then(async (res) => {
            await setPost({
                query: {
                    login: user.login,
                    text: values.text,
                    photo: res,
                    user: { login: user.login, avatar: user.avatar },
                },
                token: token,
                setSubmitting,
            });
            values.text = '';
            setPostState(translate['newsfeed.post']);
            setState({ file: '', previewUrl: '' });
        });
    };

    useEffect(() => {
        setPostState(translate['newsfeed.post']);
    }, [translate, setPostState]);

    return (
        <Paper className={classes.newPost}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={PostSchema}
            >
                {({ submitForm, isSubmitting }) => (
                    <form className={styles.form}>
                        <div className={styles.inputContainer}>
                            <Avatar
                                aria-label="recipe"
                                src={user.avatar}
                                alt="Avatar"
                                className={styles.avatar}
                            >
                                {user.name.slice(0, 1)}
                            </Avatar>
                            <Field
                                placeholder={translate['newsfeed.placeholder']}
                                variant="outlined"
                                className={styles.input}
                                multiline={true}
                                name="text"
                                component={TextField}
                            />
                        </div>
                        <div className={styles.imgPreview}>{preview}</div>
                        <div className={styles.inputContainer}>
                            <div className={styles.inputWrapper}>
                                <input
                                    name="file"
                                    type="file"
                                    id="inputFile"
                                    onChange={(e) => handleImageChange(e)}
                                    accept="image/x-png,image/gif,image/jpeg"
                                    className={styles.inputFile}
                                    multiple
                                />
                                <label htmlFor="inputFile">
                                    <IconButton
                                        color="primary"
                                        htmlFor="inputFile"
                                        component="span"
                                        variant="contained"
                                    >
                                        <AttachFileIcon className={classes.inputFileButtonImg} />
                                    </IconButton>
                                </label>
                            </div>
                            <Button
                                color="primary"
                                disabled={isSubmitting}
                                variant="contained"
                                className={classes.submitButton}
                                onClick={submitForm}
                            >
                                {postState}
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </Paper>
    );
}

const mapStateToProps = (state) => ({
    language: state.app.language,
    user: state.auth.user,
    token: state.auth.token,
});

export default compose(connect(mapStateToProps, { setPost }))(NewsFeed);
