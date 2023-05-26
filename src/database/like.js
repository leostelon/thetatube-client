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

export async function toggleLiked(likeId, likeType) {
	try {
		const response = await collectionReference
			.record(likeId)
			.call("toggleLiked", [likeType]);
		return response.data;
	} catch (error) {
		console.log(error.message);
	}
}

export async function getVideoLike(videoId, userAddress) {
	try {
		const likes = await collectionReference
			.where("liked", "==", true)
			.where("videoId", "==", videoId)
			.get();

		const userLikedRes = await collectionReference
			.where("user", "==", userAddress)
			.where("videoId", "==", videoId)
			.limit(1)
			.get();

		return { userLiked: userLikedRes.data[0], likes: likes.data.length };
	} catch (error) {
		console.log(error.message);
	}
}
