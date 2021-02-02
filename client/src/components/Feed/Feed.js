import React, { useEffect } from 'react';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import NewsFeed from '../NewsFeed/NewsFeed';
import { getPosts } from '../../redux/reducers/NewsReducer';

function Feed({ posts, token, getPosts }) {
    useEffect(() => {
        getPosts(token);
    }, []);

    return (
        <main>
            <Container maxWidth="sm">
                <NewsFeed />

                {posts.map((postInfo) => (
                    <Post key={postInfo.id} post={postInfo} />
                ))}
            </Container>
        </main>
    );
}

const mapStateToProps = (state) => ({
    posts: state.news.posts,
    token: state.auth.token,
});

export default compose(connect(mapStateToProps, { getPosts }), withLogoutRedirect)(Feed);
