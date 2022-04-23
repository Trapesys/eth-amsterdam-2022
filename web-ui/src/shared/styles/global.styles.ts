import theme from '../../theme/theme';

export const globalStyles = {
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%',
      backgroundColor: theme.palette.custom.darkWhite
    },
    '#root': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    '.pointer': {
      cursor: 'pointer'
    },
    '.ellipsis': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.noDecoration': {
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '.truncate': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.actionButtonBase': {
      fontFamily: 'Poppins',
      fontWeight: 500,
      padding: '8px 16px',
      borderRadius: '20px',
      boxShadow: 'none'
    },
    '.sectionDivider': {
      height: '3px',
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '15px'
    },
    '.sectionTitle': {
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(24),
      color: theme.palette.secondary.main
    }
  }
};
