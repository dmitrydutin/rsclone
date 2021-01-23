import styles from './Header.module.css';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { FormControlLabel, Switch as SwitchComponent } from '@material-ui/core';
import NightsIcon from '@material-ui/icons/NightsStay';
import SunIcon from '@material-ui/icons/Brightness5';
import sunImg from './assets/images/sun.png';
import moonImg from './assets/images/moon.png';

const Header = (props) => {
    const { isAuth } = props;

    const dispatch = useDispatch();
    const toggleChecked = () => {
        dispatch({ type: 'CHANGE_THEME' });
    };
    const currentThemeCheck = useSelector((state) => state.theme.light);

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>
                        <Link component={RouterLink} to="/" color="inherit" underline="none">
                            Facebook
                        </Link>
                    </Typography>

                    {isAuth ? (
                        <div>You are logged in</div>
                    ) : (
                        <>
                            <Button color="inherit" component={RouterLink} to="/login">
                                Login
                            </Button>

                            <Button color="inherit" component={RouterLink} to="/join">
                                Join
                            </Button>
                        </>
                    )}
                    <FormControlLabel
                        control={
                            <SwitchComponent checked={currentThemeCheck} onChange={toggleChecked} />
                        }
                        label={
                            <div
                                className={currentThemeCheck ? styles.iconContainer : styles.night}
                            >
                                <NightsIcon className={styles.iconMoon}  />
                                <SunIcon className={styles.iconSun}  />
                            </div>
                        }
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Header);
