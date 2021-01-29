import React, { useState, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Newsfeed.module.css';
import { Container, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import loader from './assets/images/loader.gif';
import CloseIcon from '@material-ui/icons/Close';
import { uploadImage } from './helper.js';
import { getPosts, setPost } from '../../redux/reducers/NewsReducer';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import russian from '../../languages/russian';
import english from '../../languages/english';

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

    const currentLanguage = language === 'ENGLISH' ? english : russian;
    const classes = useStyles();
    const [postState, setPostState] = useState(<b>Post</b>);
    const [textState, setTextState] = useState('');
    const [state, setState] = useState({ file: '', imagePreviewUrl: '' });

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

    function handleTextChange(e) {
        setTextState(e.target.value);
    }

    function handleImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        };

        reader.readAsDataURL(file);
    }

    function handleClose(e) {
        setState({
            file: '',
            imagePreviewUrl: '',
        });
        imagePreviewDiv = <div></div>;
    }

    function handleSubmit(e) {
        e.preventDefault();
        setPostState(<CircularProgress style={{ height: '40px', width: '35px' }} />);
        uploadImage(state.file).then((res) => {
            setPost({
                query: {
                    login: user.login,
                    text: `${textState}`,
                    photo: res,
                    user: { login: user.login, avatar: user.avatar },
                },
                token: token,
            });
            setPostState(<b>Post</b>);
            setTextState('');
            setState({ file: '', imagePreviewUrl: '' });
        });
    }

    return (
        <Container className={classes.root}>
            <div className={styles.newPost}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.inputContainer}>
                        <Input
                            placeholder="What's new?"
                            className={styles.input}
                            multiline={true}
                            onChange={(e) => handleTextChange(e)}
                            value={textState}
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
                            <label for="inputFile" className={styles.inputFileButton}>
                                <GetAppIcon className={styles.inputFileButtonImg} />
                            </label>
                        </div>
                    </div>
                    <div className={styles.imgPreview}>{imagePreviewDiv}</div>
                    <button
                        className={styles.submitButton}
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        {postState}
                    </button>
                </form>
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

export default connect(mapStateToProps,{getPosts,setPost})(Newsfeed);
//export default compose(connect(mapStateToProps,{getPosts,setPost}),withLoginRedirect)(Newsfeed);
