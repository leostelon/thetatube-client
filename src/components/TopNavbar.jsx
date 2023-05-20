import { Box, IconButton, styled } from "@mui/material";
import { SearchComponent } from "./search/SearchComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function TopNavbar() {
	return (
		<NavHolder sx={{ px: 3 }}>
			<Box>
				<SearchComponent />
			</Box>

			<NavRightContainer>
				<IconButton sx={{ color: "#4a4a4a" }}>
					<NotificationsIcon />
				</IconButton>
				<IconButton sx={{ color: "#4a4a4a" }}>
					<AccountCircleIcon />
				</IconButton>
			</NavRightContainer>
		</NavHolder>
	);
}

const NavHolder = styled(Box)({
	width: "100%",
	height: "70px",

	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
});

const NavRightContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
});
