import "../styles/JoinSubscription.css";
import { Box, CircularProgress, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getWalletAddress, switchChain } from "../utils/wallet";
import ThetaTubeInterface from "../contracts/ThetaTube.json";
import Web3 from "web3";
import { toast } from "react-toastify";

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
			if (!window.web3?.eth?.Contract || !creator.premiumContractAddress)
				return;
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

		await contract.methods
			.safeMint()
			.send(transferDetails)
			.on("receipt", async function () {
				setPremiumLoading(false);
				toast("Bought Premium subscription!", { type: "success" });
                await new Promise((res, rej) => {
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				});
			});
		setPremiumLoading(false);
		handleClose();
	}
	return (
		<div>
			<Dialog open={open} minWidth="md" onClose={handleClose}>
				<Box
					sx={{
						backgroundColor: "#2a2a2a",
						padding: "12px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						px: 8,
					}}
				>
					<h2 style={{ fontSize: "24px", fontWeight: "500" }}>Premium🦋</h2>
					<br />
					<Box
						sx={{ display: "flex", flexDirection: "column", fontWeight: "500" }}
					>
						<p style={{ marginBottom: "6px" }}>
							✅&nbsp; Unlimited content from creator
						</p>
						<p style={{ marginBottom: "6px" }}>
							✅&nbsp; Access to special features
						</p>
						<p style={{ marginBottom: "6px" }}>✅&nbsp; One time payment</p>
						<p style={{ marginBottom: "6px" }}>✅&nbsp; Free forever </p>
					</Box>
					<br />
					<h1 style={{ fontSize: "38px" }}>
						{transferDetails?.value
							? Web3.utils.fromWei(transferDetails.value)
							: "..."}
						&nbsp;TFUEL<span style={{ fontSize: "12px" }}> /forever</span>
					</h1>
					<Box
						sx={{
							cursor: "pointer",
							color: "white",
							width: "fit-content",
							fontWeight: "600",
							minWidth: "100px",
							display: "flex",
							justifyContent: "center",
						}}
						onClick={joinPremium}
						className="buy-now"
					>
						{premiumLoading ? (
							<CircularProgress size={14} sx={{ color: "white" }} />
						) : (
							"Join Premium"
						)}
					</Box>
				</Box>
			</Dialog>
		</div>
	);
}
