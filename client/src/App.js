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
import Footer from './components/Footer/Footer';

const App = (props) => {
    const { token, initialized, initializeApp } = props;

    useEffect(() => {
        initializeApp(token);
    }, []);

    return (
        <>
            <CssBaseline />

            {initialized ? (
                <>
                    <Header />

                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route path="/join" exact component={Join} />
                        <Route component={Error} />
                    </Switch>

                    <Footer />
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
