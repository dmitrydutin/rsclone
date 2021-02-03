import styles from './Profile.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withLogoutRedirect } from '../../hoc/withAuthRedirect';
import { getLanguage } from '../../languages/index';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '100%',
        height: '100%',
    },
}));

const Profile = ({ language }) => {
    const classes = useStyles();
    const translate = getLanguage(language);

    return (
        <main className={styles.main}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Paper elevation={0} className={styles.paper}>
                            <Avatar
                                variant="square"
                                alt="Remy Sharp"
                                src="https://i.pinimg.com/236x/2f/8c/ff/2f8cffcfd465c769a1c2f6e591d56eae.jpg"
                                className={classes.avatar}
                            >
                                D
                            </Avatar>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper elevation={0} className={styles.paper}>
                            <Typography variant="h5" component="h1" color="textPrimary">
                                Dmitry Dutin
                            </Typography>

                            <Typography variant="subtitle1" component="span" color="textPrimary">
                                Hello world. Hello world
                            </Typography>

                            <Divider />

                            <Typography variant="body1" component="span" color="textPrimary">
                                Город: City
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Paper elevation={0} className={styles.paper}>
                            <p>About</p>
                            <p>
                                Tart I love sugar plum I love oat cake. Sweet roll caramels I love
                                jujubes. Topping cake wafer..
                            </p>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper elevation={0} className={styles.paper}>
                            <Typography variant="h5" component="h1" color="textPrimary">
                                POSTS
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
};

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default compose(connect(mapStateToProps), withLogoutRedirect)(Profile);
