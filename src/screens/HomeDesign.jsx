import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LeftDrawer from "../components/LeftDrawer";

export default function HomeDesign() {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Box>hello</Box>
			</Box>
		</Box>
	);
}
