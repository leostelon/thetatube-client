import { getUser } from "./user";

const { db } = require(".");

const collectionReference = db.collection("Video");

export async function createVideo(
	id,
	name,
	description,
	creator,
	drm,
	nft_address,
	thumbnail,
	duration
) {
	try {
		const response = await collectionReference.create([
			id,
			name,
			description,
			creator,
			duration,
			drm,
			nft_address,
			thumbnail,
		]);

		return response;
	} catch (error) {
		console.log(error.message);
	}
}

export async function getVideos() {
	try {
		const response = await collectionReference
			.where("drm", "==", false)
			.sort("timestamp", "desc")
			.limit(100)
			.get();
		for (const video of response.data) {
			if (video.data.creator.id !== "") {
				const creator = await getUser(video.data.creator.id);
				video.data.creator = creator;
			}
		}

		return response.data;
	} catch (error) {
		console.log(error.message);
	}
}

export async function getVideo(videoId) {
	try {
		const response = await collectionReference.record(videoId).get();
		await collectionReference.record(videoId).call("incrementView", []);
		return response.data;
	} catch (error) {
		console.log(error.message);
	}
}

export async function searchVideos(search) {
	try {
		const results = await collectionReference
			.where("name", ">=", search)
			.where("name", "<", `${search}\uFFFF`)
			.get();

		return results.data;
	} catch (error) {
		console.log(error.message);
	}
}

export async function getPremiumVideos() {
	try {
		const results = await collectionReference.where("drm", ">=", true).get();

		return results.data;
	} catch (error) {
		console.log(error.message);
	}
}

export async function getUserVideos(address) {
	try {
		const { data } = await collectionReference.sort("timestamp", "desc").get();
		const filteredRecords = data.filter(
			(record) => record.data.creator?.id === address
		);

		for (const video of filteredRecords) {
			if (video.data.creator.id !== "") {
				const creator = await getUser(video.data.creator.id);
				video.data.creator = creator;
			}
		}
		return filteredRecords;
	} catch (error) {
		console.log(error.message);
	}
}
