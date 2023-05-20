import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LeftDrawer from "../components/LeftDrawer";
import TopNavbar from "../components/TopNavbar";
import { Button, styled } from "@mui/material";
import { Home } from "./Home";

import bannerImage from "../assets/ava2.jpg";

export default function HomeDesign() {
	return (
		<Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<TopNavbar />
				<Box sx={{ p: 3 }}>{Banner()}</Box>

				<CardHeader>Explore</CardHeader>
				<Home />
			</Box>
		</Box>
	);
}

const Banner = () => {
	return (
		<BannerBox>
			<WatchButtonContainer>
				<Button
					variant="contained"
					color={"error"}
					style={{
						borderRadius: "10px",
						padding: "10px",
						width: "100px",
						textTransform: "capitalize",
					}}
				>
					Watch
				</Button>
			</WatchButtonContainer>
		</BannerBox>
	);
};

const BannerBox = styled(Box)({
	width: "100%",
	height: "300px",
	borderRadius: "10px",
	backgroundColor: "blue",

	backgroundImage: `url(${bannerImage})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "center",
});

const WatchButtonContainer = styled(Box)({
	width: "100%",
	paddingTop: "220px",
	paddingLeft: "60px",
});

const CardHeader = styled(Box)({
	padding: "0 20px",

	fontSize: "20px",
	fontWeight: "600",
});
