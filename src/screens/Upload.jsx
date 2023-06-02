import {
	Box,
	Button,
	CssBaseline,
	IconButton,
	TextField,
	styled,
	CircularProgress,
	Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LeftDrawer from "../components/LeftDrawer";
import { toast } from "react-toastify";
import { RiImageEditLine } from "react-icons/ri";

import { uploadVideo } from "../api/video";
import { useNavigate } from "react-router-dom";

export function Upload() {
	return (
		<Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<UploadBox />
			</Box>
		</Box>
	);
}
const UploadBox = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [duration, setDuration] = useState();

	const [file, setFile] = useState();
	const [thumbnailFile, setThumbnailFile] = useState();
	const [loggedInAddress, setLoggedInAddress] = useState();
	const [uploadLoading, setUploadLoading] = useState(false);

	const [thumbnailFilePreview, setThumbnailFilePreview] = useState();
	const [videoFilePreview, setVideoFilePreview] = useState();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		getLoggedAddress();
	}, []);

	useEffect(() => {
		if (thumbnailFile) {
			const objectUrl = URL.createObjectURL(thumbnailFile);
			setThumbnailFilePreview(objectUrl);

			return () => URL.revokeObjectURL(objectUrl);
		}
	}, [thumbnailFile]);

	useEffect(() => {
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			setVideoFilePreview(objectUrl);

			return () => URL.revokeObjectURL(objectUrl);
		}
	}, [file]);

	function setFileInfo(file) {
		if (file.type !== "video/mp4")
			return toast("Please select a file with type video/mp4!", {
				type: "info",
			});
		var video = document.createElement("video");
		video.preload = "metadata";
		video.onloadedmetadata = function () {
			window.URL.revokeObjectURL(video.src);
			if (video.duration !== null) setDuration(video.duration);
		};

		video.src = URL.createObjectURL(file);

		setFile(file);
	}
	function getLoggedAddress() {
		const address = localStorage.getItem("address");
		setLoggedInAddress(address);
	}
	function handleCheckChange(event) {
		setChecked(event.target.checked);
	}
	async function uploadFile() {
		if (!loggedInAddress)
			return toast("Please connect your wallet.", { type: "info" });
		if (!file) return toast("Please select a file!"); // Enable this, disabled only for testing
		if (!thumbnailFile) return toast("Please add thumbnail!");
		if (!name || name === "")
			return toast("Please enter a name for your video.");
		if (!description || description === "")
			return toast("Please enter a description for your video.");
		if (!duration) return toast("Unable to fetch video duration.");
		setUploadLoading(true);
		// Upload File here
		await uploadVideo(
			file,
			thumbnailFile,
			name,
			description,
			duration,
			checked,
			checked ? loggedInAddress : ""
		);

		toast("Successfully uploaded your video", { type: "success" });
		setUploadLoading(false);
		await new Promise((resolve) => setTimeout(resolve, 3000));
		navigate(`/profile/${loggedInAddress}`);
	}

	return (
		<Box
			sx={{
				p: 3,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				// justifyContent: "center",
				// minWidth: "300px",
			}}
		>
			<h1>Upload</h1>
			<Box>Upload your video's to the Theta Network</Box>
			<Box sx={{ display: "flex", mt: 3, flexWrap: "wrap" }}>
				<Box style={{ minWidth: "30%" }}>
					<Box
						sx={{
							mt: 1,
							mb: "24px",
						}}
					>
						<TextField
							label="Title"
							size="small"
							variant="outlined"
							sx={{ p: 0, my: 1 }}
							InputLabelProps={{
								style: {
									color: "#7e7e7e",
								},
							}}
							fullWidth
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</Box>
					<Box sx={{ mb: "24px" }}>
						<TextField
							multiline
							minRows={3}
							maxRows={4}
							label="Description"
							size="small"
							variant="outlined"
							fullWidth
							InputLabelProps={{
								style: {
									color: "#7e7e7e",
								},
							}}
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</Box>
					<Box display={"flex"}>
						<Box mr="10px">
							{thumbnailFilePreview ? (
								<Box
									sx={{
										width: "360px",
										height: "240px",
										borderRadius: "10px",

										backgroundImage: `url(${thumbnailFilePreview})`,
										backgroundRepeat: "no-repeat",
										backgroundSize: "cover",
										backgroundPosition: "center",

										display: "flex",
										justifyContent: "flex-end",

										mt: 1,
									}}
								>
									<IconButtonHolder
										sx={{ m: 1 }}
										component="label"
										onChange={(e) => {
											if (e.target.files[0]?.type?.split("/")[0] !== "image")
												toast("Please select a file with type image!", {
													type: "info",
												});
											else setThumbnailFile(e.target.files[0]);
										}}
									>
										<RiImageEditLine />
										<input type="file" hidden />
									</IconButtonHolder>
								</Box>
							) : (
								<Button
									component="label"
									onChange={(e) => {
										if (e.target.files[0]?.type?.split("/")[0] !== "image")
											toast("Please select a file with type image!", {
												type: "info",
											});
										else setThumbnailFile(e.target.files[0]);
									}}
									sx={{ paddingLeft: "0px" }}
								>
									<input type="file" hidden />

									<FileUploadContainer />
								</Button>
							)}
						</Box>
						<Box ml="10px">
							{videoFilePreview && (
								<Box>
									<Box sx={{ width: "360px", height: "240px", mt: 0.5 }}>
										<iframe
											src={videoFilePreview}
											style={{
												height: "100%",
												width: "100%",
												borderRadius: "10px",
												border: "1px solid white",
											}}
											autoPlay
											title="video-preview"
										/>
									</Box>
								</Box>
							)}
						</Box>
					</Box>
					<Box>
						<Button
							variant="contained"
							component="label"
							sx={{
								m: 1,
								backgroundColor: "transparent",
								color: "#28E0B9",
								fontWeight: "bold",
								border: "1px solid #28E0B9",
								"&:hover": {
									backgroundColor: "#28E0B9",
									color: "black",
								},
							}}
						>
							{file ? "Change video" : "Select video"}
							<input
								type="file"
								hidden
								onChange={(e) => {
									if (e.target.files[0]?.type !== "video/mp4")
										toast("Please select a file with type video/mp4!");
									else setFileInfo(e.target.files[0]);
								}}
							/>
						</Button>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								backgroundColor: "#28E0B933",
								mt: 2,
								mb: 2,
								borderRadius: "4px",
								p: 1,
								py: 2,
							}}
						>
							<Box sx={{ maxWidth: "50vw" }}>
								<Checkbox
									sx={{
										color: "#28E0B9",
										"&.Mui-checked": {
											color: "#28E0B9",
										},
									}}
									checked={checked}
									onChange={handleCheckChange}
								/>
								Enable only premium user's to watch
							</Box>
							<Box
								sx={{
									textAlign: "start",
									color: "#8d8d8d",
									fontWeight: "500",
									px: 1,
								}}
							>
								✨ Enabling this allows only the users who have purchased your
								subscription NFT.
							</Box>
						</Box>

						<Box
							sx={{
								display: "flex",
								justifyContent: "right",
								width: "100%",
								mb: "36px",
							}}
						>
							<ColorButton
								variant="contained"
								color={"secondary"}
								sx={{
									p: 1.5,
									fontWeight: "bold",
									fontSize: "16px",
									backgroundColor: "#28E0B9",
									"&:hover": {
										backgroundColor: "#28E0B9",
									},
									width: "100%",
									textAlign: "right",
								}}
								onClick={uploadFile}
							>
								{uploadLoading ? (
									<CircularProgress size={14} sx={{ color: "white" }} />
								) : (
									"Upload Video🚀"
								)}
							</ColorButton>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const FileUploadContainer = (props) => {
	return (
		<Box
			sx={{
				border: "1.5px dashed darkgrey",
				color: "white",
				borderRadius: "10px",
				width: "360px",
				height: "240px",

				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",

				bgcolor: "#c6c6c61c",
				cursor: "pointer",
			}}
			{...props}
		>
			<h4>Upload Thumbnail</h4>
			<p>Only file type image is accepted</p>
			<input type="file" hidden />
		</Box>
	);
};

const IconButtonHolder = styled(IconButton)({
	color: "white",
	backgroundColor: "#191C22",
	borderRadius: "5px",

	width: "40px",
	height: "40px",

	marginRight: "8px",
});

const ColorButton = styled(Button)(() => ({
	backgroundColor: "#e1b24b",
	fontWeight: "bold",
	"&:hover": {
		backgroundColor: "#d2a033",
	},
}));
