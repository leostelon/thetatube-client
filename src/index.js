import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#111",
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	//   <React.StrictMode>
	<>
		<ThemeProvider theme={darkTheme}>
			<App />
		</ThemeProvider>
		<ToastContainer position="bottom-center" pauseOnHover autoClose={3000} />
	</>
	//   </React.StrictMode>
);
