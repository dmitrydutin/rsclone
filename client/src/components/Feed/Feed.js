import React from 'react';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import Post from '../Post/Post';
import NewsFeed from '../NewsFeed/NewsFeed';

function Newsfeed({ children }) {
    return (
        <Container>
            {/* <NewsFeed>{children}</NewsFeed> */}
            <NewsFeed>
                {children.map((el) => (
                    <Post post={el} />
                ))}
            </NewsFeed>
        </Container>
    );
}

const mapStateToProps = function (state) {
    return {
        //children: state.news.posts.map((el) => <Post post={el} />),
        children: state.news.posts,
    };
};

export default compose(connect(mapStateToProps), withLogoutRedirect)(Newsfeed);
