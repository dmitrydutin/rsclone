import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Error from './components/Error/Error';
import Newsfeed from './components/Newsfeed/Newsfeed';
import Post from './components/Post/Post';

const App = () => {
    return (
        <>
            <CssBaseline />
            <Header />

            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/feed" component={Newsfeed} />
                <Route component={Error} />
            </Switch>
        </>
    );
};

export default App;
