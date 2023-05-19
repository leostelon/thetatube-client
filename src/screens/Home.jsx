import { Box, CircularProgress } from "@mui/material";
import styled from "styled-components";
import "../styles/Home.css";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { getVideos } from "../database/video";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.png";
import { getShortAddress } from "../utils/addressShort";
import { timeSince } from "../utils/time";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	async function fetchVideos() {
		setLoading(true);
		const response = await getVideos();
		setVideos(response);
		setLoading(false);
	}

	useEffect(() => {
		fetchVideos();
	}, []);

	return (
		<Box>
			<Navbar />
			{loading ? (
				<CircularProgress />
			) : (
				<VideoCardHolder>
					{videos.map((vid, i) => {
						let v = vid.data;
						return (
							<VideoCard onClick={() => navigate("/video/" + v.id)} key={i}>
								<CardThumNail>
									<img
										src={
											v.thumbnail && v.thumbnail !== ""
												? v.thumbnail
												: NoImagePlaceholder
										}
										height="100%"
										width="100%"
										alt={v.id}
										style={{ borderRadius: "10px" }}
									/>
								</CardThumNail>

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
						);
					})}
				</VideoCardHolder>
			)}
		</Box>
	);
};

const VideoCardHolder = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
`;

const VideoCard = styled.div`
	/* height: 360px; */
	height: 320px;
	width: 340px;
	/* background-color: black; */

	margin-right: 10px;

	&:hover {
		cursor: pointer;
	}
`;

const CardThumNail = styled.div`
	width: 100%;
	height: 200px;
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

	color: #f1f1f1;
`;

const CardSmall = styled.div`
	font-size: 12px;
	font-weight: 400;

	color: #aaa;
`;
const CardSmallSpan = styled.span`
	:before {
		content: "•";
		margin: 0 4px;
	}
`;
