"use client";
import "./NewOrder.css";
import GlobalTopBanner from "../global/GlobalTopBanner";
import Typography from "@mui/material/Typography";
import {
	Avatar,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Rating,
} from "@mui/material";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import {
	MapContainer,
	Marker,
	TileLayer,
	LayersControl,
	GeoJSON,
	Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Head from "next/head";
import Order from "./Order.js";
import L from "leaflet";

let DefaultIcon = L.icon({
	iconUrl: "/restaurant.png",
	iconSize: [50, 50],
	iconAnchor: [30, 10],
});

L.Marker.prototype.options.icon = DefaultIcon;

function NewOrder() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isOrder, setIsOrder] = useState(false);
	const [restaurants, setRestaurants] = useState([]);
	const [mapData, setMapData] = useState([]);
	const mapRef = useRef();

	useEffect(() => {
		console.log("Map component mounted");
		const getData = async () => {
			const response = await fetch(
				"http://localhost:8080/geoserver/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne%3Arestaurants&maxFeatures=50&outputFormat=application%2Fjson"
			);
			const data = await response.json();
			console.log(data.features);
			setMapData(data.features);
		};
		getData();
	}, []);

	useEffect(() => {
		const fetchRestaurants = async () => {
			try {
				const response = await fetch("/api/restaurants");
				const data = await response.json();
				setRestaurants(data);
			} catch (error) {
				console.error("Failed to fetch restaurants", error);
			}
		};
		fetchRestaurants();
	}, []);

	useEffect(() => {
		if (mapRef.current && restaurants.length > 0) {
			const selectedRestaurant = restaurants[selectedIndex];
			const selectedFeature = mapData.find(
				(feature) => feature.properties.name === selectedRestaurant.name
			);
			if (selectedFeature) {
				const [lng, lat] = selectedFeature.geometry.coordinates;
				mapRef.current.setView([lat, lng], 13); // Adjust the zoom level as needed
			}
		}
	}, [selectedIndex, restaurants, mapData]);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	const handleMarkerClick = (index) => {
		setSelectedIndex(index);
	};

	const handleButtonItemClick = (event) => {
		setIsOrder(true);
	};

	const handleBackClick = () => {
		setIsOrder(false);
	};

	return (
		<>
			<Head>
				<title>Nowe zamówienie</title>
			</Head>
			<div className="neworder_everything">
				<div className="neworder_topbanner">
					<GlobalTopBanner />
				</div>
				{!isOrder ? (
					<div className="neworder_midbanner">
						<div className="neworder_map_wrapper">
							<MapContainer
								className="neworder_map"
								center={[52.232222, 21.0]}
								zoom={6}
								ref={mapRef}
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
									<LayersControl.Overlay
										checked
										name="Granice Wojewodztw WFS"
									>
										{mapData && (
											<GeoJSON
												data={{
													type: "FeatureCollection",
													features: mapData,
												}}
											/>
										)}
									</LayersControl.Overlay>
								</LayersControl>
								{mapData &&
									mapData.map((feature, index) => (
										<Marker
											key={index}
											position={[
												feature.geometry.coordinates[1],
												feature.geometry.coordinates[0],
											]}
											icon={DefaultIcon}
											eventHandlers={{
												click: () =>
													handleMarkerClick(index),
											}}
										>
											<Popup>
												<div>
													<h3>
														{
															feature.properties
																.name
														}
													</h3>
													<p>
														{
															feature.properties
																.description
														}
													</p>
												</div>
											</Popup>
										</Marker>
									))}
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
												selected={
													selectedIndex === index
												}
												onClick={(event) =>
													handleListItemClick(
														event,
														index
													)
												}
											>
												<ListItemAvatar>
													<Avatar
														alt={restaurant.name}
														sx={{bgcolor: "white"}}
													>
														<Image
															src={
																restaurant.image
															}
															alt={
																restaurant.name
															}
															fill
															style={{
																objectFit:
																	"contain",
															}}
															sizes="300px"
														/>
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={restaurant.name}
													secondary={
														<React.Fragment>
															<Typography
																sx={{
																	display:
																		"inline",
																}}
																component="span"
																variant="body2"
																color="text.primary"
															>
																{
																	restaurant.description
																}
																<Rating
																	name="read-only"
																	value={
																		restaurant.rating
																	}
																	precision={
																		0.1
																	}
																	readOnly={
																		true
																	}
																/>{" "}
															</Typography>
															<Typography component="span">
																{restaurant.description +
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
								onClick={(event) =>
									handleButtonItemClick(event)
								}
							>
								Zamów
							</Button>
						</div>
					</div>
				) : (
					<Order
						restaurantId={restaurants[selectedIndex].id}
						onBackClick={handleBackClick}
						menuId={restaurants[selectedIndex].menu_id}
					/>
				)}
			</div>
		</>
	);
}

export default NewOrder;
