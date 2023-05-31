import { Box, Button, CircularProgress, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getWalletAddress, switchChain } from "../utils/wallet";
import ThetaTubeInterface from "../contracts/ThetaTube.json";

export default function JoinSubscription({
	isOpen,
	handleExternalClose,
	creator,
}) {
	const [open, setOpen] = useState(false);
	const [premiumLoading, setPremiumLoading] = useState(false);
	const [transferDetails, setTransferDetails] = useState();
	const [contract, setContract] = useState();

	const handleClose = () => {
		setOpen(false);
		if (handleExternalClose) {
			handleExternalClose();
		}
	};

	useEffect(() => {
		if (isOpen) {
			if (!creator.premium)
				return alert("user has not enabled premium content!");
			else setOpen(isOpen);
		}
	}, [isOpen, creator]);

	useEffect(() => {
		const getInitialDetails = async () => {
			if (!window.web3?.eth?.Contract) return;
			const contract = new window.web3.eth.Contract(
				ThetaTubeInterface.abi,
				creator.premiumContractAddress
			);
			setContract(contract);
			const currentAddress = await getWalletAddress();

			// Get price
			const price = await contract.methods.price().call({});

			// Gas Calculation
			const gasPrice = await window.web3.eth.getGasPrice();
			const gas = await contract.methods.safeMint().estimateGas({
				from: currentAddress,
				value: price,
			});
			setTransferDetails({
				gasPrice,
				gas,
				from: currentAddress,
				value: price,
			});
		};

		getInitialDetails();
	}, [isOpen, creator]);

	async function joinPremium() {
		if (!transferDetails) return alert("Try Again!");
		setPremiumLoading(true);

		// ? copied to useEffect getInitialDetails

		await switchChain();

		const resp = await contract.methods
			.safeMint()
			.send(transferDetails)
			.on("receipt", async function (receipt) {
				// await enableSubscription(
				// 	receipt.events.TokenDeployed.returnValues.tokenAddress
				// );
				setPremiumLoading(false);
				alert("Bought Premium subscription!");
			});
		console.log(resp);
		setPremiumLoading(false);
		handleClose();
	}
	return (
		<div>
			<Dialog open={open} maxWidth="xs" onClose={handleClose}>
				<Box
					sx={{
						p: 2,
						// textAlign: "center",
						// width: "100%",
						backgroundColor: "#46505a",
						color: "white",
					}}
				>
					<Box>
						<h2>Join Premium Details :</h2>
						<br />
						<h3>
							Price :{" "}
							{transferDetails?.value
								? transferDetails.value
								: "fetching price ..."}
						</h3>
						<Box sx={{ textAlign: "right" }}>
							<Button
								sx={{
									mt: 2,
								}}
								variant="contained"
								onClick={() => joinPremium()}
							>
								{premiumLoading ? (
									<CircularProgress size={14} sx={{ color: "white" }} />
								) : (
									"Join Premium Subscription "
								)}
							</Button>
						</Box>
					</Box>
				</Box>
			</Dialog>
		</div>
	);
}
