import { Box, CircularProgress, CssBaseline } from "@mui/material";
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
import TopNavbar from "../components/TopNavbar";
import LeftDrawer from "../components/LeftDrawer";

import wall from "../assets/wall2.jpg";
import prof from "../assets/profileBack.jpg";
import { AiOutlineEye } from "react-icons/ai";

export function VideoDesign() {
	return (
		<Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<TopNavbar />
				<VideoBox />
			</Box>
		</Box>
	);
}

const VideoBox = () => {
	// const [loading, setLoading] = useState(true);
	// // const [premiumLoading, setPremiumLoading] = useState(false);
	// const [video, setVideo] = useState();
	// const [creator, setCreator] = useState();
	// const [videos, setVideos] = useState([]);
	// const [boughtPremium, setBoughtPremium] = useState(false);

	// const [joinSubscriptionOpen, setJoinSubscriptionOpen] = useState(false);

	// const { videoId } = useParams();

	// async function getVideoFromId(videoId) {
	// 	setLoading(true);
	// 	const response = await getVideo(videoId);
	// 	setVideo(response);
	// 	const Videos = await getVideos();
	// 	setVideos(Videos);

	// 	if (response?.creator?.collectionId) {
	// 		const creator = await getUser(response.creator.id);
	// 		setCreator(creator);
	// 		checkPremiumBought();
	// 	}
	// 	setLoading(false);
	// }

	// // Check if token already exist's
	// async function checkPremiumBought() {
	// 	if (!creator) return;
	// 	const currentAddress = await getWalletAddress();
	// 	if (!currentAddress) alert("Please connect your wallet");

	// 	const contract = new window.web3.eth.Contract(
	// 		ThetaTubeInterface.abi,
	// 		creator.premiumContractAddress
	// 	);
	// 	const balance = await contract.methods.balanceOf(currentAddress).call();
	// 	if (parseInt(balance) > 0) setBoughtPremium(true);
	// }

	// useEffect(() => {
	// 	getVideoFromId(videoId);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [videoId]);

	return (
		<Box>
			<></>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					pl: 3,
				}}
			>
				{/* {loading ? (
					<CircularProgress />
				) : (
					video &&
                     ( */}
				<ViewGridContainer>
					<Box sx={{ mb: 3 }}>
						<VideoContainer>
							{/* <iframe
								src={`https://player.thetavideoapi.com/video/video_1nt5wshd78vsar73tt51awcdkg`}
								border="0"
								width="100%"
								height="100%"
								allowFullScreen
								// className="h-[400px] w-[100%]"
								// title={video.id}
								style={{ borderRadius: "20px" }}
							/> */}
							<img
								src="/images/wall2.jpg"
								alt=""
								srcSet=""
								style={{
									height: "100%",
									width: "100%",
									objectFit: "cover ",
									// borderRadius: "50%",
								}}
							/>
						</VideoContainer>
						<VideoTitle>
							{/* {video.name && video.name} */}
							video name
						</VideoTitle>
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
										borderRadius: "10px",
									}}
								/>
							</VideoProfile>
							<VideoDetails>
								<VideoOwner>
									{/* {creator?.id && getShortAddress(creator.id)} */}
									owner
								</VideoOwner>
								<VideoOwnerSubs>
									{/* {video.views && `${video.views} views`}  */}0 viewa
									<RecommendedSmallSpan>
										{/* {video.timestamp &&
											`${timeSince(new Date(video.timestamp))} ago`} */}
										4 mins ago
									</RecommendedSmallSpan>
								</VideoOwnerSubs>
							</VideoDetails>
							<ColorButton
								variant="contained"
								// onClick={() => setJoinSubscriptionOpen(true)}
							>
								{
									// premiumLoading ? (
									// 	<CircularProgress />
									// ) :
									// boughtPremium ? "Premium Subscriber" :
									"Join Premium"
								}
							</ColorButton>
							{/* <JoinSubscription */}
							{/* // isOpen={joinSubscriptionOpen}
							// handleExternalClose={setJoinSubscriptionOpen}
							// creator={creator}
							// /> */}
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
							{/* {video.description && video.description} */}
							Description
						</VideoDescription>
					</Box>
					<RecommendedContainer>
						{
							// videos?.length > 0 &&
							// 	videos

							[1, 2, 3, 4, 5, 6].map(({ data: v }) => (
								<RecommendedBox
								// key={v.id}
								>
									<RecommendedThumnail
										style={{ backgroundImage: `url(${wall})` }}
									>
										<RecommendedTime>01 : 00</RecommendedTime>
									</RecommendedThumnail>
									<RecommendedDetailContainer>
										<RecommendedTitle>
											{/* {v.name && v.name} */}
											Video Name
										</RecommendedTitle>
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<Box
												sx={{
													height: "20px",
													width: "20px",
													borderRadius: "2px",
													backgroundImage: `url(${prof})`,
													backgroundRepeat: "no-repeat",
													backgroundSize: "cover",
													backgroundPosition: "center",

													mr: 1,
												}}
											></Box>
											<RecommendedSmall>
												{/* {v.creator?.id && getShortAddress(v.creator.id)} */}
												owner
											</RecommendedSmall>
										</Box>
										<RecommendedSmall
											style={{
												display: "flex",
												// alignItems: "center",
												// height: "10px",
											}}
										>
											<AiOutlineEye style={{ margin: "2px 2px 0 0" }} />
											{/* {v.views !== null && `${v.views} views`} */}
											20 views
											{/* {v.timestamp && ( */}
											<RecommendedSmallSpan>
												{/* {`${timeSince(new Date(v.timestamp))} ago`} */}
												10 mins ago
											</RecommendedSmallSpan>
											{/* )} */}
										</RecommendedSmall>
									</RecommendedDetailContainer>
								</RecommendedBox>
							))
						}
					</RecommendedContainer>
				</ViewGridContainer>
				{/* )
				)} */}
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
	/* aspect-ratio: 8 / 5; */
	min-width: 630px;
	max-height: 60vh;

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
	margin-bottom: 14px;
`;

const RecommendedThumnail = styled.div`
	box-sizing: border-box;

	width: 136px;
	height: 94px;
	margin-right: 10px;

	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;

	border-radius: 10px;
`;
const RecommendedDetailContainer = styled.div`
	min-width: 226px;
	width: 226px;
	height: 94px;
`;

const RecommendedTitle = styled.div`
	font-size: 13px;
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
	color: #aaa;
	padding: 2px 0;
`;
const RecommendedSmallSpan = styled.span`
	:before {
		content: "•";
		margin: 0 4px;
	}
`;

const ColorButton = muiStyled(Button)(() => ({
	backgroundColor: "#e1b24b",
	"&:hover": {
		backgroundColor: "#d2a033",
	},
	marginRight: "8px",
}));

const RecommendedTime = styled.div`
	font-size: 10px;
	font-weight: 400;

	width: 60px;
	margin: 10px;
	padding: 5px;

	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 10px;
	background-color: black;
	background-image: radial-gradient(
		circle,
		#616161,
		#595959,
		#515151,
		#4a4a4a,
		#424242
	);
`;
