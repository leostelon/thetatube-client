import { Box } from '@mui/material';
import React from 'react'
import NoImagePlaceholder from "../assets/No-Image-Placeholder.png";

export const Thumbnail = ({thumbnail}) => {
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
			}}
			onError={({ currentTarget }) => {
				currentTarget.onerror = null; // prevents looping
				currentTarget.src = NoImagePlaceholder;
			}}
		></Box>
	);
}
