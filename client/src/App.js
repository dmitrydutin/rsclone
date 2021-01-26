import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Error from './components/Error/Error';
import Upload from './components/Upload/Upload';
import Chat from './components/Dialogs/Chat/Chat';

const App = () => {
    return (
        <>
            <CssBaseline />
            <Header />

            <Switch>
            <Chat />
                {/* <Route path="/login" exact component={Login} />
                <Route component={Error} /> */}
            </Switch>

            {/* <Upload /> */}
        </>
    );
};

export default App;
