import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { getVideo } from "../database/video";

export const Video = () => {
	const [loading, setLoading] = useState(true);
	const [video, setVideo] = useState();
	const { videoId } = useParams();

	async function getVideoFromId(videoId) {
		setLoading(true);
		const response = await getVideo(videoId);
		setVideo(response);
		setLoading(false);
	}

	useEffect(() => {
		getVideoFromId(videoId);
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
						<iframe
							src={`https://player.thetavideoapi.com/video/${video.id}`}
							border="0"
							width="100%"
							height="100%"
							allowFullScreen
							className="h-[400px] w-[100%]"
							title={video.id}
						/>
					)
				)}
			</Box>
		</Box>
	);
};
