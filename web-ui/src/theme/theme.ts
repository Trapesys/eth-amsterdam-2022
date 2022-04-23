import { createTheme, Theme } from '@material-ui/core/styles';

// Create a theme instance
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#777',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#00BE8D',
      contrastText: '#FFF'
    },
    text: {
      primary: '#101010',
      secondary: '#9A9FA5'
    },
    background: {
      default: '#FFF'
    },
    error: {
      main: '#f53b56'
    },
    custom: {
      trapesysGreen: '#00BE8D',
      darkWhite: '#FCFCFC',
      darkGray: '#797979'
    },
    boxShadows: {
      main: '1px 3px 6px 0px rgba(128,142,155,0.1)',
      darker: '1px 3px 6px 0px rgba(128,142,155,0.3)'
    }
  },
  typography: {
    fontFamily: `"Raleway", sans-serif`
  }
});

theme.overrides = {
  MuiButton: {
    root: {
      textTransform: 'initial'
    },
    disabled: {
      opacity: 0.5
    }
  },
  MuiInputBase: {
    root: {
      borderRadius: '10px !important'
    }
  },
  MuiTypography: {
    root: {
      fontFamily: 'Raleway !important',
      letterSpacing: '0 !important'
    }
  }
};

export default theme;
