import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
import Error from './components/Error/Error';

const App = () => {
    return (
        <>
            <CssBaseline />
            <Header />

            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/join" exact component={Join} />
                <Route component={Error} />
            </Switch>
        </>
    );
};

export default App;
