import styles from './Search.module.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Messages from '../last-messages.json'

const Search = () => {

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
                        label="Search messages"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </div>
    );
}

export default Search;
