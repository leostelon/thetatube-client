import { Grid, Skeleton } from '@mui/material';
import React from 'react'

export const VideosLoading = () => {
  return (
		<Grid container sx={{ width: "100%" }}>
			{Array.from({ length: 10 }).map((_, i) => (
				<Grid
					mobile={12}
					tablet={8}
					laptop={4}
					key={i}
					sx={{ height: "220px", width: "340px", p: 1 }}
				>
					<Skeleton
						variant="rectangular"
						sx={{ borderRadius: "6px", height: "100%", width: "100%" }}
					/>
				</Grid>
			))}
		</Grid>
	);
}
