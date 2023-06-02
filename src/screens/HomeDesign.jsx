import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LeftDrawer from "../components/LeftDrawer";
import TopNavbar from "../components/TopNavbar";
import { styled } from "@mui/material";
import { Home } from "./Home";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

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
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<TopNavbar />
				<Box sx={{ p: 3 }}>{Banner()}</Box>

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
				disableButtonsControls
				responsive={{
					0: {
						items: 1,
					},
					1000: {
						items: 2,
					},
				}}
				items={[
					"https://thetaplus-13e54473-f699-4b6d-99fe-4b846eab3fd-e275e6.spheron.app/person.jpg",
					"https://thetaplus-13e54473-f699-4b6d-99fe-4b846eab3fd-e275e6.spheron.app/shark.jpg",
					"https://thetaplus-13e54473-f699-4b6d-99fe-4b846eab3fd-e275e6.spheron.app/tiktok.jpg",
				].map((src, i) => (
					<img
						src={src}
						onDragStart={handleDragStart}
						role="presentation"
						style={{
							height: "300px",
							width: `98%`,
							borderRadius: "10px",
						}}
						alt={"banner-" + i}
					/>
				))}
			/>
		</BannerBox>
	);
};

const BannerBox = styled(Box)({
	// width: "100%",
	height: "300px",
	borderRadius: "10px",
	// backgroundColor: "grey",

	// backgroundImage: `url(${bannerImage})`,
	// backgroundRepeat: "no-repeat",
	// backgroundSize: "cover",
	// backgroundPosition: "center",
});

const CardHeader = styled(Box)({
	padding: "0 20px",

	fontSize: "20px",
	fontWeight: "600",
});
