import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Layout from "./components/Layout";
import Stock from "./components/Stock";
import StockChartContextProvider from "./components/context/StockChartContext";
import SymbolSearchBar from "./components/SymbolSearchBar";
import { usingFakeData } from "./config";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;800&display=swap');
  body {
    font-family:"Kanit", sans-serif;
    background: #242424;
    height:100vh;
  }
`;

const DemoDisclaimer = styled.span`
  color: #b54444;
  margin-top: 12px;
  margin-left: 12px;
  font-size: 12px;
`;

const App = () => (
  <>
    {usingFakeData ? (
      <DemoDisclaimer>No API key provided. Using demo data.</DemoDisclaimer>
    ) : null}
    <Layout>
      <StockChartContextProvider>
        <SymbolSearchBar />
        <Stock />
      </StockChartContextProvider>
    </Layout>
    <GlobalStyle />
  </>
);

export default App;
