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
    Collapse,
} from '@material-ui/core';
import { red, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import user from '../../images/user.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 450,
        margin: 'auto',
        marginTop: 25,
        marginBottom: 25,
        boxShadow: '0px 0px 50px 5px #000000',
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
}));

export default function Post({ post }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {<img src={user} alt={'U'} />}
                    </Avatar>
                }
                title={post.username ? post.username : 'undefined'}
                subheader={post.date ? post.date : 'undefined'}
            />

            {post.img ? (
                <CardMedia
                    className={classes.media}
                    image={post.img}
                    title="Post image"
                    src={post.img}
                />
            ) : null}
            <CardContent className={classes.content}>
                <Typography color="textSecondary">
                    {post.text ? post.text : null}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.content}>
                <IconButton className={classes.icon} aria-label="like">
                    {post.likes ? post.likes : 0}
                    <FavoriteIcon />
                </IconButton>

                <IconButton aria-label="comment" onClick={handleExpandClick}>
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
                className={classes.commentSection}
            >
                <CardContent className={classes.content}>
                    <CardHeader
                        className={classes.contentHeader}
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                            >
                                {<img src={user} alt={'U'} />}
                            </Avatar>
                        }
                        title={post.username ? post.username : 'undefined'}
                        subheader={post.date ? post.date : 'undefined'}
                    />
                    <Typography>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                    </Typography>
                </CardContent>
                <CardContent className={classes.content}>
                    <CardHeader
                        className={classes.contentHeader}
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                            >
                                {<img src={user} alt={'U'} />}
                            </Avatar>
                        }
                        title={post.username ? post.username : 'undefined'}
                        subheader={post.date ? post.date : 'undefined'}
                    />
                    <Typography>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                    </Typography>
                </CardContent>
                <CardContent className={classes.content}>
                    <CardHeader
                        className={classes.contentHeader}
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                            >
                                {<img src={user} alt={'U'} />}
                            </Avatar>
                        }
                        title={post.username ? post.username : 'undefined'}
                        subheader={post.date ? post.date : 'undefined'}
                    />
                    <Typography>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don’t open.)
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
