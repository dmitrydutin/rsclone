import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { initializeApp } from './redux/reducers/AppReducer';
import { getTheme } from './themes/index';

import CssBaseline from '@material-ui/core/CssBaseline';
import { LinearProgress } from '@material-ui/core';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
import NewsFeed from './components/NewsFeed/NewsFeed';
import Feed from './components/Feed/Feed';
import Error from './components/Error/Error';
import Chat from './components/Dialogs/Chat/Chat';
import Footer from './components/Footer/Footer';

const App = ({ token, theme, initialized, initializeApp }) => {
    const currentTheme = getTheme(theme);

    useEffect(() => {
        initializeApp(token);
    }, []);

    return (
        <ThemeProvider theme={createMuiTheme(currentTheme)}>
            <>
                <CssBaseline />
                {initialized ? (
                    <>
                        <Header />

                        <Switch>
                            <Redirect exact from="/" to="/feed" />
                            <Route path="/login" exact component={Login} />
                            <Route path="/join" exact component={Join} />
                            <Route path="/messenger" exact component={Chat} />
                            <Route path="/feed" exact component={Feed} />
                            <Route component={Error} />
                        </Switch>

                        <Footer />
                    </>
                ) : (
                    <LinearProgress />
                )}
            </>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    token: state.auth.token,
    theme: state.app.theme,
});

export default connect(mapStateToProps, { initializeApp })(App);
