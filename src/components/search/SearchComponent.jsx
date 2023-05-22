import "./search.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { Box } from "@mui/system";

export function SearchComponent() {
	const navigate = useNavigate();
	const [input, setInput] = useState("");

	const handleKeyDown = (event) => {
		const value = event.target.value;
		if (event.key === "Enter" && value !== "") {
			navigate(`/explore?query=${value}`);
		}
	};

	const onSearch = (event) => {
		if (input !== "") {
			navigate(`/explore?query=${input}`);
		}
	};

	return (
		<div>
			{/* <div className="search-container">
				<TbSearch
					onClick={onSearch}
					color="grey"
					cursor={"pointer"}
					size={18}
				/>
				<input
					type="search"
					id="search"
					onKeyDown={handleKeyDown}
					placeholder="Search..."
					value={input}
					onInput={(e) => setInput(e.target.value)}
				/>
			</div> */}

			<Paper
				component="form"
				sx={{
					p: "2px 4px",
					display: "flex",
					alignItems: "center",
					width: 340,
					height: "40px",
				}}
			>
				<Box sx={{ mt: 1 }}>
					<MdSearch style={{ width: "40px", height: "30px" }} />
				</Box>
				{/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search videos ..."
					inputProps={{ "aria-label": "search videos ..." }}
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
			</Paper>
		</div>
	);
}
