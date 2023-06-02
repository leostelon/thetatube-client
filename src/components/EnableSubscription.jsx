import React, { useEffect, useState } from "react";
import ThetaTubeFactoryInterface from "../contracts/ThetaTubeFactory.json";
import { getWalletAddress, switchChain } from "../utils/wallet";
import { CONTRACT_ADDRESS } from "../constants";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	FormControl,
	TextField,
} from "@mui/material";
import { enableSubscription } from "../database/user";
import { toast } from "react-toastify";
import Web3 from "web3";

export const EnableSubscription = ({ isOpen, handleExternalClose }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const [tokenName, setTokenName] = useState("");
	const [tokenSymbol, setTokenSymbol] = useState("");
	const [tokenPrice, setTokenPrice] = useState(0);

	async function createSubscription() {
		if (tokenName === "" || tokenSymbol === "" || tokenPrice === 0)
			return toast("Please fill all the fields", { type: "info" });
		if (loading) return;

		setLoading(true);
		await switchChain();
		const contract = new window.web3.eth.Contract(
			ThetaTubeFactoryInterface.abi,
			CONTRACT_ADDRESS
		);
		const currentAddress = await getWalletAddress();
		const weiPrice = Web3.utils.toWei(tokenPrice);

		// Gas Calculation
		const gasPrice = await window.web3.eth.getGasPrice();
		const gas = await contract.methods
			.createToken(tokenName, tokenSymbol, weiPrice, currentAddress) // change 2 to price taken from field
			.estimateGas({
				from: currentAddress,
			});

		await contract.methods
			.createToken(tokenName, tokenSymbol, weiPrice, currentAddress) // change 2 to price taken from field
			.send({ from: currentAddress, gasPrice, gas })
			.on("transactionHash", function (hash) {
				// setStatus(3);
			})
			.on("receipt", async function (receipt) {
				// Get token address
				const nftAddress = await contract.methods
					.ownerToAddress(currentAddress)
					.call();

				await enableSubscription(nftAddress);
				setLoading(false);
				toast("Premium subscription eneabled!", { type: "success" });
				await new Promise((res, rej) => {
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				});
			});
	}

	const handleClose = () => {
		setOpen(false);
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	useEffect(() => {
		if (isOpen) {
			setOpen(isOpen);
		}
	}, [isOpen]);

	return (
		<Dialog open={open} maxWidth="xs" onClose={handleClose}>
			<Box
				sx={{
					p: 2,
					textAlign: "center",
					width: "100%",
					backgroundColor: "#1e1e1e",
					color: "white",
					maxWidth: "350px",
				}}
			>
				<Box>
					<h2>Create subscription NFT</h2>
					<Box sx={{ bgColor: "white" }}>
						<FormControl fullWidth sx={{ mt: 2 }}>
							<TextField
								id="tokenName"
								label="Token Name"
								variant="outlined"
								value={tokenName}
								onChange={(e) => {
									setTokenName(e.target.value);
								}}
								size="small"
							/>
						</FormControl>

						<FormControl fullWidth sx={{ mt: 2 }}>
							<TextField
								id="tokenSymbol"
								label="Token Symbol"
								variant="outlined"
								value={tokenSymbol}
								onChange={(e) => {
									setTokenSymbol(e.target.value);
								}}
								size="small"
							/>
						</FormControl>

						<FormControl fullWidth sx={{ mt: 2 }}>
							<TextField
								id="tokenPrice"
								label="Token Price"
								type="number"
								variant="outlined"
								value={tokenPrice}
								onChange={(e) => {
									if (parseInt(e.target.value) <= 0) return;
									setTokenPrice(e.target.value);
								}}
								size="small"
							/>
						</FormControl>
					</Box>
					<Box>
						<Button
							sx={{
								minWidth: "200px",
								mt: 2,
								backgroundColor: "#28E0B9",
								fontWeight: "600",
								cursor: "pointer",
								borderRadius: "8px",
								"&:hover": {
									backgroundColor: "#28E0B9",
								},
							}}
							variant="contained"
							onClick={() => createSubscription()}
						>
							{loading ? (
								<Box p={0}>
									<CircularProgress size={24} sx={{ color: "#161108" }} />
								</Box>
							) : (
								"Create Subscription NFT"
							)}
						</Button>
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
