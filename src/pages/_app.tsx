import { type AppType } from "next/app";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Coolest Pokèmon by markushelminen</title>
      </Head>
      <Component {...pageProps} />
    </>    
  );
};

export default trpc.withTRPC(MyApp);
