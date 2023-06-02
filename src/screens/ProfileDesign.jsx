import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LeftDrawer from "../components/LeftDrawer";
import TopNavbar from "../components/TopNavbar";
import { Button, IconButton, Skeleton, styled } from "@mui/material";

import { RiImageEditLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi";

import bannerImage from "../assets/wall3.jpg";
import { Home } from "./Home";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateProfilePic } from "../database/user";
import { getShortAddress } from "../utils/addressShort";
import { EnableSubscription } from "../components/EnableSubscription";
import { toast } from "react-toastify";

import noImage from "../assets/No-Image-Placeholder.png";
import { AiOutlineCloudUpload, AiOutlineEdit } from "react-icons/ai";
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
	}, [userAddress]);
	return (
		<Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
			<CssBaseline />
			<LeftDrawer />
			<Box component="main" sx={{ flexGrow: 1 }}>
				<TopNavbar />
				{ProfileBox()}
				{videos?.length > 0 && <Home videos={videos} />}
				{videos?.length === 0 && (
					<Box sx={{ display: "flex", justifyContent: "center", pr: 8 }}>
						<Box sx={{ height: "200px", width: "200px", cursor: "pointer" }}>
							<img
								style={{ width: "100%", height: "100%" }}
								src="/images/zerp2.svg"
								alt=""
								srcSet=""
							/>
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	);
}

const ProfileBox = () => {
	const [user, setUser] = useState();
	const [userLoading, setUserLoading] = useState(true);
	const [profileImageLoading, setProfileImageLoading] = useState(false);
	const { userAddress } = useParams();
	const [subscriptionOpen, setSubscriptionOpen] = useState(false);
	const [enableUserEdit, setEnableUserEdit] = useState(false);
	const navigate = useNavigate();

	const [isUserProfile, setIsUserProfile] = useState(false);
	useEffect(() => {
		const checkUserProfile = async () => {
			const loggedinaddress = localStorage.getItem("address");
			if (loggedinaddress === userAddress) {
				setIsUserProfile(true);
			}
		};
		checkUserProfile();
	}, [userAddress]);

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

	const updateProfileImage = async (e) => {
		if (e.target.files[0]?.type?.split("/")[0] !== "image")
			toast("Please select a file with type image!");
		else {
			setProfileImageLoading(true);
			await updateProfilePic(e.target.files[0]);
			getUserFromDB(userAddress);
			setProfileImageLoading(false);
		}
	};
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
							{profileImageLoading ? (
								<Skeleton
									variant="rectangular"
									sx={{
										borderRadius: "10px",
										pt: "150px",
										pl: "100px",
										height: "200px",
										width: "150px",
										position: "absolute",
										top: "-100px",
									}}
								/>
							) : (
								<ProfileImage
									sx={{
										pt: "150px",
										pl: "100px",
										backgroundImage: user.profile_image
											? `url("${user.profile_image}")`
											: `url(${noImage})`,
									}}
								>
									{isUserProfile && (
										<IconButtonHolder
											sx={{
												color: "white",
												backgroundColor: "#191C22",
												borderRadius: "5px",
											}}
											component="label"
											onChange={updateProfileImage}
										>
											<RiImageEditLine />
											<input type="file" hidden />
										</IconButtonHolder>
									)}
								</ProfileImage>
							)}
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
									{isUserProfile && (
										<IconButton
											onClick={() => {
												setEnableUserEdit(true);
											}}
										>
											<AiOutlineEdit />
										</IconButton>
									)}
								</Box>
							</OwnerDetails>
						</ProfileDetailsContainerLeft>
						<ProfileDetailsContainerRight style={{ paddingRight: "20px" }}>
							{isUserProfile && (
								<Box sx={{ pr: 2 }}>
									<PurpleColorButton
										variant="contained"
										onClick={() => {
											navigate("/upload");
										}}
									>
										<AiOutlineCloudUpload
											size={20}
											style={{ marginRight: "4px" }}
										/>
										Upload New Videos
									</PurpleColorButton>
								</Box>
							)}
							{isUserProfile && !user.premium && (
								<Box sx={{ pr: 2 }}>
									<ColorButton
										variant="contained"
										onClick={() => setSubscriptionOpen(true)}
									>
										<HiOutlineSparkles
											size={20}
											style={{ marginRight: "4px" }}
										/>
										Enable subscription
									</ColorButton>
								</Box>
							)}
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
	justifyContent: "flex-end",
	alignItems: "flex-end",
	flexWrap: "wrap",
	minWidth: "450px",
	minHeight: "80px",
});

const ColorButton = styled(Button)(({ theme }) => ({
	whiteSpace: "nowrap",
	backgroundColor: "#28E0B9",
	fontWeight: "600",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#28E0B9",
	},
	borderRadius: "8px",
}));

const PurpleColorButton = styled(Button)(({ theme }) => ({
	whiteSpace: "nowrap",
	backgroundColor: "#EFCD80",
	color: "#161108",
	fontWeight: "600",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#EFCD80",
	},
	borderRadius: "8px",
}));
