import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    custom?: CustomThemeColors;
    boxShadows?: CustomBoxShadows;
  }

  interface Palette {
    custom: CustomThemeColors;
    boxShadows: CustomBoxShadows;
  }
}

interface CustomThemeColors {
  trapesysGreen: string;
  darkWhite: string;
  darkGray: string;
}

interface CustomBoxShadows {
  main: string;
  darker: string;
}
