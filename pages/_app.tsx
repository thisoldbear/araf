import App from "next/app";
import { FilterContextProvider } from "../components/Context/FilterContext";

import "../styles/globals.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <FilterContextProvider>
        <Component {...pageProps} />
      </FilterContextProvider>
    );
  }
}

export default MyApp;
