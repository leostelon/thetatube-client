import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LeftDrawer from "../components/LeftDrawer";
import TopNavbar from "../components/TopNavbar";
import { Button, CircularProgress, IconButton, styled } from "@mui/material";

import { RiImageEditLine } from "react-icons/ri";
import { MdVideoFile } from "react-icons/md";

// import bannerImage from "../assets/profileBack.jpg";
import bannerImage from "../assets/wall3.jpg";
import { purple, teal } from "@mui/material/colors";
import { Home } from "./Home";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateProfilePic } from "../database/user";
import { getShortAddress } from "../utils/addressShort";
import { EnableSubscription } from "../components/EnableSubscription";
import { toast } from "react-toastify";

import noImage from "../assets/No-Image-Placeholder.png";
import { AiOutlineEdit } from "react-icons/ai";
import { UpdateNameDialog } from "../components/UpdateNameDialog";
import { getUserVideos } from "../database/video";

export default function ProfileDesign() {
	const [videos, setVideos] = useState([]);
	const { userAddress } = useParams();

	useEffect(() => {
		const getVideos = async () => {
			if (userAddress) {
				const res = await getUserVideos(userAddress);
				setVideos(res);
			}
		};
		getVideos();
	}, []);
	return (
		<Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<TopNavbar />
				{ProfileBox()}
				<Home videos={videos} />
			</Box>
		</Box>
	);
}

const ProfileBox = () => {
	const [user, setUser] = useState();
	const [userLoading, setUserLoading] = useState(true);
	const { userAddress } = useParams();
	const [subscriptionOpen, setSubscriptionOpen] = useState(false);
	const [enableUserEdit, setEnableUserEdit] = useState(false);
	const navigate = useNavigate();

	function handleTokenDialogClose() {
		setSubscriptionOpen(false);
	}

	async function getUserFromDB(address) {
		setUserLoading(true);
		const response = await getUser(address);
		setUser(response);
		setUserLoading(false);
	}

	useEffect(() => {
		getUserFromDB(userAddress);
	}, [userAddress]);
	return (
		<>
			{userLoading ? (
				<></>
			) : (
				// <CircularProgress />
				<>
					<ProfileBanner>
						<ChangeProfileBanner>
							{/* <IconButtonHolder
								sx={{
									color: "white",
									backgroundColor: "#191C22",
									borderRadius: "5px",
								}}
							>
								<RiImageEditLine />
							</IconButtonHolder>
							<IconButtonHolder>
								<BsCardImage />
							</IconButtonHolder> */}
						</ChangeProfileBanner>
					</ProfileBanner>
					<ProfileDetailsContainer sx={{ px: 3, pt: 2, pb: 3 }}>
						<ProfileDetailsContainerLeft>
							<ProfileImage
								sx={{
									pt: "150px",
									pl: "100px",
									backgroundImage: user.profile_image
										? `url("${user.profile_image}")`
										: `url(${noImage})`,
								}}
							>
								<IconButtonHolder
									sx={{
										color: "white",
										backgroundColor: "#191C22",
										borderRadius: "5px",
									}}
									component="label"
									onChange={async (e) => {
										console.log(e.target.files[0]);
										if (e.target.files[0]?.type?.split("/")[0] !== "image")
											toast("Please select a file with type image!");
										else {
											await updateProfilePic(e.target.files[0]);
											getUserFromDB(userAddress);
										}
									}}
								>
									<RiImageEditLine />
									<input type="file" hidden />
								</IconButtonHolder>
							</ProfileImage>
							<OwnerDetails>
								<h1>{getShortAddress(user.id)}</h1>
								<UpdateNameDialog
									isOpen={enableUserEdit}
									handleExternalClose={() => {
										setEnableUserEdit(false);
									}}
								/>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<h4>{user.username ? `@${user.username}` : "Unnamed"}</h4>

									<IconButton
										onClick={() => {
											setEnableUserEdit(true);
										}}
									>
										<AiOutlineEdit />
									</IconButton>
								</Box>
							</OwnerDetails>
						</ProfileDetailsContainerLeft>
						<ProfileDetailsContainerRight>
							<Box>
								<PurpleColorButton
									variant="contained"
									startIcon={<MdVideoFile />}
									onClick={() => {
										navigate("/upload");
									}}
								>
									Upload New Videos
								</PurpleColorButton>
							</Box>
							<Box sx={{ marginRight: "20px" }}>
								<ColorButton
									variant="contained"
									onClick={() => setSubscriptionOpen(true)}
								>
									Enable subscription
								</ColorButton>
							</Box>
						</ProfileDetailsContainerRight>
						<EnableSubscription
							isOpen={subscriptionOpen}
							handleExternalClose={handleTokenDialogClose}
						/>
					</ProfileDetailsContainer>
				</>
			)}
		</>
	);
};

const ProfileBanner = styled(Box)({
	width: "100%",
	height: "250px",

	backgroundImage: `url(${bannerImage})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "center",
});

const ChangeProfileBanner = styled(Box)({
	paddingTop: "200px",
	paddingRight: "20px",
	width: "100%",

	display: "flex",
	justifyContent: "flex-end",
	alignItems: "center",
});

const IconButtonHolder = styled(IconButton)({
	color: "white",
	backgroundColor: "#191C22",
	borderRadius: "5px",

	width: "40px",
	height: "40px",

	marginRight: "8px",
});

const ProfileDetailsContainer = styled(Box)({
	display: "flex",
	justifyContent: "space-between",

	// height: "100px",
	marginBottom: "10px",
});

const ProfileDetailsContainerLeft = styled(Box)({
	position: "relative",
	display: "flex",
});

const ProfileImage = styled(Box)({
	height: "200px",
	width: "150px",
	borderRadius: "10px",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "center",

	position: "absolute",
	top: "-100px",
});

const OwnerDetails = styled(Box)({
	marginLeft: "160px",
});

const ProfileDetailsContainerRight = styled(Box)({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "flex-end",

	minWidth: "450px",
	minHeight: "80px",
});

const ColorButton = styled(Button)(({ theme }) => ({
	backgroundColor: teal[500],
	"&:hover": {
		backgroundColor: teal[700],
	},

	borderRadius: "10px",
}));

const PurpleColorButton = styled(Button)(({ theme }) => ({
	backgroundColor: purple[800],
	"&:hover": {
		backgroundColor: purple[900],
	},

	borderRadius: "10px",
}));
