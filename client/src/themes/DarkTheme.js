import { createMuiTheme } from '@material-ui/core/styles';
import { green, orange, blue } from '@material-ui/core/colors';

let darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        main: `#212121`,
        background: {
            default: '#222222',
            secondary: '#222222',
        },
        text: {
            primary: '#ffffff',
        },
    },
});
export default darkTheme;
