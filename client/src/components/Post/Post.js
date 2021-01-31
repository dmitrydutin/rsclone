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
    Grid,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import userAvatar from './assets/images/user.svg';
import SendIcon from '@material-ui/icons/Send';
import { setComment, getComments, setLike } from '../../redux/reducers/NewsReducer';
import * as Yup from 'yup';
import russian from '../../languages/russian';
import english from '../../languages/english';
import { getDateString } from './helper';

const CommentSchema = Yup.object().shape({
    text: Yup.string().min(1, 'Too Short!'),
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: 650,
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
        padding: '0px 20px 20px',
        [theme.breakpoints.down('700')]: {
            width: 350,
        },
        [theme.breakpoints.down('400')]: {
            width: 200,
        },
        backgroundColor: `${theme.palette.post.default} !important`,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        borderBottom: `4px solid`,
        borderColor: `${theme.palette.background.default} !important`,
    },
    header: {
        fontSize: 17,
        fontWeight: 450,
    },
    contentHeader: {
        padding: `16px 16px 5px`,
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
    commentSection: {
        padding: '0',
    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 700,
        boxShadow: 'none',
        backgroundColor: `${theme.palette.post.default} !important`,
    },
    avatar: {
        backgroundColor: `#5181b8!important`,
    },
    input: {
        marginLeft: 10,
    },
    iconButton: {
        padding: 10,
    },
    liked: {
        fontSize: '1.5rem',
        color: '#FF0000',
    },
    text: {
        color: `${theme.palette.newsfeed.contrastText} !important`,
        fontSize: '1rem',
    },
    comment: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid',
        borderRadius: '5px',
        borderColor: `${theme.palette.background.default} !important`,
        background: `${theme.palette.background.default} !important`,
    },
    commentHeader: {
        padding: `10px 0px`,
    },
    commentUpper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    commentDate: {
        fontSize: 14,
    },
    icon: {
        marginLeft: 7,
        color: `${theme.palette.newsfeed.contrastText} !important`,
        fontSize: '1.5rem',
    },
    form: {
        marginTop: 20,
        backgroundColor: `${theme.palette.post.default} !important`,
    },
}));

const Post = (props) => {
    const { posts, post, user, token, language, setComment, getComments, setLike } = props;

    const classes = useStyles();

    const translate = language === 'english' ? english : russian;
    const initialValues = { text: '' };
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(() => {
        if (!post.likes.length) {
            return false;
        }
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
                classes={{
                    title: classes.header,
                }}
                className={classes.contentHeader}
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
                subheader={getDateString(post.createdAt, language)}
            />

            {post.text ? (
                <CardContent className={classes.contentHeader}>
                    <Typography className={classes.text}>{post.text}</Typography>
                </CardContent>
            ) : null}

            {post.photo ? (
                <CardMedia
                    className={classes.media}
                    image={post.photo}
                    title="Post image"
                    src={post.photo}
                />
            ) : null}

            <CardActions disableSpacing className={classes.content}>
                <IconButton
                    className={liked ? classes.liked : {}}
                    aria-label="like"
                    onClick={handleLikeClick}
                >
                    {liked ? <FavoriteIcon /> : <FavoriteIconBorder />}

                    <Typography className={classes.icon}>{post.likes.length} </Typography>
                </IconButton>

                <IconButton aria-label="comment" onClick={handleExpandClick}>
                    <CommentIcon />
                    <Typography className={classes.icon}>{post.commentsCount}</Typography>
                </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.commentSection}>
                {post.comments?.map((comment) => {
                    return (
                        <CardContent className={classes.content}>
                            <CardHeader
                                classes={{
                                    title: classes.header,
                                }}
                                className={classes.commentHeader}
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {comment.user.avatar ? (
                                            <img src={comment.user.avatar} alt="Avatar" />
                                        ) : (
                                            <img src={userAvatar} alt="Avatar" />
                                        )}
                                    </Avatar>
                                }
                                //title={comment.user.login ? comment.user.login : 'undefined'}
                                //subheader={<Typography>{comment.text}</Typography>}
                            />
                            <CardContent className={classes.comment}>
                                <div className={classes.commentUpper}>
                                    <Typography className={classes.header}>
                                        {comment.user.login}
                                    </Typography>
                                    <Typography className={classes.commentDate}>
                                        {getDateString(comment.createdAt, language)}
                                    </Typography>
                                </div>
                                <Typography className={classes.commentText}>
                                    {comment.text}
                                </Typography>
                            </CardContent>
                        </CardContent>
                    );
                })}

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={CommentSchema}
                >
                    {({ submitForm, isSubmitting }) => (
                        <form className={classes.form}>
                            <div className={styles.inputContainer}>
                                <Paper component="form" className={classes.paper}>
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="Avatar" />
                                        ) : (
                                            <img src={userAvatar} alt="Avatar" />
                                        )}
                                    </Avatar>
                                    <Field
                                        className={classes.input}
                                        variant="outlined"
                                        multiline={true}
                                        component={TextField}
                                        name="text"
                                        fullWidth={true}
                                        placeholder={translate['post.placeholder']}
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
    language: state.app.language,
});

export default compose(
    connect(mapStateToProps, { setComment, getComments, setLike }),
    //withLoginRedirect
)(Post);
