import { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeApp } from './redux/reducers/AppReducer';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LinearProgress } from '@material-ui/core';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
import Error from './components/Error/Error';
import Upload from './components/Upload/Upload';
import Chat from './components/Dialogs/Chat/Chat';

const App = (props) => {
    const { token } = props;

    useEffect(() => {
        props.initializeApp(token);
    }, []);

    return (
        <>
            <CssBaseline />

            {props.initialized ? (
                <>
                    <Header />

                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route path="/join" exact component={Join} />
                        <Route component={Error} />
                    </Switch>
                </>
            ) : (
                    <LinearProgress />
                )}
        </>
    );
};

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    token: state.auth.token,
});

export default connect(mapStateToProps, { initializeApp })(App);
