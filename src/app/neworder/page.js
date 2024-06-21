"use client";
import "./NewOrder.css";
import GlobalTopBanner from "../global/GlobalTopBanner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
	Avatar,
	Button,
	CardActionArea,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Rating,
} from "@mui/material";
import OrderBrowse from "./OrderBrowse";
import React, {useMemo} from "react";

import Image from "next/image";
import {restaurants} from "../global/data";
import dynamic from "next/dynamic";
import {MapContainer, Marker, TileLayer, LayersControl} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const isOrder = false;
function NewOrder() {
	const Map = useMemo(
		() =>
			dynamic(() => import("./Map"), {
				loading: () => <p>A map is loading</p>,
				ssr: false,
			}),
		[]
	);

	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};
	return (
		<div className="neworder_everything">
			<div className="neworder_topbanner">
				<GlobalTopBanner />
			</div>
			<div className="neworder_midbanner">
				<div className="neworder_map_wrapper">
					<MapContainer
						className="neworder_map"
						center={[52.232222, 21.0]}
						zoom={6}
					>
						<LayersControl>
							<LayersControl.BaseLayer checked name="OSM">
								<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							</LayersControl.BaseLayer>
							<LayersControl.BaseLayer name="GoogleSatelite">
								<TileLayer url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}" />
							</LayersControl.BaseLayer>
							<LayersControl.BaseLayer name="OpenTopoMap">
								<TileLayer url="https://tile.opentopomap.org/{z}/{x}/{y}.png" />
							</LayersControl.BaseLayer>
						</LayersControl>
					</MapContainer>
				</div>
				<div className="neworder_right">
					<div className="neworder_list_wrapper">
						<List
							sx={{
								width: "100%",
								height: "95%",
								bgcolor: "background.secondary",
								overflow: "auto",
							}}
						>
							{restaurants.map((restaurant, index) => (
								<ListItem
									alignItems="flex-start"
									key={restaurant.id}
								>
									<ListItemButton
										selected={selectedIndex === index}
										onClick={(event) =>
											handleListItemClick(event, index)
										}
									>
										<ListItemAvatar>
											<Avatar
												alt={restaurant.name}
												sx={{bgcolor: "white"}}
											>
												<Image
													src={restaurant.image}
													alt={restaurant.name}
													layout="fill"
													objectFit="contain"
												/>
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={restaurant.name}
											secondary={
												<React.Fragment>
													<Typography
														sx={{display: "inline"}}
														component="span"
														variant="body2"
														color="text.primary"
													>
														{restaurant.description}
														<Rating
															name="read-only"
															value={
																restaurant.rating
															}
															precision={0.1}
															readOnly={true}
														/>{" "}
													</Typography>
													<Typography>
														{restaurant.desctiption +
															" — " +
															restaurant.address}
													</Typography>
												</React.Fragment>
											}
										/>
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</div>
					<Button
						className="neworder_button"
						variant="contained"
						color="primary"
						style={{fontSize: "26px"}}
						//onClick={(event) => handleListItemClick(event, -1)}
					>
						Zamów
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NewOrder;
