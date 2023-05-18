const { db } = require(".");

const collectionReference = db.collection("Video");

export async function createVideo(
	id,
	name,
	description,
	creator,
	drm,
	nft_address
) {
	try {
		const response = await collectionReference.create([
			id,
			name,
			description,
			creator,
			drm,
			nft_address,
		]);

		return response;
	} catch (error) {
		console.log(error.message);
	}
}

export async function getVideos() {
	try {
		const response = await collectionReference
			.sort("timestamp", "desc")
			.limit(40)
			.get();
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
