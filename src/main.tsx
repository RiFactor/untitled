import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes.tsx";
import theme from "./theme.ts";
import { IntlProvider } from "react-intl";
import translations from "./locales/en.json";

const mergedMessages = Object.assign({}, translations);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <IntlProvider messages={mergedMessages} locale="en" defaultLocale="en"> */}
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
    {/* </IntlProvider> */}
  </React.StrictMode>
);
