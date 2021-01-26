import styles from './Header.module.css';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const Header = (props) => {
    const { isAuth } = props;

    return (
        <AppBar>
            <Toolbar className={styles.container}>
                <Link component={RouterLink} to="/" color="inherit" underline="none">
                    <Typography variant="h6" component="h1">
                        Facebook
                    </Typography>
                </Link>

                {isAuth ? (
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                ) : (
                    <div>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>

                        <Button color="inherit" component={RouterLink} to="/join">
                            Join
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Header);
