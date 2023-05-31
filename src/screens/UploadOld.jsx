import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { uploadVideo } from "../api/video";
import { Navbar } from "../components/Navbar";

export const Upload = () => {
	const [file, setFile] = useState();
	const [thumbnailFile, setThumbnailFile] = useState();
	const [name, setName] = useState("Video Name");
	const [description, setDescription] = useState("Video Description");
	const [duration, setDuration] = useState();
	const [loggedInAddress, setLoggedInAddress] = useState();
	const [uploadLoading, setUploadLoading] = useState(false);
	const [checked, setChecked] = useState(false);

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
			return toast("Please enter a name for this dataset.");
		if (!description || description === "")
			return toast("Please enter a description for this dataset.");
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

	useEffect(() => {
		getLoggedAddress();
	}, []);

	function setFileInfo(file) {
		if (file.type !== "video/mp4")
			return toast("Please select a file with type video/mp4!");
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

	console.log(duration);

	return (
		<Box>
			<Navbar />
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: 2,
					width: "100%",
				}}
			>
				<Box
					sx={{
						textAlign: "center",
						border: "2px solid grey",
						borderStyle: "dotted",
						p: 4,
					}}
				>
					<h3
						style={{
							color: "grey",
						}}
					>
						Upload your dataset.😃
					</h3>
					<AiOutlineCloudUpload size={80} />
					<Box
						style={{
							marginBottom: "16px",
						}}
					>
						<Button variant="contained" component="label">
							Upload Video
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
					</Box>
					<Box
						style={{
							marginBottom: "16px",
						}}
					>
						{/* <label>Thumnail :</label>

						<input
							type="file"
							name="file"
							id="file"
							onChange={(e) => {
								if (thumbnailFile["type"].split("/")[0] !== "image")
									toast("Please select a file with type image!");
								else setThumbnailFile(e.target.files[0]);
							}}
						/> */}

						<Button variant="contained" component="label">
							Upload Thumbnail
							<input
								type="file"
								hidden
								onChange={(e) => {

									if (e.target.files[0]?.type?.split("/")[0] !== "image")
										toast("Please select a file with type image!");
									else setThumbnailFile(e.target.files[0]);
								}}
							/>
						</Button>
					</Box>
					<Box sx={{ mt: 1 }}>
						<TextField
							placeholder="Enter dataset name"
							size="small"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							sx={{
								width: "100%",
							}}
							InputProps={{
								style: {
									color: "white",
									border: "1px solid white",
								},
							}}
						/>
						<TextField
							multiline
							rows={4}
							maxRows={4}
							placeholder="Enter description"
							size="small"
							value={description}
							onChange={(e) => {
								setDescription(e.target.value);
							}}
							sx={{
								width: "100%",
								mt: 2,
								mb: 2,
							}}
							InputProps={{
								style: {
									color: "white",
									border: "1px solid white",
								},
							}}
						/>
					</Box>
					<Box>
						<Checkbox checked={checked} onChange={handleCheckChange} />
						Enable only premium user's to watch
					</Box>
					<Box
						style={{
							backgroundColor: "#256afe",
							padding: "6px 16px",
							fontWeight: 500,
							borderRadius: "4px",
							cursor: "pointer",
						}}
						onClick={uploadFile}
					>
						{uploadLoading ? (
							<CircularProgress size={14} sx={{ color: "white" }} />
						) : (
							"Upload File"
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
