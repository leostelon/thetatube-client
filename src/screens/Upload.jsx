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
import TopNavbar from "../components/TopNavbar";
import LeftDrawer from "../components/LeftDrawer";
import { toast } from "react-toastify";
import { RiImageEditLine } from "react-icons/ri";

import { uploadVideo } from "../api/video";

export function Upload() {
	return (
		<Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<TopNavbar />
				<UploadBox />
			</Box>
		</Box>
	);
}
const UploadBox = () => {
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
			console.log("duration ====", video.duration);
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

		toast("Successfully uploaded your dataset", { type: "success" });
		setUploadLoading(false);
	}

	return (
		<Box
			sx={{
				p: 3,
				// display: "flex",/
				// flexDirection: "column",
				// alignItems: "center",
				// justifyContent: "center",
				// minWidth: "300px",
			}}
		>
			<h1>Upload</h1>
			<Box>Add your video and upload and post it in the theata network</Box>
			<Box sx={{ display: "flex", mt: 3, flexWrap: "wrap" }}>
				<Box sx={{ mt: 1, mr: 2 }}>
					<h4>Thumbnail Preview :</h4>

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
									toast("Please select a file with type image!");
								else setThumbnailFile(e.target.files[0]);
							}}
						>
							<input type="file" hidden />

							<FileUploadContainer />
						</Button>
					)}
				</Box>
				<Box style={{ minWidth: "30%" }}>
					<h4>Details :</h4>

					<Box
						sx={{
							mt: 1,
						}}
					>
						<TextField
							label="Title"
							size="small"
							variant="outlined"
							sx={{ p: 0, my: 1 }}
							fullWidth
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</Box>
					<Box>
						<TextField
							multiline
							minRows={3}
							maxRows={4}
							label="Description"
							size="small"
							variant="outlined"
							fullWidth
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
						/>
					</Box>
					<Box>
						<Button variant="contained" component="label" sx={{ m: 1 }}>
							{file ? "Change Video" : "Select Video"}
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
						<Box>
							<Checkbox checked={checked} onChange={handleCheckChange} />
							Enable only premium user's to watch
						</Box>
						<ColorButton
							variant="contained"
							color={"secondary"}
							sx={{ m: 1 }}
							onClick={uploadFile}
						>
							{uploadLoading ? (
								<CircularProgress size={14} sx={{ color: "white" }} />
							) : (
								"Upload Video"
							)}
						</ColorButton>
					</Box>
				</Box>
				{videoFilePreview && (
					<Box sx={{ ml: 2 }}>
						<h4>Video Preview :</h4>

						<Box sx={{ width: "360px", height: "240px", mt: 1.5 }}>
							<iframe
								src={videoFilePreview}
								style={{ height: "100%", width: "100%", borderRadius: "10px" }}
								autoPlay
								title="video-preview"
							/>
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
};

const FileUploadContainer = (props) => {
	return (
		<Box
			sx={{
				border: "2px dashed ",
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
	"&:hover": {
		backgroundColor: "#d2a033",
	},
	marginRight: "8px",
}));
