import styles from './Footer.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getLanguage } from '../../languages/index';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SchoolLogoIcon from './assets/images/rs_school_js.svg';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.footer.background,
        borderTop: `1px solid ${theme.palette.footer.border}`,
    },
    listItem: {
        width: 'auto',
        borderRadius: '0.29rem',
        transition: 'all .2s ease-in-out',
        '&:hover': {
            background: theme.palette.button.hover.background,
            '&>div>span': {
                color: theme.palette.button.hover.color,
            },
        },
        '&.Mui-selected': {
            background: theme.palette.button.selected.background,
        },
        '& .MuiTouchRipple-root': {
            opacity: 0.5,
        },
    },
}));

const Footer = ({ language }) => {
    const classes = useStyles();
    const translate = getLanguage(language);

    return (
        <footer className={classes.footer}>
            <Container>
                <div className={styles.inner}>
                    <Typography variant="body2" color="textSecondary">
                        {translate['footer.copyright']}
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
                            <ListItemText
                                primary={translate['footer.authors.dutin']}
                                primaryTypographyProps={{ color: 'textSecondary' }}
                            />
                        </ListItem>

                        <ListItem
                            button
                            component="a"
                            href="https://github.com/maximzmei"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.listItem}
                        >
                            <ListItemText
                                primary={translate['footer.authors.rynkov']}
                                primaryTypographyProps={{ color: 'textSecondary' }}
                            />
                        </ListItem>

                        <ListItem
                            button
                            component="a"
                            href="https://github.com/asbarn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.listItem}
                        >
                            <ListItemText
                                primary={translate['footer.authors.kabernyk']}
                                primaryTypographyProps={{ color: 'textSecondary' }}
                            />
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

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(Footer);
