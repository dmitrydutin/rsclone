import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import { makeStyles } from '@material-ui/core/styles';
import styles from './NewsFeed.module.css';
import { Container, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import CloseIcon from '@material-ui/icons/Close';
import { uploadImage } from './helper.js';
import { getPosts, setPost } from '../../redux/reducers/NewsReducer';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import russian from '../../languages/russian';
import english from '../../languages/english';
import { Formik, Field } from 'formik';
import userAvatar from './assets/images/user.svg';
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
}));

function Newsfeed({ children, language, user, token, getPosts, setPost }) {
    useEffect(() => {
        getPosts(token);
    }, []);

    const translate = language === 'english' ? english : russian;
    const classes = useStyles();
    const [postState, setPostState] = useState(translate['Newsfeed.post']);
    const [state, setState] = useState({ file: '', imagePreviewUrl: '' });
    const initialValues = { text: '' };
    const PostSchema = Yup.object().shape({
        text: Yup.string().required(translate['Newsfeed.required']),
    });

    let { imagePreviewUrl } = state;
    let imagePreviewDiv = null;

    if (imagePreviewUrl) {
        imagePreviewDiv = (
            <div>
                <img src={imagePreviewUrl} alt={'Image Preview'} />
                <button className={styles.closeButton} onClick={(e) => handleClose(e)}>
                    <CloseIcon />
                </button>
            </div>
        );
    } else {
        imagePreviewDiv = <div></div>;
    }

    const handleImageChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    const handleClose = (e) => {
        setState({
            file: '',
            imagePreviewUrl: '',
        });
        imagePreviewDiv = <div></div>;
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
            setPostState(translate['Newsfeed.post']);
            setState({ file: '', imagePreviewUrl: '' });
        });
    };

    useEffect(() => {
        setPostState(translate['Newsfeed.post']);
    }, [language, setPostState]);

    return (
        <Container className={classes.root}>
            <div className={styles.newPost}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={PostSchema}
                >
                    {({ submitForm, isSubmitting }) => (
                        <form className={styles.form}>
                            <div className={styles.inputContainer}>
                                <Avatar aria-label="recipe" className={styles.avatar}>
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="Avatar" />
                                    ) : (
                                        <img src={userAvatar} alt="Avatar" />
                                    )}
                                </Avatar>
                                <Field
                                    placeholder={translate['Newsfeed.placeholder']}
                                    className={styles.input}
                                    multiline={true}
                                    name="text"
                                    component={TextField}
                                />
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
                                    <label htmlFor="inputFile" className={styles.inputFileButton}>
                                        <GetAppIcon className={styles.inputFileButtonImg} />
                                    </label>
                                </div>
                            </div>
                            <div className={styles.imgPreview}>{imagePreviewDiv}</div>
                            <button
                                disabled={isSubmitting}
                                className={styles.submitButton}
                                type="submit"
                                onClick={submitForm}
                            >
                                {postState}
                            </button>
                        </form>
                    )}
                </Formik>
            </div>

            {children}
        </Container>
    );
}

const mapStateToProps = function (state) {
    return {
        children: state.news.posts.map((el) => <Post post={el} />),
        language: state.app.language,
        user: state.auth.user,
        token: state.auth.token,
    };
};

export default compose(
    connect(mapStateToProps, { getPosts, setPost }),
    withLogoutRedirect,
)(Newsfeed);
