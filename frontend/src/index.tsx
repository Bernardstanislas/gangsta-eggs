import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as FullStory from "@fullstory/browser";
import { Symfoni } from "./hardhat/SymfoniContext";
import { ToastContainer } from "react-toastify";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "react-toastify/dist/ReactToastify.css";

FullStory.init({ orgId: "169KHR" });

Sentry.init({
  dsn: "https://f1ee8f0aab974509abcb8e265e79ec2c@o1091325.ingest.sentry.io/6108111",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <BrowserRouter>
    <Symfoni autoInit={false} showLoading={false}>
      <App />
    </Symfoni>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </BrowserRouter>,
  document.getElementById("root")
);
