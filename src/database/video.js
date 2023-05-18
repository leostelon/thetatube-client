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
