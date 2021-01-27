import { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/reducers/AppReducer';
import { Switch, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LinearProgress } from '@material-ui/core';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
import Error from './components/Error/Error';
import Newsfeed from './components/Newsfeed/Newsfeed';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './themes/DarkTheme';
import lightTheme from './themes/LightTheme';

const App = (props) => {
    const { token, theme } = props;
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    useEffect(() => {
        props.initializeApp(token);
    }, []);

    return (
        <ThemeProvider theme={currentTheme}>
            <>
                <CssBaseline />
                {props.initialized ? (
                    <>
                        <Header />

                        <Switch>
                            <Route path="/login" exact component={Login} />
                            <Route path="/join" exact component={Join} />
                            <Route path="/feed" exact component={Newsfeed} />
                            <Route component={Error} />
                        </Switch>
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
