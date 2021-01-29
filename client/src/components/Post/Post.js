import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './Post.module.css';
import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
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
    Paper,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import userAvatar from './assets/images/user.svg';
import SendIcon from '@material-ui/icons/Send';
import { setComment, getComments, setLike } from '../../redux/reducers/NewsReducer';
import * as Yup from 'yup';

const CommentSchema = Yup.object().shape({
    text: Yup.string().min(1, 'Too Short!'),
});

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
        borderBottom: `4px solid`,
        borderColor: `${theme.palette.background.secondary} !important`,
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
        border: '4px solid',
        borderRadius: '5px',
        borderColor: `${theme.palette.background.secondary} !important`,
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
    text: {
        fontSize: '1.5rem',
    },
}));

const Post = (props) => {
    const { posts, post, user, token, setComment, getComments, setLike } = props;

    const classes = useStyles();

    const initialValues = { text: '' };
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(() => {
        console.log(post, user);
        if (
            post.likes.find((el) => {
                return el.postId === post.id && el.userId === user.id;
            })
        ) {
            return true;
        }
        return false;
    });
    const [postState, setPostState] = useState(<SendIcon />);

    const handleExpandClick = () => {
        getComments({ posts, postId: post.id, token });
        setExpanded(!expanded);
    };

    const handleLikeClick = async () => {
        await setLike({ posts, postId: post.id, userId: user.id, token });
        setLiked(() => {
            if (
                post.likes.find((el) => {
                    return el.postId === post.id && el.userId === user.id;
                })
            ) {
                return true;
            }
            return false;
        });
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setPostState(<CircularProgress style={{ height: '40px', width: '35px' }} />);
        await setComment({
            posts,
            post,
            token,
            query: {
                postId: post.id,
                text: values.text,
                user: { login: user.login, avatar: user.avatar },
            },
            setSubmitting,
        });
        values.text = '';
        setPostState(<SendIcon />);
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
                    <Typography className={classes.text}>{post.likes.length} </Typography>
                </IconButton>

                <IconButton aria-label="comment" onClick={handleExpandClick}>
                    <CommentIcon />
                    <Typography className={classes.text}>{post.commentsCount}</Typography>
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.commentSection}>
                {post.comments?.map((comment) => {
                    return (
                        <CardContent className={classes.content}>
                            <CardHeader
                                className={classes.contentHeader}
                                avatar={
                                    <Avatar aria-label="recipe">
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

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={CommentSchema}
                >
                    {({ submitForm, isSubmitting }) => (
                        <form>
                            <div className={styles.inputContainer}>
                                <Paper component="form" className={classes.paper}>
                                    <Field
                                        className={classes.input}
                                        multiline={true}
                                        component={TextField}
                                        name="text"
                                        fullWidth={true}
                                    />
                                    <IconButton
                                        type="submit"
                                        className={classes.iconButton}
                                        aria-label="search"
                                        onClick={submitForm}
                                        disabled={isSubmitting}
                                    >
                                        {postState}
                                    </IconButton>
                                </Paper>
                            </div>
                        </form>
                    )}
                </Formik>
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
    connect(mapStateToProps, { setComment, getComments, setLike }),
    //withLoginRedirect
)(Post);
