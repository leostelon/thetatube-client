import { Box } from "@mui/material";
import styled from "styled-components";
import "../styles/Home.css";
import React from "react";
import { Navbar } from "../components/Navbar";

export const Home = () => {
	return (
		<Box>
			<Navbar />
			<VideoCardHolder>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
					<VideoCard>
						<CardThumNail>
							<img
								src="/images/hq720.webp"
								height="100%"
								width="100%"
								alt=""
								style={{ borderRadius: "10px" }}
							/>
						</CardThumNail>

						<CardDetailsContainer>
							<CardProfile>
								<img
									src="/images/profileImg.jpg"
									height="100%"
									width="100%"
									alt=""
									style={{ borderRadius: "50%" }}
								/>
							</CardProfile>
							<CardDetails>
								<CardTitle>I GOT MARRIED ❤️ - Irfan's View</CardTitle>
								<CardSmall>Random Chikibum</CardSmall>
								<CardSmall>
									650K views
									<CardSmallSpan>2 weeks ago</CardSmallSpan>
								</CardSmall>
							</CardDetails>
						</CardDetailsContainer>
					</VideoCard>
				))}
			</VideoCardHolder>
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
