import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getVideo, getVideos } from "../database/video";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { deepOrange } from "@mui/material/colors";

import { timeSince } from "../utils/time";
import { getUser } from "../database/user";
import { getShortAddress } from "../utils/addressShort";
import { getWalletAddress } from "../utils/wallet";
import ThetaTubeInterface from "../contracts/ThetaTube.json";
import JoinSubscription from "../components/JoinSubscription";

export const Video = () => {
	const [loading, setLoading] = useState(true);
	// const [premiumLoading, setPremiumLoading] = useState(false);
	const [video, setVideo] = useState();
	const [creator, setCreator] = useState();
	const [videos, setVideos] = useState([]);
	const [boughtPremium, setBoughtPremium] = useState(false);

	const [joinSubscriptionOpen, setJoinSubscriptionOpen] = useState(false);

	const { videoId } = useParams();

	async function getVideoFromId(videoId) {
		setLoading(true);
		const response = await getVideo(videoId);
		setVideo(response);
		const Videos = await getVideos();
		setVideos(Videos);

		if (response?.creator?.collectionId) {
			const creator = await getUser(response.creator.id);
			setCreator(creator);
			checkPremiumBought();
		}
		setLoading(false);
	}

	// Check if token already exist's
	async function checkPremiumBought() {
		if (!creator) return;
		const currentAddress = await getWalletAddress();
		if (!currentAddress) alert("Please connect your wallet");

		const contract = new window.web3.eth.Contract(
			ThetaTubeInterface.abi,
			creator.premiumContractAddress
		);
		const balance = await contract.methods.balanceOf(currentAddress).call();
		if (parseInt(balance) > 0) setBoughtPremium(true);
	}

	useEffect(() => {
		getVideoFromId(videoId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId]);

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
					<CircularProgress />
				) : (
					video && (
						<ViewGridContainer>
							<Box sx={{ mb: 3 }}>
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
											srcSet=""
											style={{
												height: "100%",
												width: "100%",
												objectFit: "cover ",
												borderRadius: "50%",
											}}
										/>
									</VideoProfile>
									<VideoDetails>
										<VideoOwner>
											{creator?.id && getShortAddress(creator.id)}
										</VideoOwner>
										<VideoOwnerSubs>
											{video.views && `${video.views} views`}
											<RecommendedSmallSpan>
												{video.timestamp &&
													`${timeSince(new Date(video.timestamp))} ago`}
											</RecommendedSmallSpan>
										</VideoOwnerSubs>
									</VideoDetails>
									<ColorButton
										variant="contained"
										onClick={() => setJoinSubscriptionOpen(true)}
									>
										{
											// premiumLoading ? (
											// 	<CircularProgress />
											// ) :
											boughtPremium ? "Premium Subscriber" : "Join Premium"
										}
									</ColorButton>
									<JoinSubscription
										isOpen={joinSubscriptionOpen}
										handleExternalClose={setJoinSubscriptionOpen}
										creator={creator}
									/>
									<Box>
										{/* <RecommendedSmall>Random Chikibum</RecommendedSmall> */}
										{/* <RecommendedSmall>
											{video.views && `${video.views} views`}
											<RecommendedSmallSpan>
												{video.timestamp &&
													`${timeSince(new Date(video.timestamp))} ago`}
											</RecommendedSmallSpan>
										</RecommendedSmall> */}
									</Box>
								</VideoGridContainer>
								<VideoDescription>
									{video.description && video.description}
								</VideoDescription>
							</Box>
							<RecommendedContainer>
								{videos?.length > 0 &&
									videos.map(({ data: v }) => (
										<RecommendedBox key={v.id}>
											<RecommendedThumnail>
												<img
													src={
														v.thumbnail ? v.thumbnail : "/images/not_found.svg"
													}
													style={{
														height: "100%",
														width: "100%",
														borderRadius: "6px",
													}}
													alt=""
													srcSet=""
												/>
											</RecommendedThumnail>
											<RecommendedDetailContainer>
												<RecommendedTitle>{v.name && v.name}</RecommendedTitle>
												<RecommendedSmall>
													{v.creator?.id && getShortAddress(v.creator.id)}
												</RecommendedSmall>
												<RecommendedSmall>
													{v.views !== null && `${v.views} views`}
													{v.timestamp && (
														<RecommendedSmallSpan>
															{`${timeSince(new Date(v.timestamp))} ago`}
														</RecommendedSmallSpan>
													)}
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
	/* margin-bottom: 20px; */
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

const VideoDescription = styled.div`
	font-size: 14px;
	font-weight: 400;
	/* color: #aaa; */
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
