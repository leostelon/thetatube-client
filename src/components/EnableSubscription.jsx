import React, { useEffect, useState } from "react";
import ThetaTubeFactoryInterface from "../contracts/ThetaTubeFactory.json";
import { getWalletAddress, switchChain } from "../utils/wallet";
import { CONTRACT_ADDRESS } from "../constants";
import { Box, CircularProgress, Dialog } from "@mui/material";
import { enableSubscription } from "../database/user";

export const EnableSubscription = ({ isOpen, handleExternalClose }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

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
			.createToken("token name", "token symbol", 2, currentAddress) // change 2 to price taken from field
			.estimateGas({
				from: currentAddress,
			});

		const resp = await contract.methods
			.createToken("token name", "token symbol", 2, currentAddress) // change 2 to price taken from field
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
					textAlign: "center",
					width: "100%",
					backgroundColor: "#171e25",
					color: "white",
				}}
			>
				<Box>
					<h2>Create Subscription NFT</h2>
					<br />
					<Box
						sx={{
							cursor: "pointer",
							backgroundColor: "#256afe",
							borderRadius: "4px",
							p: 2,
							minWidth: "100px",
						}}
						onClick={() => createSubscription()}
					>
						{loading ? (
							<CircularProgress size={14} sx={{ color: "white" }} />
						) : (
							"Create Subscription NFT"
						)}
					</Box>
				</Box>
			</Box>
		</Dialog>
	);
};
