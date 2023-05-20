import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import WebIcon from "@mui/icons-material/Web";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import BackupIcon from "@mui/icons-material/Backup";
import PortraitIcon from "@mui/icons-material/Portrait";

const drawerWidth = 240;

const mainList = [
	{ text: "Home", icon: () => <CameraIndoorIcon /> },
	{ text: "Browse", icon: () => <WebIcon /> },
	{ text: "Live TV", icon: () => <OndemandVideoIcon /> },
	{ text: "Upload", icon: () => <BackupIcon /> },
	{ text: "Profile", icon: () => <PortraitIcon /> },
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
		<Divider />
	</Box>
);

const open = true;

export default function LeftDrawer() {
	// const [open, setOpen] = useState(true);
	return (
		<Drawer variant="permanent" open={open}>
			<Box sx={{ pl: 2, pr: 2 }}>
				<Box
					sx={{ p: 2 }}
					// onClick={() => {
					// 	setOpen((s) => !s);
					// }}
				>
					<h2>
						Theta.
						<span style={{ color: "red", fontFamily: "Roboto" }}>TUBE</span>
					</h2>
				</Box>
				<SmallDivider />

				<List>
					{mainList.map(({ text, icon }, index) => (
						<ListItem key={text} disablePadding sx={{ display: "block" }}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{icon()}
								</ListItemIcon>
								<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<SmallDivider />
			</Box>
		</Drawer>
	);
}
