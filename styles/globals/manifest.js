import React from "react";
import { createGlobalStyle } from "styled-components";

import "@fontsource/nunito-sans/900-italic.css";

import normalize from "./normalize";
import theme from "./theme";
import base from "./base";
import app from "./app";

// -------------------------------------------------------------
// Manifest.
// -------------------------------------------------------------

const NormalizeGlobalStyles = createGlobalStyle`${normalize}`;
const ThemeGlobalStyles = createGlobalStyle`${theme}`;
const BaseGlobalStyles = createGlobalStyle`${base}`;
const AppGlobalStyles = createGlobalStyle`${app}`;

const Styles = () => (
  <>
    <NormalizeGlobalStyles />
    <ThemeGlobalStyles />
    <BaseGlobalStyles />
    <AppGlobalStyles />
  </>
);
export default Styles;
