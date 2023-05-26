import { Box, IconButton, styled } from "@mui/material";
import { SearchComponent } from "./search/SearchComponent";
import { MdNotificationsNone, MdAccountCircle } from "react-icons/md";

export default function TopNavbar() {
	return (
		<NavHolder sx={{ px: 2, pt: 1 }}>
			<Box>
				<SearchComponent />
			</Box>

			<NavRightContainer>
				<IconButton sx={{ color: "white" }}>
					<MdNotificationsNone />
				</IconButton>
				<IconButton sx={{ color: "white" }}>
					<MdAccountCircle />
				</IconButton>
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
