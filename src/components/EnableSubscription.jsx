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

export const EnableSubscription = ({ isOpen, handleExternalClose }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const [tokenName, setTokenName] = useState();
	const [tokenSymbol, setTokenSymbol] = useState();
	const [tokenPrice, setTokenPrice] = useState();

	async function createSubscription() {
		setLoading(true);
		await switchChain();
		const contract = new window.web3.eth.Contract(
			ThetaTubeFactoryInterface.abi,
			CONTRACT_ADDRESS
		);
		const currentAddress = await getWalletAddress();

		// Gas Calculation
		const gasPrice = await window.web3.eth.getGasPrice();
		const gas = await contract.methods
			.createToken(tokenName, tokenSymbol, tokenPrice, currentAddress) // change 2 to price taken from field
			.estimateGas({
				from: currentAddress,
			});

		const resp = await contract.methods
			.createToken(tokenName, tokenSymbol, tokenPrice, currentAddress) // change 2 to price taken from field
			.send({ from: currentAddress, gasPrice, gas })
			.on("transactionHash", function (hash) {
				// setStatus(3);
			})
			.on("receipt", async function (receipt) {
				await enableSubscription(
					receipt.events.TokenDeployed.returnValues.tokenAddress
				);
				setLoading(false);
				alert("Premium subscription eneabled!");
			});
		console.log(resp);
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
		<Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
			<Box
				sx={{
					p: 2,
					// textAlign: "center",
					width: "100%",
					backgroundColor: "#46505a",
					color: "white",
				}}
			>
				<Box>
					<h2>Create Subscription NFT</h2>
					<br />
					<Box sx={{ bgColor: "white", width: "80%" }}>
						<FormControl fullWidth>
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
								variant="outlined"
								value={tokenPrice}
								onChange={(e) => {
									setTokenPrice(e.target.value);
								}}
								size="small"
							/>
						</FormControl>
					</Box>
					<Box sx={{ textAlign: "right" }}>
						<Button
							sx={{
								// cursor: "pointer",
								// backgroundColor: "#256afe",
								// borderRadius: "4px",
								// p: 2,
								// minWidth: "100px",
								mt: 2,
							}}
							variant="contained"
							onClick={() => createSubscription()}
						>
							{loading ? (
								<CircularProgress size={14} sx={{ color: "white" }} />
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
