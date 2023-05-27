import "./search.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { InputBase, Paper } from "@mui/material";
import { Box } from "@mui/system";

export function SearchComponent() {
	const navigate = useNavigate();
	const [input, setInput] = useState("");

	const handleKeyDown = (event) => {
		const value = event.target.value;
		if (event.key === "Enter" && value !== "") {
			navigate(`/browse?&query=${value}`);
		}
	};

	return (
		<div>
			<Paper
				component="form"
				sx={{
					p: "2px 4px",
					display: "flex",
					alignItems: "center",
					width: 340,
					height: "40px",
					borderRadius: "14px",
				}}
			>
				<Box sx={{ mt: 0.7 }}>
					<MdSearch style={{ width: "40px", height: "24px" }} />
				</Box>
				{/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
				<InputBase
					sx={{ ml: 0.5, flex: 1, fontSize: "14px" }}
					placeholder="Search"
					inputProps={{ "aria-label": "search" }}
					value={input}
					onInput={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
			</Paper>
		</div>
	);
}
