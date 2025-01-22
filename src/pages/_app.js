import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import Layout from "@/component/layout/layoutcomponent";
import { AuthProvider } from "@/context/AuthContext";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({});

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
