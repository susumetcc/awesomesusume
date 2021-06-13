import { createMuiTheme } from '@material-ui/core/styles';

// テーマカラー
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff5983',
      main: '#f50057',
      dark: '#bb002f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff350',
      main: '#ffc107',
      dark: '#c79100',
      contrastText: '#000',
    },
  },
});

export default theme;