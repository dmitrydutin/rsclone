import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import { getLanguage } from '../../languages/index';
import {
    getUserData,
    getPostsCount,
    getLikesCount,
    getCommentsCount,
} from '../../redux/reducers/ProfileReducer';
import { getPosts } from '../../redux/reducers/NewsReducer';
import { getDateString } from './helper';
import Post from '../Post/Post';

import { LinearProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditDialog from './parts/EditDialog';

const Profile = ({
    language,
    token,
    userId,
    user,
    getUserData,
    posts,
    getPosts,
    getPostsCount,
    getLikesCount,
    getCommentsCount,
    postsCount,
    likesCount,
    commentsCount,
}) => {
    const translate = getLanguage(language);

    useEffect(() => {
        getUserData(token, userId);
        getPosts(token, userId);
        getPostsCount(token, userId);
        getLikesCount(token, userId);
        getCommentsCount(token, userId);
    }, []);

    const [open, setOpen] = useState(false);

    const openEditDialog = () => {
        setOpen(true);
    };

    const closeEditDialog = () => {
        setOpen(false);
    };

    return (
        <main className={styles.main}>
            {user === null ? (
                <LinearProgress />
            ) : (
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Grid
                                container
                                spacing={2}
                                direction="column"
                                className={styles.sticky}
                            >
                                <Grid item>
                                    <Paper elevation={0} className={styles.paper}>
                                        <Avatar
                                            variant="square"
                                            alt="Avatar"
                                            src={user.avatar}
                                            className={styles.avatar}
                                        >
                                            {user.name[0]}
                                        </Avatar>
                                    </Paper>
                                </Grid>

                                <Grid item>
                                    <Paper elevation={0} className={styles.paper}>
                                        <Typography
                                            variant="h5"
                                            component="h1"
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            {translate['profile.about']}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            component="span"
                                            color="textPrimary"
                                            className={styles.about}
                                        >
                                            {user.about || translate['profile.empty']}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <Grid container spacing={2} direction="column">
                                <Grid item>
                                    <Paper elevation={0} className={styles.paper}>
                                        <Grid container justify="space-between">
                                            <Grid item>
                                                <Typography
                                                    variant="h5"
                                                    component="h1"
                                                    color="textPrimary"
                                                >
                                                    {`${user.name} ${user.surname}`}
                                                </Typography>

                                                <Typography
                                                    variant="subtitle1"
                                                    component="span"
                                                    color="textPrimary"
                                                    className={styles.quote}
                                                >
                                                    {translate['profile.quote']}:{' '}
                                                    {user.quote ||
                                                        translate['profile.empty'].toLowerCase()}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    color="inherit"
                                                    onClick={openEditDialog}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <EditDialog
                                                    open={open}
                                                    closeEditDialog={closeEditDialog}
                                                    user={user}
                                                    token={token}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Divider className={styles.infoDivider} />

                                        <Typography
                                            variant="body1"
                                            component="p"
                                            color="textPrimary"
                                            gutterBottom
                                        >
                                            {translate['profile.city']}:{' '}
                                            {user.city || translate['profile.notSpecified']}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            component="p"
                                            color="textPrimary"
                                        >
                                            {translate['profile.dateOfCreation']}:{' '}
                                            {getDateString(user.createdAt, language)}
                                        </Typography>

                                        <Divider className={styles.infoDivider} />

                                        <Grid container justify="space-around">
                                            <Grid item>
                                                <Typography
                                                    variant="h6"
                                                    component="p"
                                                    color="textPrimary"
                                                    align="center"
                                                >
                                                    {postsCount || 0}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    component="p"
                                                    color="textPrimary"
                                                >
                                                    {translate['profile.postsCount']}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="h6"
                                                    component="p"
                                                    color="textPrimary"
                                                    align="center"
                                                >
                                                    {likesCount || 0}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    component="p"
                                                    color="textPrimary"
                                                >
                                                    {translate['profile.likesCount']}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="h6"
                                                    component="p"
                                                    color="textPrimary"
                                                    align="center"
                                                >
                                                    {commentsCount || 0}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    component="p"
                                                    color="textPrimary"
                                                >
                                                    {translate['profile.commentsCount']}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                    <Grid container>
                                        {posts.map((postInfo) => (
                                            <Grid item xs={12} key={postInfo.id}>
                                                <Post post={postInfo} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </main>
    );
};

const mapStateToProps = (state) => ({
    language: state.app.language,
    token: state.auth.token,
    userId: state.auth.user?.id,
    user: state.profile.user,
    posts: state.news.posts,
    postsCount: state.profile.postsCount,
    likesCount: state.profile.likesCount,
    commentsCount: state.profile.commentsCount,
});

export default compose(
    connect(mapStateToProps, {
        getUserData,
        getPosts,
        getPostsCount,
        getLikesCount,
        getCommentsCount,
    }),
    withLogoutRedirect,
)(Profile);
