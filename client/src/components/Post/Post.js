import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 450,
        margin: 'auto',
        marginTop: 25,
        boxShadow: '0px 0px 50px 5px #000000',
    },
    media: {
        height: 0,
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
}));

export default function Post({ post }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {post.username[0].toUpperCase()}
                    </Avatar>
                }
                title={post.username}
                subheader={post.date}
            />

            {post.img ? (
                <CardMedia
                    className={classes.media}
                    image={post.img}
                    title="Post image"
                    src={post.img}
                />
            ) : null}
            <CardContent>
                <Typography color="textSecondary">
                    {post.text ? post.text : null}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton className={classes.icon} aria-label="like">
                    <FavoriteIcon />
                </IconButton>

                <IconButton aria-label="comment">
                    <CommentIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
