'use client';

/**
 * Theme configuration for the Himalayan Connect NYC application.
 *
 * This file defines the theme configuration for the application using MUI's createTheme function.
 * It includes color schemes, CSS variables, typography, and component styles.
 */

import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

const theme = createTheme({
    colorSchemes: { light: true },  //dark:true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;