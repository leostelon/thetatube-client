const { db } = require(".");

const collectionReference = db.collection("Like");

export async function createLike(liked, videoId, userAddress) {
	try {
		const response = await collectionReference.create([
			liked,
			videoId,
			userAddress,
		]);

		return response;
	} catch (error) {
		console.log(error.message);
	}
}

export async function getLiked(userAddress) {
	try {
		const response = await collectionReference
			.where("user", "==", userAddress)
			.where("liked", "==", true)
			.limit(40)
			.get();

		return response.data;
	} catch (error) {
		console.log(error.message);
	}
}

export async function toggleLiked(likeId) {
	try {
		const response = await collectionReference
			.record(likeId)
			.call("toggleLiked", []);
		return response.data;
	} catch (error) {
		console.log(error.message);
	}
}
