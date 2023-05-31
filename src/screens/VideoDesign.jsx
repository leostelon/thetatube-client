import { Box, CircularProgress, CssBaseline, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideo, getVideos } from "../database/video";

import styled from "styled-components";
import { styled as muiStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import { hmsConvertor, timeSince } from "../utils/time";
import { getUser } from "../database/user";
import { getShortAddress } from "../utils/addressShort";
import { getWalletAddress } from "../utils/wallet";
import ThetaTubeInterface from "../contracts/ThetaTube.json";
import JoinSubscription from "../components/JoinSubscription";
import TopNavbar from "../components/TopNavbar";
import LeftDrawer from "../components/LeftDrawer";

import prof from "../assets/profileBack.jpg";

import imageNot from "../assets/No-Image-Placeholder.png";
import {
	AiFillDislike,
	AiFillLike,
	AiOutlineDislike,
	AiOutlineEye,
	AiOutlineLike,
} from "react-icons/ai";
import { createLike, getVideoLike, toggleLiked } from "../database/like";

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
	const [loading, setLoading] = useState(true);
	// const [premiumLoading, setPremiumLoading] = useState(false);
	const [video, setVideo] = useState();
	const [creator, setCreator] = useState();
	const [videos, setVideos] = useState([]);
	const [boughtPremium, setBoughtPremium] = useState(false);
	const [totalLiked, setTotalLiked] = useState(0);
	const [userLikes, setUserLiked] = useState(false);
	const currentLoggedUser = localStorage.getItem("address");

	const [joinSubscriptionOpen, setJoinSubscriptionOpen] = useState(false);

	const { videoId } = useParams();

	async function getLikesData() {
		const res = await getVideoLike(videoId, currentLoggedUser);
		setTotalLiked(res.likes);
		setUserLiked(res.userLiked);
	}

	async function handleLike(like) {
		if (currentLoggedUser === "" || currentLoggedUser === undefined) return;
		if (userLikes === undefined) {
			await createLike(like, videoId, currentLoggedUser);
		} else {
			await toggleLiked(userLikes.data.id, like);
		}
		getLikesData();
	}

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
		getLikesData();
	}

	// Check if token already exist's
	async function checkPremiumBought() {
		try {
			if (!creator || !creator.premiumContractAddress) return;
			const currentAddress = await getWalletAddress();
			if (!currentAddress) return;

			const contract = new window.web3.eth.Contract(
				ThetaTubeInterface.abi,
				creator.premiumContractAddress
			);
			const balance = await contract.methods.balanceOf(currentAddress).call();
			if (parseInt(balance) > 0) setBoughtPremium(true);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getVideoFromId(videoId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoId]);

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
				{loading ? (
					<CircularProgress />
				) : (
					video && (
						<ViewGridContainer>
							<VideoContainerBox>
								<VideoContainer>
									<iframe
										// src={`https://player.thetavideoapi.com/video/video_1nt5wshd78vsar73tt51awcdkg`}
										src={`https://player.thetavideoapi.com/video/${videoId}`}
										border="0"
										width="100%"
										height="100%"
										allowFullScreen
										// className="h-[400px] w-[100%]"
										title={videoId}
										style={{ borderRadius: "20px" }}
									/>
								</VideoContainer>

								<VideoTitleModule
									title={video.name && video.name}
									views={video.views && video.views}
									ago={
										video.timestamp && `${timeSince(new Date(video.timestamp))}`
									}
									totalLiked={totalLiked}
									handleLike={handleLike}
								/>

								<VideoGridContainer
									style={{
										position: "relative",
									}}
								>
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
											{creator?.id && getShortAddress(creator.id)}
											{/* owner */}
										</VideoOwner>
										<VideoOwnerSubs>22.7 M Subscribers</VideoOwnerSubs>
									</VideoDetails>
									<ColorButton
										variant="contained"
										onClick={() => setJoinSubscriptionOpen(true)}
										style={{
											position: "absolute",
											right: 0,
										}}
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
								</VideoGridContainer>
								<VideoDescription>
									{video.description && video.description}
								</VideoDescription>
							</VideoContainerBox>
							<RecommendedContainer>
								{videos?.length > 0 &&
									videos.map(({ data: v }) => (
										<RecommendedBox key={v.id}>
											<RecommendedThumnail
												style={{
													backgroundImage: v.thumbnail
														? `url("${v.thumbnail}")`
														: `url(${imageNot})`,
												}}
											>
												{v.length !== null && (
													<RecommendedTime>
														{hmsConvertor(Math.round(v.length))}
													</RecommendedTime>
												)}
											</RecommendedThumnail>
											<RecommendedDetailContainer>
												<RecommendedTitle>{v.name && v.name}</RecommendedTitle>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
													}}
												>
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
														{v.creator?.id && getShortAddress(v.creator.id)}
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

const VideoTitleModule = ({
	title,
	views,
	ago,
	totalLiked,
	userLikes,
	handleLike,
}) => {
	return (
		<VideoTitleBox>
			{/* {video.name && video.name} */}
			<VideoTitle> {title}</VideoTitle>
			<VideoOwnerSubs>
				{/* {video.views && `${video.views} views`}  */} {views} views
				<RecommendedSmallSpan>
					{/* {video.timestamp &&
                        `${timeSince(new Date(video.timestamp))} ago`} */}
					{ago} ago
				</RecommendedSmallSpan>
			</VideoOwnerSubs>
			<LikesBox>
				{/* <LikesIconBox> */}
				<IconButton onClick={() => handleLike(true)}>
					{userLikes === undefined ? (
						<AiOutlineLike style={{ width: "22px", height: "22px" }} />
					) : userLikes?.data?.liked ? (
						<AiFillLike style={{ width: "22px", height: "22px" }} />
					) : (
						<AiOutlineLike style={{ width: "22px", height: "22px" }} />
					)}
				</IconButton>

				{/* </LikesIconBox> */}
				<Box sx={{ mr: 2 }}>{totalLiked}</Box>

				{/* <DislikesIconBox> */}
				<IconButton onClick={() => handleLike(false)}>
					{userLikes === undefined ? (
						<AiOutlineDislike
							style={{
								width: "22px",
								height: "22px",
								color: "grey",
							}}
						/>
					) : !userLikes?.data?.liked ? (
						<AiFillDislike
							style={{
								width: "22px",
								height: "22px",
								color: "grey",
							}}
						/>
					) : (
						<AiOutlineDislike
							style={{
								width: "22px",
								height: "22px",
								color: "grey",
							}}
						/>
					)}
				</IconButton>
			</LikesBox>
		</VideoTitleBox>
	);
};

const ViewGridContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

// * video

const VideoContainerBox = styled.div`
	flex-grow: 1;

	min-width: 50vw;
	margin-bottom: 20px;
	padding-right: 30px;
`;

const VideoContainer = styled.div`
	width: 100%;
	aspect-ratio: 16 / 9;
	margin-bottom: 10px;

	cursor: pointer;
`;
const VideoTitleBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
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

	/* padding-right: 30px; */
`;

const LikesBox = styled.div`
	display: flex;
	align-items: center;
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
	/* flex: 1;
	flex-basis: 1e-9px; */
	display: flexbox;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

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

	width: 100%;

	background-color: #414141;
	padding: 10px;
	border-radius: 10px;

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
	/* box-sizing: border-box; */

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

	padding: 8px 0;

	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
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
	font-size: 11px;
	font-weight: 400;

	width: 40px;
	margin: 10px;
	padding: 2px 5px;

	border-radius: 4px;
	background-color: #1f1f1f;
`;
