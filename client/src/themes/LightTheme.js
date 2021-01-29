import { createMuiTheme } from '@material-ui/core/styles';
import { green, orange, blue } from '@material-ui/core/colors';

let lightTheme = createMuiTheme({
    palette: {
        main: blue[500],
        background: {
            default: '#fafafa',
        },
    },
});
export default lightTheme;
