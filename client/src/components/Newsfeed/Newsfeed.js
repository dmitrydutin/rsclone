import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Newsfeed.module.css';
import { Container, Input } from '@material-ui/core';
import { connect, useSelector, useDispatch } from 'react-redux';
import Post from '../Post/Post';
import urlAdd from './assets/images/add.svg';
import loader from './assets/images/loader.gif';
import CloseIcon from '@material-ui/icons/Close';
import { getToday, uploadImage } from './helper.js';

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function Newsfeed({ children, language }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'INIT_POSTS' });
        console.log('POSTS INITED');
    }, []);
    const classes = useStyles();
    const [postState, setPostState] = useState(<b>{language.post}</b>);
    const [textState, setTextState] = useState('');
    const [state, setState] = useState({ file: '', imagePreviewUrl: '' });
    let { imagePreviewUrl } = state;
    let imagePreviewDiv = null;
    if (imagePreviewUrl) {
        imagePreviewDiv = (
            <div>
                <img src={imagePreviewUrl} alt={'Image Preview'} />
                <button className={styles.closeButton} onClick={(e) => _handleClose(e)}>
                    <CloseIcon />
                </button>
            </div>
        );
    } else {
        imagePreviewDiv = <div></div>;
    }

    function _handleTextChange(e) {
        e.preventDefault();
        setTextState(e.target.value);
    }

    function _handleImageChange(e) {
        e.preventDefault();

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

    function _handleClose(e) {
        e.preventDefault();
        setState({
            file: '',
            imagePreviewUrl: '',
        });
        imagePreviewDiv = <div></div>;
    }

    function _handleSubmit(e) {
        e.preventDefault();
        setPostState(
            <img src={loader} alt={'Loading...'} style={{ height: '40px', width: '35px' }} />,
        );
        uploadImage(state.file).then((res) => {
            console.log('res', res);
            dispatch({
                type: 'UPDATE_POSTS',
                query: {
                    id: 0,
                    username: 'asbarn',
                    text: `${textState}`,
                    photo: res,
                    likes: 0,
                    dislikes: 0,
                    date: getToday(),
                },
            });

            setPostState(<b>{language.post}</b>);
            setTextState('');
            setState({ file: '', imagePreviewUrl: '' });
        });
    }

    return (
        <Container className={classes.root} color="primary">
            <div className={styles.newPost}>
                <form onSubmit={(e) => _handleSubmit(e)}>
                    <div className={styles.inputContainer}>
                        <Input
                            placeholder="What's new?"
                            className={styles.input}
                            multiline={true}
                            onChange={(e) => _handleTextChange(e)}
                            value={textState}
                        />
                        <div className={styles.inputWrapper}>
                            <input
                                name="file"
                                type="file"
                                id="inputFile"
                                onChange={(e) => _handleImageChange(e)}
                                accept="image/x-png,image/gif,image/jpeg"
                                className={styles.inputFile}
                                multiple
                            />
                            <label for="inputFile" className={styles.inputFileButton}>
                                <img
                                    src={urlAdd}
                                    alt="Upload img"
                                    className={styles.inputFileButtonImg}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.imgPreview}>{imagePreviewDiv}</div>
                    <button
                        className={styles.submitButton}
                        type="submit"
                        onClick={(e) => _handleSubmit(e)}
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
    console.log(state);
    return {
        children: state.news.arrPost.map((el) => <Post post={el} />),
        language: state.lang.language,
    };
};

export default connect(mapStateToProps)(Newsfeed);
