import { SWRConfig } from "swr";
import fetcher from "../lib/fetcher";
import "../styles/globals.scss";
import "../styles/typography.scss";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ refreshInterval: 2000, fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
