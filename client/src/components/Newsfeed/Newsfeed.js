import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Newsfeed.module.css';
import { Container, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import Api from '../../api/api.js';
import Post from '../Post/Post';
import urlAdd from '../../images/add.svg';
import CloseIcon from '@material-ui/icons/Close';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { getToday } from '../../helper';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

function Newsfeed({ children }) {
    let socket = io();
    const dispatch = useDispatch();

    useEffect(() => {
        socket = io();
        dispatch({ type: 'INIT_POSTS' });
        console.log('POSTS INITED');
        socket.on('get-message', function (data) {
            dispatch({ type: 'UPDATE_POSTS', query: data });
        });
        //console.log(socket);

        // io.on('connection', function (socket) {
        //     console.log('made socket connection');
        //     socket.on('get-message', function (data) {
        //         dispatch({ type: 'UPDATE_POSTS', query: data });
        //         console.log(data);
        //     });
        // });
    }, []);
    const classes = useStyles();
    const [textState, setTextState] = useState('');
    const [state, setState] = useState({ file: '', imagePreviewUrl: '' });
    let { imagePreviewUrl } = state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (
            <div>
                <img src={imagePreviewUrl} alt={"Image Preview"}/>
                <button
                    className={styles.closeButton}
                    onClick={(e) => _handleClose(e)}
                >
                    <CloseIcon />
                </button>
            </div>
        );
    } else {
        $imagePreview = <div></div>;
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
        $imagePreview = <div></div>;
    }

    function _handleSubmit(e) {
        e.preventDefault();

        socket.emit('send-message', {
            id: 0,
            username: 'asbarn',
            text: `${textState}`,
            img: state.imagePreviewUrl,
            likes: 0,
            dislikes: 0,
            date: getToday(),
        });
        setTextState('');
        setState({ file: '', imagePreviewUrl: '' });
    }

    return (
        <Container className={classes.root}>
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
                            <label
                                for="inputFile"
                                className={styles.inputFileButton}
                            >
                                <img
                                    src={urlAdd}
                                    alt="Upload img"
                                    className={styles.inputFileButtonImg}
                                />
                            </label>
                        </div>
                    </div>
                    <div className={styles.imgPreview}>{$imagePreview}</div>
                    <button
                        className={styles.submitButton}
                        type="submit"
                        onClick={(e) => _handleSubmit(e)}
                    >
                        Post
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
    };
};

export default connect(mapStateToProps)(Newsfeed);
