import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getVideo } from "../database/video";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { blueGrey, deepOrange, grey } from "@mui/material/colors";

import Lottie from "lottie-react";
import videoLoader from "../assets/videoLoader.json";
import { timeSince } from "../utils/time";
import { getUser } from "../database/user";

export const Video = () => {
	const [loading, setLoading] = useState(true);
	const [video, setVideo] = useState();
	const [creator, setCreator] = useState();

	const { videoId } = useParams();

	async function getVideoFromId(videoId) {
		setLoading(true);
		const response = await getVideo(videoId);
		setVideo(response);
		if (response?.creator?.collectionId) {
			const creator = await getUser(response.creator.collectionId);
			setCreator(creator);
		}
		setLoading(false);
	}

	useEffect(() => {
		getVideoFromId(videoId);
	}, [videoId]);

	console.log("=======================");
	console.log(video, creator);
	console.log("=======================");
	return (
		<Box>
			<Navbar />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{loading ? (
					// <CircularProgress />
					<Lottie
						animationData={videoLoader}
						loop={true}
						style={{ width: "300px", height: "300px" }}
					/>
				) : (
					video && (
						<ViewGridContainer>
							<Box>
								<VideoContainer>
									<iframe
										src={`https://player.thetavideoapi.com/video/${video.id}`}
										border="0"
										width="100%"
										height="100%"
										allowFullScreen
										// className="h-[400px] w-[100%]"
										title={video.id}
									/>
								</VideoContainer>
								<VideoTitle>{video.name && video.name}</VideoTitle>
								<VideoGridContainer>
									<VideoProfile>
										<img
											src="/images/wall.jpg"
											alt=""
											srcset=""
											style={{
												height: "100%",
												width: "100%",
												objectFit: "cover ",
												borderRadius: "50%",
											}}
										/>
									</VideoProfile>
									<VideoDetails>
										<VideoOwner>Ondraga Entertainment</VideoOwner>
										<VideoOwnerSubs>1.27M subscribers</VideoOwnerSubs>
									</VideoDetails>

									<ColorButton
										variant="contained"
										// ="#d1c4e9"
									>
										Join Premium
									</ColorButton>

									<Box>
										{/* <RecommendedSmall>Random Chikibum</RecommendedSmall> */}
										<RecommendedSmall>
											{video.views && `${video.views} views`}
											<RecommendedSmallSpan>
												{video.timestamp &&
													`${timeSince(new Date(video.timestamp))} ago`}
											</RecommendedSmallSpan>
										</RecommendedSmall>
									</Box>
								</VideoGridContainer>
							</Box>
							<RecommendedContainer>
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
									<RecommendedBox>
										<RecommendedThumnail>
											<img
												src="/images/smallthm.webp"
												style={{
													height: "100%",
													width: "100%",
													borderRadius: "6px",
												}}
												alt=""
												srcset=""
											/>
										</RecommendedThumnail>
										<RecommendedDetailContainer>
											<RecommendedTitle>
												Mudhal Nee Mudivum Nee - Title Track Video | Darbuka
												Siva | Sid Sriram | Thamarai
											</RecommendedTitle>
											<RecommendedSmall>Random Chikibum</RecommendedSmall>
											<RecommendedSmall>
												650K views
												<RecommendedSmallSpan>2 weeks ago</RecommendedSmallSpan>
											</RecommendedSmall>
										</RecommendedDetailContainer>
									</RecommendedBox>
								))}
							</RecommendedContainer>
						</ViewGridContainer>
					)
				)}
			</Box>
		</Box>
	);
};

const ViewGridContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

// * video

const VideoContainer = styled.div`
	flex-grow: 1;
	aspect-ratio: 16 / 9;
	min-width: 660px;
	max-height: 70vh;

	padding-right: 24px;

	margin-bottom: 10px;

	cursor: pointer;
`;

const VideoTitle = styled.div`
	max-width: 900px;
	font-size: 20px;
	font-weight: 600;
	overflow: hidden;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	white-space: normal;
	max-height: 50px;

	margin: 10px 0;

	padding-right: 24px;
`;

const VideoGridContainer = styled.div`
	height: 54px;
	/* background-color: #ff000029; */

	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;
const VideoProfile = styled.div`
	height: 40px;
	width: 40px;
	margin-right: 12px;
`;

const VideoDetails = styled.div`
	flex: 1;
	flex-basis: 1e-9px;
	display: flexbox;
	display: flex;
	flex-direction: column;
	justify-content: center;

	margin-right: 24px;
	overflow: hidden;

	max-width: 200px;
`;

const VideoOwner = styled.div`
	font-size: 16px;
	font-weight: 500;
`;
const VideoOwnerSubs = styled.div`
	font-size: 14px;
	font-weight: 400;
	color: #aaa;
`;
// * recommended
const RecommendedContainer = styled.div`
	width: 420px;
`;
const RecommendedBox = styled.div`
	display: flex;
	margin-bottom: 8px;
`;

const RecommendedThumnail = styled.div`
	box-sizing: border-box;

	width: 168px;
	height: 94px;
	margin-right: 10px;
`;
const RecommendedDetailContainer = styled.div`
	min-width: 226px;
	width: 226px;
	height: 94px;
`;

const RecommendedTitle = styled.div`
	font-size: 14px;
	color: #f1f1f1;
	max-width: 226px;
	max-height: 4rem;
	overflow-y: hidden;
	font-weight: 600;
	margin-bottom: 4px;

	-webkit-line-clamp: 2;
	display: box;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	white-space: normal;
`;

const RecommendedSmall = styled.div`
	font-size: 13px;
	font-weight: 400;
	font-family: "Roboto", "Arial", sans-serif;
	color: #aaa;
	padding: 2px 0;
`;
const RecommendedSmallSpan = styled.span`
	:before {
		content: "•";
		margin: 0 4px;
	}
`;

const ColorButton = muiStyled(Button)(({ theme }) => ({
	// color: theme.palette.getContrastText(grey[300]),
	backgroundColor: deepOrange[500],
	// contrastText: black,
	"&:hover": {
		backgroundColor: deepOrange[800],
	},
	marginRight: "8px",
}));
