import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LeftDrawer from "../components/LeftDrawer";
import TopNavbar from "../components/TopNavbar";
import { Button, styled } from "@mui/material";
import { Home } from "./Home";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import bannerImage from "../assets/ava2.jpg";

export default function HomeDesign() {
	return (
		<Box
			sx={{
				display: "flex",
				fontFamily: "Poppins, sans-serif",
				color: "white",
			}}
		>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<TopNavbar />
				<Box sx={{ p: 3, maxWidth: "82vw" }}>{Banner()}</Box>

				<CardHeader sx={{ mb: 2 }}>Explore</CardHeader>

				<Home />
			</Box>
		</Box>
	);
}

const Banner = () => {
	const handleDragStart = (e) => e.preventDefault();
	return (
		<BannerBox>
			{/* <WatchButtonContainer>
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
			</WatchButtonContainer> */}

			<AliceCarousel
				mouseTracking
				items={["/images/wall.jpg", "/images/wall2.jpg"].map((src) => (
					<img
						src={src}
						onDragStart={handleDragStart}
						role="presentation"
						style={{ height: "300px", width: "100%", borderRadius: "10px" }}
					/>
				))}
			/>
		</BannerBox>
	);
};

const BannerBox = styled(Box)({
	width: "100%",
	height: "300px",
	borderRadius: "10px",
	backgroundColor: "grey",

	// backgroundImage: `url(${bannerImage})`,
	// backgroundRepeat: "no-repeat",
	// backgroundSize: "cover",
	// backgroundPosition: "center",
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
