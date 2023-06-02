import "./search.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { InputBase, Paper } from "@mui/material";
import { Box } from "@mui/system";

export function SearchComponent() {
	const navigate = useNavigate();

	let [searchParams, setSearchParams] = useSearchParams();
	const { pathname } = useLocation();

	const query = searchParams.get("query");

	const handleKeyDown = (event) => {
		const value = event.target.value;
		if (event.key === "Enter" && value !== "") {
			setSearchParams({ query: value });
		}
	};

	const searchInput = useCallback(
		(element) => (element ? element.focus() : null),
		[]
	);

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
					inputProps={{ "aria-label": "search", ref: searchInput }}
					value={query ? query : ""}
					onChange={(e) => {
						// setInput(e.target.value);
						if (pathname !== "browse") {
							return navigate(`/browse?&query=${e.target.value}`);
						}
						setSearchParams({ query: e.target.value });
					}}
				/>
			</Paper>
		</div>
	);
}
