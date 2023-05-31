const { db } = require(".");
const jwt = require("jsonwebtoken");
const { getWalletAddress } = require("../utils/wallet");
const { pinFileToIPFS } = require("../api/nftStorage");

const collectionReference = db.collection("User");

const createToken = async function (address) {
	try {
		const sign = await window.ethereum.request({
			method: "personal_sign",
			params: [address, "Please approve this message."],
		});

		const payload = {
			wallet_address: address,
		};
		const token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET, {
			expiresIn: "60 days",
		});
		console.log("(!@ reaced");
		await collectionReference.record(address).call("updateToken", [token]);

		return token;
	} catch (error) {
		console.log(error.message);
	}
};

const createUser = async function (address) {
	try {
		let user;
		try {
			user = await collectionReference.record(address).get();
		} catch (err) {}

		if (!user) {
			await collectionReference.create([address]);
		}

		const token = await createToken(address);
		localStorage.setItem("token", token);
		return token;
	} catch (error) {
		console.log(error.message);
	}
};

const getUser = async function (address) {
	try {
		let user;
		try {
			user = await collectionReference.record(address).get();
		} catch (err) {}
		return user.data;
	} catch (error) {
		console.log(error.message);
	}
};

const enableSubscription = async function (contractAddress) {
	try {
		const userAddress = await getWalletAddress();
		const response = await collectionReference
			.record(userAddress)
			.call("updatePremium", [contractAddress]);
		return response.data;
	} catch (error) {
		console.log(error.message);
	}
};

const updateProfilePic = async function (file) {
	try {
		// Upload thumbnail
		const imageResponse = await pinFileToIPFS(file);

		const userAddress = await getWalletAddress();
		const response = await collectionReference
			.record(userAddress)
			.call("updateProfileImage", [imageResponse]);
		return response.data;
	} catch (error) {
		console.log(error.message);
	}
};

const updateUsername = async function (username) {
	try {
		const userAddress = await getWalletAddress();
		const response = await collectionReference
			.record(userAddress)
			.call("updateUsername", [username]);
		return response.data;
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	createToken,
	createUser,
	getUser,
	enableSubscription,
	updateProfilePic,
	updateUsername,
};
