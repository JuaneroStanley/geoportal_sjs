"use client";
import "./NewOrder.css";
import GlobalTopBanner from "../global/GlobalTopBanner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";

function NewOrder() {
	return (
		<div className="neworder_everything">
			<div className="neworder_topbanner">
				<GlobalTopBanner />
			</div>
			<div className="neworder_midbanner">
				<div className="neworder_title">
					<div className="neworder_title_left">New</div>
					<div className="neworder_title_right"> Order</div>
				</div>
				<div className="neworder_midbanner_cards">
					<Card sx={{maxWidth: 345}}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="140"
								image="/static/images/cards/contemplative-reptile.jpg"
								alt="green iguana"
							/>
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
								>
									Lizard
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									Lizards are a widespread group of squamate
									reptiles, with over 6,000 species, ranging
									across all continents except Antarctica
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default NewOrder;
