import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import Layout from "@/component/layout/layoutcomponent";

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    // palette: {
    //   primary: {
    //     main: "#3f51b5",
    //   },
    //   secondary: {
    //     main: "#f50057",
    //   },
    // },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
