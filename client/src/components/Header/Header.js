import styles from './Header.module.css';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const Header = (props) => {
    const { isAuth } = props;

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
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Header);
