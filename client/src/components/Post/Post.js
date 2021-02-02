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
    Divider,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import SendIcon from '@material-ui/icons/Send';
import { setComment, getComments, setLike } from '../../redux/reducers/NewsReducer';
import * as Yup from 'yup';
import { getDateString } from './helper';
import { getLanguage } from '../../languages/index';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
        padding: '0px 20px 20px',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
    },
    header: {
        fontSize: 17,
        fontWeight: 450,
    },
    contentHeader: {
        padding: `16px 0px 5px`,
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
        width: '100%',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',
    },
    avatar: {
        backgroundColor: `#5181b8!important`,
    },
    avatarComment: {
        backgroundColor: `#5181b8!important`,
        [theme.breakpoints.down('600')]: {
            display: 'none',
        },
    },
    input: {
        marginLeft: 10,
        [theme.breakpoints.down('600')]: {
            width: '100%',
            marginLeft: 0,
        },
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
        [theme.breakpoints.down('600')]: {
            display: 'none',
        },
    },
    commentUpper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    commentDate: {
        fontSize: 14,
        [theme.breakpoints.down('400')]: {
            display: 'none',
        },
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

    const translate = getLanguage(language);
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

    const CommentSchema = Yup.object().shape({
        text: Yup.string().required(translate['post.required']),
    });

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
        <Paper>
            <Card className={classes.root}>
                <CardHeader
                    classes={{
                        title: classes.header,
                    }}
                    className={classes.contentHeader}
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            src={post.user.avatar}
                            alt="Avatar"
                            className={classes.avatar}
                        >
                            {user.name.slice(0, 1)}
                        </Avatar>
                    }
                    title={`${post.user.surname} ${post.user.name}`}
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
                        className={liked ? classes.liked : ''}
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
                <Divider />
                <Collapse
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                    className={classes.commentSection}
                >
                    {post.comments?.map((comment) => {
                        return (
                            <>
                                <CardContent className={classes.content} key={comment.id}>
                                    <CardHeader
                                        classes={{
                                            title: classes.header,
                                        }}
                                        className={classes.commentHeader}
                                        avatar={
                                            <Avatar
                                                aria-label="recipe"
                                                src={comment.user.avatar}
                                                alt="Avatar"
                                                className={classes.avatarComment}
                                            >
                                                {user.name.slice(0, 1)}
                                            </Avatar>
                                        }
                                    />

                                    <CardContent className={classes.comment}>
                                        <div className={classes.commentUpper}>
                                            <Typography className={classes.header}>
                                                {`${comment.user.surname} ${comment.user.name}`}
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
                                <Divider />
                            </>
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
                                    <Paper className={classes.paper}>
                                        <Avatar
                                            aria-label="recipe"
                                            src={user.avatar}
                                            alt="Avatar"
                                            className={classes.avatarComment}
                                        >
                                            {user.name.slice(0, 1)}
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
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
    posts: state.news.posts,
    language: state.app.language,
});

export default compose(connect(mapStateToProps, { setComment, getComments, setLike }))(Post);
