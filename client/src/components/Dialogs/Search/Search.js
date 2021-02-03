import styles from './Search.module.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { getLanguage } from '../../../languages/index';
import { connect } from 'react-redux';

const Search = ({ language, onInput }) => {
    const translate = getLanguage(language);

    return (
        <div className={styles.search}>
            <TextField
                onInput={onInput}
                id="outlined-basic"
                label={translate['chat.searchPlaceholder']}
                variant="outlined"
                fullWidth={true}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(Search);
