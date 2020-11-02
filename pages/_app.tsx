import React, { useContext } from "react";
import App from "next/app";
import "../styles/globals.css";
import { FilterContextProvider } from "../components/Context/FilterContext";

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
