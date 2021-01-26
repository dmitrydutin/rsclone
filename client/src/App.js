import { Switch, Route } from 'react-router-dom';


import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
import Error from './components/Error/Error';

import Newsfeed from './components/Newsfeed/Newsfeed';
import { ThemeProvider } from '@material-ui/core/styles';


const App = () => {
    const currentTheme = useSelector((state) => state.theme.theme);


    return (
        <ThemeProvider theme={currentTheme}>
            <>
                <CssBaseline />
                <Header />

                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/feed" component={Newsfeed} />
                    <Route component={Error} />
                </Switch>
            </>
        </ThemeProvider>            
        </>

    );
};

export default App;
