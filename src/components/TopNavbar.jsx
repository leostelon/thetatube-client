import { Box, IconButton, styled } from "@mui/material";
import { SearchComponent } from "./search/SearchComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function TopNavbar() {
	return (
		<NavHolder sx={{ px: 2 }}>
			<Box>
				<SearchComponent />
			</Box>

			<NavRightContainer>
				<IconButton sx={{ color: "white" }}>
					<NotificationsIcon />
				</IconButton>
				<IconButton sx={{ color: "white" }}>
					<AccountCircleIcon />
				</IconButton>
			</NavRightContainer>
		</NavHolder>
	);
}

const NavHolder = styled(Box)({
	width: "100%",
	height: "60px",

	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
});

const NavRightContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
});
