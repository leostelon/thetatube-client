import { default as axios } from "axios";
import { THETA_KEY, THETA_SECRET } from "../constants";
import { toast } from "react-toastify";
import { createVideo } from "../database/video";

const VIDEO_URL = "https://api.thetavideoapi.com";

export async function uploadVideo(file, name, description) {
	try {
		const address = localStorage.getItem("address");

		const { presignedURL, uploadId } = await createPresignedUrl();
		await uploadToPresignedUrl(presignedURL, file);
		const transcodedResponse = await transcodeUpload(uploadId);
		const response = await getVideo(transcodedResponse.data.body.videos[0].id);
		console.log(response.data.body.videos);
		const v = response.data.body.videos[0];

		// Upload to polybase
		await createVideo(
			v.id,
			name,
			description,
			address,
			false,
			""
		);
	} catch (error) {
		console.log(error);
		toast(error.message);
	}
}

export async function createPresignedUrl() {
	try {
		console.log(THETA_KEY, THETA_SECRET);
		const response = await axios.post(
			VIDEO_URL + "/upload",
			{},
			{
				headers: {
					"x-tva-sa-id": THETA_KEY,
					"x-tva-sa-secret": THETA_SECRET,
				},
			}
		);
		const data = response.data.body.uploads[0];
		return { presignedURL: data.presigned_url, uploadId: data.id };
	} catch (error) {}
}

export async function uploadToPresignedUrl(presignedURL, file) {
	try {
		const response = await axios({
			url: presignedURL,
			method: "PUT",
			headers: {
				"Content-Type": "application/octet-stream",
			},
			data: file,
		});

		return response;
	} catch (error) {}
}

export async function transcodeUpload(uploadID) {
	try {
		const response = await axios({
			method: "POST",
			url: VIDEO_URL + "/video",
			headers: {
				"x-tva-sa-id": THETA_KEY,
				"x-tva-sa-secret": THETA_SECRET,
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				source_upload_id: uploadID,
				playback_policy: "public",
			}),
		});

		return response;
	} catch (error) {}
}

export async function getVideo(videoId) {
	const response = await axios({
		url: `https://api.thetavideoapi.com/video/${videoId}`,
		method: "GET",
		headers: {
			"x-tva-sa-id": THETA_KEY,
			"x-tva-sa-secret": THETA_SECRET,
		},
	});
	return response;
}
