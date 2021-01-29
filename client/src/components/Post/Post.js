import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './Post.module.css';
import { Formik } from 'formik';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Collapse,
    InputBase,
    Paper,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import userAvatar from './assets/images/user.svg';
import { withLoginRedirect } from '../../hoc/withAuthRedirect';
import SendIcon from '@material-ui/icons/Send';
import loader from './assets/images/loader.gif';

import { setComment, getComments } from '../../redux/reducers/NewsReducer';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 650,
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
        boxShadow: '0px 0px 10px 3px #b9b8b8',
        [theme.breakpoints.down('700')]: {
            width: 350,
        },
    },
    content: {
        borderBottom: `2px solid grey`,
    },
    contentHeader: {
        padding: `10px 0px`,
    },
    media: {
        height: 0,
        backgroundSize: '100% 100%',
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[250],
    },
    icon: {
        font: 50,
    },
    commentSection: {
        padding: '15px 0',
    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 700,
        boxShadow: 'none',
    },
    input: {
        border: '2px solid rgb(180, 178, 178)',
        borderRadius: '5px',
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    liked: {
        font: 50,
        color: '#FF0000',
    },
}));

const Post = (props) => {
    const { posts, post, user, token, setComment, getComments } = props;

    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [postState, setPostState] = useState(<SendIcon />);
    const [textState, setTextState] = useState('');

    const handleExpandClick = () => {
        getComments({ posts, postId: post.id, token });
        setExpanded(!expanded);
    };

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleTextChange = (e) => {
        e.preventDefault();
        setTextState(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPostState(
            <img src={loader} alt={'Loading...'} style={{ height: '40px', width: '35px' }} />,
        );
        setComment({
            posts,
            post,
            token,
            query: {
                postId: post.id,
                text: textState,
                user: { login: user.login, avatar: user.avatar },
            },
        });
        setPostState(<SendIcon />);
        setTextState('');
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {post.user?.avatar ? (
                            <img src={post.user.avatar} alt="Avatar" />
                        ) : (
                            <img src={userAvatar} alt="Avatar" />
                        )}
                    </Avatar>
                }
                title={post.user.login}
            />

            {post.photo ? (
                <CardMedia
                    className={classes.media}
                    image={post.photo}
                    title="Post image"
                    src={post.photo}
                />
            ) : null}

            {post.text ? (
                <CardContent className={classes.content}>
                    <Typography color="textSecondary">{post.text}</Typography>
                </CardContent>
            ) : null}

            <CardActions disableSpacing className={classes.content}>
                <IconButton
                    className={liked ? classes.liked : classes.icon}
                    aria-label="like"
                    onClick={handleLikeClick}
                >
                    <FavoriteIcon />
                    {post.likesCount}
                </IconButton>

                <IconButton aria-label="comment" onClick={handleExpandClick}>
                    <CommentIcon />
                    <Typography>{post.commentsCount}</Typography>
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.commentSection}>
                {post.comments?.map((comment) => {
                    return (
                        <CardContent className={classes.content}>
                            <CardHeader
                                className={classes.contentHeader}
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {post.user.avatar ? (
                                            <img src={comment.user.avatar} alt="Avatar" />
                                        ) : (
                                            <img src={userAvatar} alt="Avatar" />
                                        )}
                                    </Avatar>
                                }
                                title={comment.user.login ? comment.user.login : 'undefined'}
                            />
                            <Typography>{comment.text}</Typography>
                        </CardContent>
                    );
                })}

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.inputContainer}>
                        <Paper component="form" className={classes.paper}>
                            <InputBase
                                className={classes.input}
                                multiline={true}
                                onChange={(e) => handleTextChange(e)}
                                value={textState}
                            />
                            <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={(e) => handleSubmit(e)}
                                disabled={textState ? false : true}
                            >
                                {postState}
                            </IconButton>
                        </Paper>
                    </div>
                </form>
            </Collapse>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
    posts: state.news.posts,
});

export default compose(
    connect(mapStateToProps, { setComment, getComments }),
    //withLoginRedirect
)(Post);
