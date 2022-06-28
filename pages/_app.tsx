import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { globalCss } from "stitches.config";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import AlertDialog from "@/components/ui/alert-dialog";
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const client = new ApolloClient({
  uri: "https://crm-backend-kios.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

const GlobalStyles = globalCss({
  html: {
    fontFamily: "'DM Sans', sans-serif",
  },

  "html, body": {
    margin: 0,
    padding: 0,
  },

  "*": {
    boxSizing: "border-box",
  },
});

const Noop = ({ children }: { children: ReactNode }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  GlobalStyles();
  const Layout = (Component as any).layout || Noop;
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <ToastContainer theme="light" position="top-center" />
        <AlertDialog />
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </>
    );
  }
}

export default MyApp;
