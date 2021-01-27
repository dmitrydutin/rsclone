import styles from './Footer.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SchoolLogoIcon from './assets/images/rs_school_js.svg';

const useStyles = makeStyles({
    listItem: {
        width: 'auto',
        borderRadius: '0.29rem',
        '&:hover': {
            color: '#3c44b1',
            background: 'rgba(60, 68, 177, 0.05)',
        },
        '&.Mui-selected': {
            color: '#3c44b1',
            background: '#DADBF0',
        },
        '& .MuiTouchRipple-root': {
            opacity: 0.5,
        },
    },
});

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.inner}>
                    <Typography variant="body2" color="textSecondary">
                        © 2021 Facebook
                    </Typography>

                    <List component="div" className={styles.list} dense={true}>
                        <ListItem
                            button
                            component="a"
                            href="https://github.com/dmitrydutin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.listItem}
                        >
                            <ListItemText primary="Dutin D." color="error" />
                        </ListItem>

                        <ListItem
                            button
                            component="a"
                            href="https://github.com/maximzmei"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.listItem}
                        >
                            <ListItemText primary="Rynkov M." color="error" />
                        </ListItem>

                        <ListItem
                            button
                            component="a"
                            href="https://github.com/asbarn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.listItem}
                        >
                            <ListItemText primary="Kabernyk Y." color="error" />
                        </ListItem>
                    </List>

                    <div className={styles.schoolLogo}>
                        <a
                            href="https://rs.school/js/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.schoolLogoLink}
                        >
                            <img
                                src={SchoolLogoIcon}
                                alt="School logo"
                                className={styles.schoolLogoIcon}
                            />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
