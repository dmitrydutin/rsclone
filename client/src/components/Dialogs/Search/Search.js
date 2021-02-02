import styles from './Search.module.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Messages from '../last-messages.json';
import { getLanguage } from '../../../languages/index';
import { connect } from 'react-redux';

const Search = ({ language }) => {
    const translate = getLanguage(language);

    return (
        <div className={styles.search}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={Messages.map((option) => option.message)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={translate['chat.searchPlaceholder']}
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(Search);
