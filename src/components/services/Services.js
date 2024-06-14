"use client";
import "./Services.css";
import GlobalTopBanner from "../global/GlobalTopBanner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {CardActionArea, Divider, List} from "@mui/material";
import {Link} from "react-router-dom";
import order_img from "../global/order.png";
import history_img from "../global/history.png";
import track_img from "../global/history.png";
import list_img from "../global/list.png";
import logout_img from "../global/logout.png";
import Image from "next/image";

function Services() {
	return (
		<div className="services_everything">
			<div className="services_topbanner">
				<GlobalTopBanner />
			</div>
			<div className="services_midbanner">
				<div className="services_title">
					<div className="services_title_left">New</div>
					<div className="services_title_right"> Order</div>
				</div>
				<div className="services_midbanner_cards">
					{[
						"New Order",
						"Track Order",
						"Order History",
						"Restaurant List",
					].map((text, index) => (
						<Card sx={{maxWidth: 250}} className="services_card">
							<CardActionArea
								component={Link}
								to={"/" + text.toLowerCase().replace(/ /g, "")}
							>
								{index === 0 && (
									<CardMedia
										component="img"
										height="140"
										image={order_img}
										alt="green iguana"
									/>
								)}
								{index === 1 && (
									<Image
										src={track_img}
										alt="track"
										width={"50px"}
										height={"50px"}
									/>
								)}
								<Divider color={"D2A124"} />
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
										Lizards are a widespread group of
										squamate reptiles, with over 6,000
										species, ranging across all continents
										except Antarctica
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}

export default Services;
