import { Box, Button, IconButton, styled } from "@mui/material";
import { SearchComponent } from "./search/SearchComponent";
import { MdNotificationsNone, MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connectWalletToSite, getWalletAddress } from "../utils/wallet";
import { createUser } from "../database/user";

export default function TopNavbar() {
	const navigate = useNavigate();
	const [connectedToSite, setConnectedToSite] = useState(false);

	async function connectSite() {
		await connectWalletToSite();
		const address = await getWalletAddress();
		if (address && address !== "") {
			let token = localStorage.getItem("token");
			localStorage.setItem("address", address);
			if (!token || token === "" || token === "undefined") {
				await createUser(address);
			}
			token = localStorage.getItem("token");
			if (token && token !== "" && token !== "undefined") {
				setConnectedToSite(true);
			}
		}
	}

	useEffect(() => {
		connectSite();
	}, []);
	return (
		<NavHolder sx={{ px: 2, pt: 1 }}>
			<Box>
				<SearchComponent />
			</Box>

			<NavRightContainer>
				<IconButton sx={{ color: "white" }}>
					<MdNotificationsNone />
				</IconButton>

				{!connectedToSite ? (
					<Button onClick={connectSite} className="upload-button">
						Connect Wallet
					</Button>
				) : (
					<IconButton
						sx={{ color: "white" }}
						onClick={() => {
							const address = localStorage.getItem("address");
							navigate("/profile/" + address);
						}}
					>
						<MdAccountCircle />
					</IconButton>
				)}
			</NavRightContainer>
		</NavHolder>
	);
}

const NavHolder = styled(Box)({
	width: "100%",
	height: "80px",

	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
});

const NavRightContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
});
