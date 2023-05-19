import axios from "axios";

const baseURL = "https://api.nft.storage";

export async function pinFileToIPFS(file) {
	try {
		if (!file) return;
		const formData = new FormData();
		formData.append("file", file);
		const ipfsFile = await axios.post(baseURL + "/upload", formData, {
			headers: {
				"Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
				Authorization: `Bearer ${process.env.REACT_APP_NFTSTORAGE_KEY}`,
			},
		});
		const data = ipfsFile.data.value;
		const assetUrl = `${process.env.REACT_APP_IPFS_BASE_URL}/${data.cid}/${data.files[0].name}`;
		return assetUrl;
	} catch (error) {
		console.log(error);
	}
}
