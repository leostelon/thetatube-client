import { Box, CssBaseline, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LeftDrawer from "../components/LeftDrawer";
import TopNavbar from "../components/TopNavbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getPremiumVideos } from "../database/video";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.png";
import { getShortAddress } from "../utils/addressShort";
import { timeSince } from "../utils/time";
import { Thumbnail } from "../components/Thumbnail";
import { VideosLoading } from "../components/VideosLoading";

export default function Premium() {
	return (
		<Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<TopNavbar />
				<PremiumBox />
			</Box>
		</Box>
	);
}

export const PremiumBox = () => {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	async function fetchVideos() {
		setLoading(true);
		const response = await getPremiumVideos();
		setVideos(response);
		setLoading(false);
	}

	useEffect(() => {
		fetchVideos();
	}, []);

	return (
		<Box>
			{/* <Navbar /> */}
			{loading ? (
				<VideosLoading />
			) : (
				// <InfiniteScroll
				// 	dataLength={videos?.length}
				// 	// next={() => getUserAssets(userAddress)}
				// 	// hasMore={true}
				// 	loader={<p></p>}
				// 	style={{ overflowX: "clip" }}
				// >
				<Grid
					container
					sx={{ p: 2, width: "100%" }}
					// spacing={{ xs: 2, md: 3 }}
					// columns={{ xs: 2, sm: 8, md: 10, lg: 10, xl: 15 }}
				>
					{videos.map((vid, i) => {
						let v = vid.data;
						return (
							<Grid
								item
								mobile={12}
								tablet={8}
								laptop={4}
								key={v.id}
								sx={{ height: "320px", width: "340px" }}
							>
								<VideoCard onClick={() => navigate("/video/" + v.id)} key={i}>
									<Thumbnail thumbnail={v.thumbnail} />

									<CardDetailsContainer>
										<CardProfile>
											<img
												src={
													v.creator.profile_image &&
													v.creator.profile_image !== ""
														? v.creator.profile_image
														: NoImagePlaceholder
												}
												height="100%"
												width="100%"
												alt={v.id + v.timestamp}
												style={{ borderRadius: "50%" }}
											/>
										</CardProfile>
										<CardDetails>
											<CardTitle>{v.name}</CardTitle>
											<CardSmall>{getShortAddress(v.creator.id)}</CardSmall>
											<CardSmall>
												{v.views} views
												<CardSmallSpan>
													{timeSince(new Date(v.timestamp))} ago
												</CardSmallSpan>
											</CardSmall>
										</CardDetails>
									</CardDetailsContainer>
								</VideoCard>
							</Grid>
						);
					})}
				</Grid>
				// </InfiniteScroll>
			)}
		</Box>
	);
};

// const VideoCardHolder = styled.div`
// 	display: flex;
// 	flex-wrap: wrap;
// 	justify-content: space-evenly;
// `;

const VideoCard = styled.div`
	/* flex: 1;
	height: 320px;
	width: 340px; */
	/* background-color: black; */

	/* background: rgb(221, 221, 221);
	background: linear-gradient(
		90deg,
		rgba(221, 221, 221, 1) 0%,
		rgba(236, 236, 236, 1) 51%,
		rgba(221, 221, 221, 1) 100%
	); */

	margin-right: 10px;

	&:hover {
		cursor: pointer;
	}
`;

const CardDetailsContainer = styled.div`
	display: flex;
	margin-top: 12px;
`;

const CardProfile = styled.div`
	height: 36px;
	width: 36px;
	margin-right: 12px;
`;

const CardDetails = styled.div`
	overflow-x: hidden;
	padding-right: 24px;
	max-width: 250px;
`;

const CardTitle = styled.div`
	font-size: 16px;
	font-weight: 500;
	margin-bottom: 6px;

	/* color: #f1f1f1; */
	color: white;
`;

const CardSmall = styled.div`
	font-size: 12px;
	font-weight: 400;

	/* color: #aaa; */
	color: #6e6e6e;
`;
const CardSmallSpan = styled.span`
	:before {
		content: "•";
		margin: 0 4px;
	}
`;
