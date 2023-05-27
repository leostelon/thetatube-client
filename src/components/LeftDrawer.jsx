import "../styles/LeftDrawer.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineCloudUpload, AiOutlineHome } from "react-icons/ai";
import {
	MdLiveTv,
	MdOutlineExplore,
	MdOutlineLogout,
	MdOutlinePersonOutline,
	MdOutlineWorkspacePremium,
} from "react-icons/md";
import Logo from "../assets/logo.png";

const drawerWidth = 260;

const mainList = [
	{ text: "Home", icon: () => <AiOutlineHome />, path: "/" },
	{ text: "Browse", icon: () => <MdOutlineExplore />, path: "/browse" },
	{ text: "Live TV", icon: () => <MdLiveTv />, path: "/live", upcomming: true },
	{ text: "Upload", icon: () => <AiOutlineCloudUpload />, path: "/upload" },
	{
		text: "Premium",
		icon: () => <MdOutlineWorkspacePremium />,
		path: "/premium",
	},
	{ text: "Profile", icon: () => <MdOutlinePersonOutline />, path: "/profile" },
];

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const SmallDivider = () => (
	<Box sx={{ width: "70%", ml: 3 }}>
		<Divider color="grey" />
	</Box>
);

const open = true;
const PrimaryColor = "#28E0B9";

export default function LeftDrawer({ smaller }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);

	function updateIndex(path) {
		switch (path) {
			case "/":
				return setIndex(0);
			case "/explroe":
				return setIndex(1);
			case "/live":
				return setIndex(2);
			case "/upload":
				return setIndex(3);
			case "/profile":
				return setIndex(4);
			case "/premium":
				return setIndex(5);
			default:
				setIndex(0);
		}
	}

	useEffect(() => {
		updateIndex(location.pathname);
	}, [location.pathname]);

	return (
		<Drawer
			variant="permanent"
			open={smaller ? false : open}
			sx={{
				mt: 2,
			}}
		>
			<Box
				sx={{
					background:
						"linear-gradient(145deg, rgb(182 244 146 / 81%)1%, rgb(51 139 147 / 62%)25%,rgba(0,212,255,0) 50%)",
				}}
			>
				<Box
					sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
					// onClick={() => {
					// 	setOpen((s) => !s);
					// }}
				>
					<img height={"40px"} src={Logo} alt="homepage-logo" />
					&nbsp;
					<h2 style={{ paddingTop: "8px" }}>
						Theta
						<span style={{ color: PrimaryColor }}>.TUBE</span>
					</h2>
				</Box>

				<List>
					{mainList.map(({ text, icon, path, upcomming }, i) => (
						<ListItem
							key={text}
							disablePadding
							sx={{
								display: "block",
								"&:hover": {
									background: "rgb(38 38 38 / 35%)",
								},
							}}
							onClick={() => (upcomming ? "" : navigate(path))}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
							>
								<Box
									sx={{
										borderRight: index === i ? `5px solid ${PrimaryColor}` : "",
										borderTopRightRadius: "4px",
										borderBottomRightRadius: "4px",
										mr: "12px",
									}}
								>
									&#8203;
								</Box>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										color: index === i ? PrimaryColor : "white",
										justifyContent: "center",
										fontSize: "24px",
									}}
								>
									{icon()}
								</ListItemIcon>
								<ListItemText
									primary={text}
									sx={{
										opacity: open ? 1 : 0,
										fontFamily: `"Poppins", sans-serif!important`,
									}}
								/>
								<Box sx={{ position: "absolute", right: "20%" }}>
									{upcomming && (
										<span className="premium-tag">coming soon</span>
									)}
								</Box>
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<SmallDivider />
			</Box>

			{/* Down */}
			<Box
				sx={{ mt: 3, position: "absolute", bottom: "30px", left: 0, right: 0 }}
			>
				<List>
					<ListItem
						// key={text}
						disablePadding
						sx={{
							display: "block",
							"&:hover": {
								background: "rgb(38 38 38 / 87%)",
							},
						}}
						// onClick={() => navigate(path)}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
						>
							<Box
								sx={{
									// borderRight: index === i ? `5px solid ${PrimaryColor}` : "",
									borderTopRightRadius: "4px",
									borderBottomRightRadius: "4px",
									mr: "12px",
								}}
							>
								&#8203;
							</Box>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
									fontSize: "24px",
									color: "red",
								}}
							>
								<MdOutlineLogout />
							</ListItemIcon>
							<ListItemText
								primary={"Log Out"}
								sx={{
									opacity: open ? 1 : 0,
									"&:hover": {
										color: "red",
									},
								}}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	);
}
