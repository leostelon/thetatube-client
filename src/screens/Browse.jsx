import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LeftDrawer from "../components/LeftDrawer";
import TopNavbar from "../components/TopNavbar";
import { useSearchParams } from "react-router-dom";
import { searchVideos } from "../database/video";
import { VideosLoading } from "../components/VideosLoading";
import styled from "styled-components";
import { Home } from "./Home";

export const Browse = () => {
	let [searchParams] = useSearchParams();

	const query = searchParams.get("query");
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchVideos(query) {
		setLoading(true);
		const response = await searchVideos(query);
		console.log(response);
		setVideos(response);
		setLoading(false);
	}

	useEffect(() => {
		console.log(query);
		fetchVideos(query);
	}, [query]);

	return (
		<Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1, backgroundColor: "#111" }}>
				<TopNavbar />
				<Box>
					<Box sx={{ px: 2, color: "white" }}>
						<h2>Explore🧭</h2>
					</Box>
					{loading ? (
						<VideosLoading />
					) : (
						<>
							{videos?.length == 0 && (
								<Box sx={{ display: "flex", justifyContent: "center", pr: 8 }}>
									<Box
										sx={{ height: "200px", width: "200px", cursor: "pointer" }}
									>
										<img
											style={{ width: "100%", height: "100%" }}
											src="/images/zerp2.svg"
											alt=""
											srcSet=""
										/>
									</Box>
								</Box>
							)}
							{videos?.length > 0 && <Home videos={videos} />}
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
};

// const VideoCard = styled.div`
// 	/* flex: 1;
// 	height: 320px;
// 	width: 340px; */
// 	/* background-color: black; */

// 	/* background: rgb(221, 221, 221);
// 	background: linear-gradient(
// 		90deg,
// 		rgba(221, 221, 221, 1) 0%,
// 		rgba(236, 236, 236, 1) 51%,
// 		rgba(221, 221, 221, 1) 100%
// 	); */

// 	margin-right: 10px;

// 	&:hover {
// 		cursor: pointer;
// 	}
// `;

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

{
	/* <Grid
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
												<VideoCard
													onClick={() => navigate("/video/" + v.id)}
													key={i}
												>
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
															<CardSmall>
																{getShortAddress(v.creator.id)}
															</CardSmall>
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
								</Grid> */
}
