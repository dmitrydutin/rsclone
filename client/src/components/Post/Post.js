import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Post.module.css';
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
import user from './assets/images/user.svg';
import SendIcon from '@material-ui/icons/Send';
import loader from './assets/images/loader.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 650,
        margin: 'auto',
        marginTop: 25,
        marginBottom: 25,
        boxShadow: '0px 0px 20px 5px #b9b8b8',
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
        paddingTop: '56.25%', // 16:9
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
        width: 600,
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
}));

export default function Post({ post }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [postState, setPostState] = useState(<SendIcon />);
    const [textState, setTextState] = useState('');
    function _handleTextChange(e) {
        e.preventDefault();
        setTextState(e.target.value);
    }

    function _handleSubmit(e) {
        e.preventDefault();
        setPostState(
            <img src={loader} alt={'Loading...'} style={{ height: '40px', width: '35px' }} />,
        );

        setPostState(<SendIcon />);
        setTextState('');
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {post.avatar ? (
                            <img src={post.avatar} alt={post.avatar} />
                        ) : (
                            <img src={user} alt={'U'} />
                        )}
                    </Avatar>
                }
                title={post.login ? post.login : 'undefined'}
                // subheader={post.date ? post.date : 'undefined'}
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
                <IconButton className={classes.icon} aria-label="like">
                    {post.likes ? post.likes : 0}
                    <FavoriteIcon />
                </IconButton>

                <IconButton aria-label="comment" onClick={handleExpandClick}>
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.commentSection}>
                {post.comment?.map((el) => {
                    return (
                        <CardContent className={classes.content}>
                            <CardHeader
                                className={classes.contentHeader}
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        {<img src={user} alt={'U'} />}
                                    </Avatar>
                                }
                                title={post.comment.username ? post.comment.username : 'undefined'}
                                subheader={post.comment ? post.comment : 'undefined'}
                            />
                            <Typography>{post.comment?.text}</Typography>
                        </CardContent>
                    );
                })}
                <form onSubmit={(e) => _handleSubmit(e)}>
                    <div className={styles.inputContainer}>
                        <Paper component="form" className={classes.paper}>
                            <InputBase
                                className={classes.input}
                                multiline={true}
                                onChange={(e) => _handleTextChange(e)}
                                value={textState}
                            />
                            <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={(e) => _handleSubmit(e)}
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
}
