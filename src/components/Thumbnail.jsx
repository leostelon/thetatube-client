import { Box } from "@mui/material";
import React from "react";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.png";
import { hmsConvertor } from "../utils/time";
import styled from "styled-components";

export const Thumbnail = ({ thumbnail, length }) => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "200px",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				borderRadius: "6px",
				border: "none",
				backgroundSize: "cover",
				backgroundImage: `url("${
					thumbnail && thumbnail !== "" ? thumbnail : NoImagePlaceholder
				}")`,

				position: "relative",
			}}
			onError={({ currentTarget }) => {
				currentTarget.onerror = null; // prevents looping
				currentTarget.src = NoImagePlaceholder;
			}}
		>
			{length !== null && (
				<RecommendedTime>{hmsConvertor(Math.round(length))}</RecommendedTime>
			)}
		</Box>
	);
};

const RecommendedTime = styled.div`
	font-size: 11px;
	font-weight: 400;

	width: 40px;
	/* margin: 10px; */
	padding: 2px 5px;

	border-radius: 4px;
	background-color: #1f1f1f;

	position: absolute;

	bottom: 6px;
	right: 6px;
`;
