import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </Provider>
    </React.StrictMode>
)