import { Box, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { uploadVideo } from "../api/video";
import { Navbar } from "../components/Navbar";

export const Upload = () => {
	const [file, setFile] = useState();
	const [name, setName] = useState("Video Name");
	const [description, setDescription] = useState("Video Description");
	const [loggedInAddress, setLoggedInAddress] = useState();
	const [uploadLoading, setUploadLoading] = useState(false);

	function getLoggedAddress() {
		const address = localStorage.getItem("address");
		setLoggedInAddress(address);
	}

	async function uploadFile() {
		if (!loggedInAddress)
			return toast("Please connect your wallet.", { type: "info" });
		if (!file) return alert("Please select a file!"); // Enable this, disabled only for testing
		if (!name || name === "")
			return alert("Please enter a name for this dataset.");
		if (!description || description === "")
			return alert("Please enter a description for this dataset.");
		setUploadLoading(true);
		// Upload File here
		// await uploadDataset(file, `${name}:${version}`, description);
		await uploadVideo(file);

		toast("Successfully uploaded your dataset", { type: "success" });
		setUploadLoading(false);
	}

	useEffect(() => {
		getLoggedAddress();
	}, []);

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
						backgroundColor: "#1b1c1d",
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
						<input
							type="file"
							name="file"
							id="file"
							onChange={(e) => setFile(e.target.files[0])}
						/>
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
