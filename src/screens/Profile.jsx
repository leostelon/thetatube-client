import React from "react";
import { Navbar } from "../components/Navbar";
import { Avatar, Box, Button, Divider, Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export default function Profile() {
	return (
		<>
			<Navbar />
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
						<Box sx={{ fontSize: 24 }}>hari prasana</Box>
						<Box sx={{ mt: 1, fontSize: 14 }}>
							@hariprasana1234r5 No subscribers No videos
						</Box>
					</Grid>
				</Grid>
				{/* secondry nav */}
				<>
					<Grid container spacing={2} sx={{ mt: 3, ml: 2 }}>
						<Grid iteam xs={2} md={1} sx={{}}>
							<Button sx={{ color: "gray" }}>Home</Button>
						</Grid>
						{/* <Grid iteam xs={2} md={1} sx={{}}>
              <Button>Home</Button>
            </Grid> */}
					</Grid>
				</>
				<hr style={{ backgroundColor: "gray" }} />
			</Box>

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
				<Button variant="outlined" sx={{ br: 5, mt: 2 }}>
					Upload Video
				</Button>
			</Box>
		</>
	);
}
