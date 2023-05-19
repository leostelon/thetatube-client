import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Avatar, Box, Button, CircularProgress, Grid } from "@mui/material";
import { useParams } from "react-router";
import { getUser } from "../database/user";
import { getShortAddress } from "../utils/addressShort";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const [user, setUser] = useState();
	const [userLoading, setUserLoading] = useState(true);
	const { userAddress } = useParams();
	const navigate = useNavigate();

	async function getUserFromDB(address) {
		setUserLoading(true);
		const response = await getUser(address);
		setUser(response);
		setUserLoading(false);
	}

	useEffect(() => {
		getUserFromDB(userAddress);
	}, [userAddress]);

	return (
		<Box>
			<Navbar />
			{userLoading ? (
				<CircularProgress />
			) : (
				<Box sx={{ pl: 4 }}>
					<Grid container sx={{ color: "white" }}>
						<Grid iteam>
							<Avatar
								alt="Remy Sharp"
								src="/broken-image.jpg"
								sx={{
									bgcolor: "#f45966",
									height: "100px",
									width: "100px",
									mr: 3,
								}}
							>
								B
							</Avatar>
						</Grid>
						<Grid
							iteam
							sx={{ pb: 2 }}
							style={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
							}}
						>
							<Box sx={{ fontSize: 24 }}>{getShortAddress(user.id)}</Box>
							<Box sx={{ mt: 1, fontSize: 14 }}>
								@{user.username} 
							</Box>
						</Grid>
					</Grid>
					{/* secondry nav */}
					<Box>
						<Grid container spacing={2} sx={{ mt: 3, ml: 2 }}>
							<Grid iteam xs={2} md={1} sx={{}}>
								<Button sx={{ color: "gray" }}>Home</Button>
							</Grid>
							{/* <Grid iteam xs={2} md={1} sx={{}}>
              <Button>Home</Button>
            </Grid> */}
						</Grid>
					</Box>
					<hr style={{ backgroundColor: "gray" }} />
				</Box>
			)}

			<Box
				style={{
					width: "100%",
					display: "flex",
					//   justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Box
					style={{
						width: "200px",
						height: "200px",
					}}
				>
					<img
						style={{ width: "100%", height: "100%" }}
						src="/images/profile_video_notFound.svg"
						alt=""
						srcset=""
					/>
				</Box>

				<Box sx={{ fontSize: 24 }}>Upload a video to get started</Box>

				<Box
					sx={{
						fontSize: 14,
						mt: 2,
						maxWidth: "480px",
						textAlign: "center",
						color: "gray",
					}}
				>
					Start sharing your story and connecting with viewers. Videos that you
					upload will show up here.
				</Box>
				<Button
					variant="outlined"
					sx={{ br: 5, mt: 2 }}
					onClick={() => navigate("/upload")}
				>
					Upload Video
				</Button>
			</Box>
		</Box>
	);
}
