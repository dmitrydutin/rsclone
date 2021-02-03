import styles from './EditDialog.module.css';
import { connect } from 'react-redux';
import { getLanguage } from '../../../languages/index';
import { editUserData, uploadImage } from '../../../redux/reducers/ProfileReducer';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';

const EditDialog = ({
    token,
    language,
    open,
    closeEditDialog,
    user,
    editUserData,
    uploadImage,
}) => {
    const translate = getLanguage(language);

    const initialValues = {
        name: user.name ?? '',
        surname: user.surname ?? '',
        quote: user.quote ?? '',
        city: user.city ?? '',
        about: user.about ?? '',
        avatar: user.avatar ?? '',
    };

    const EditSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, translate['login.yup.short'])
            .max(30, translate['login.yup.long'])
            .required(translate['login.yup.required']),
        surname: Yup.string()
            .min(5, translate['login.yup.short'])
            .max(30, translate['login.yup.long'])
            .required(translate['login.yup.required']),
        quote: Yup.string()
            .min(1, translate['login.yup.short'])
            .max(50, translate['login.yup.long'])
            .required(translate['login.yup.required']),
        city: Yup.string()
            .min(1, translate['login.yup.short'])
            .max(50, translate['login.yup.long'])
            .required(translate['login.yup.required']),
        about: Yup.string()
            .min(1, translate['login.yup.short'])
            .max(5000, translate['login.yup.long'])
            .required(translate['login.yup.required']),
        avatar: Yup.string()
            .min(1, translate['login.yup.short'])
            .max(5000, translate['login.yup.long'])
            .required(translate['login.yup.required']),
    });

    const onSubmit = (values, { setSubmitting }) => {
        editUserData(token, user.id, values, setSubmitting);
    };

    return (
        <Dialog onClose={closeEditDialog} open={open}>
            <DialogTitle align="center" variant="h1" component="h2" className={styles.dialogTitle}>
                {translate['profile.dialog.title']}
            </DialogTitle>

            <DialogContent className={styles.dialogContent}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={EditSchema}
                >
                    {({ submitForm, isSubmitting, setFieldValue, setSubmitting }) => (
                        <Form className={styles.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="name"
                                        label={translate['profile.dialog.name']}
                                        variant="outlined"
                                        fullWidth={true}
                                        autoComplete='true'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Field
                                        component={TextField}
                                        name="surname"
                                        label={translate['profile.dialog.surname']}
                                        variant="outlined"
                                        fullWidth={true}
                                        autoComplete='true'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="quote"
                                        label={translate['profile.dialog.quote']}
                                        variant="outlined"
                                        fullWidth={true}
                                        autoComplete='true'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="city"
                                        label={translate['profile.dialog.city']}
                                        variant="outlined"
                                        fullWidth={true}
                                        autoComplete='true'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="about"
                                        label={translate['profile.dialog.about']}
                                        variant="outlined"
                                        fullWidth={true}
                                        multiline={true}
                                        autoComplete='true'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <input
                                        className={styles.invisible}
                                        accept="image/x-png,image/gif,image/jpeg"
                                        type="file"
                                        placeholder="Upload an image"
                                        id="icon-button-file"
                                        name="avatar"
                                        onChange={(event) => {
                                            uploadImage(event, setFieldValue, setSubmitting);
                                        }}
                                    />

                                    <label htmlFor="icon-button-file">
                                        <Button
                                            component="span"
                                            variant="outlined"
                                            size="large"
                                            fullWidth={true}
                                            disabled={isSubmitting}
                                        >
                                            {translate['profile.dialog.changeAvatar']}
                                        </Button>
                                    </label>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                        fullWidth={true}
                                        size="large"
                                    >
                                        {translate['profile.dialog.edit']}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps, { editUserData, uploadImage })(EditDialog);
