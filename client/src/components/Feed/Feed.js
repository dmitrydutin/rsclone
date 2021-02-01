import React from 'react';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import NewsFeed from '../NewsFeed/NewsFeed';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        padding: '30px 0',
    },
}));

function Feed({ posts }) {
    const classes = useStyles();

    return (
        <main className={classes.main}>
            <Container maxWidth="md">
                <NewsFeed />

                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </Container>
        </main>
    );
}

const mapStateToProps = (state) => ({
    posts: state.news.posts,
});

export default compose(connect(mapStateToProps), withLogoutRedirect)(Feed);
