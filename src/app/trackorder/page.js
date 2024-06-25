"use client";
import React, {useEffect, useState, useRef} from "react";
import GlobalTopBanner from "../global/GlobalTopBanner";
import {
	MapContainer,
	TileLayer,
	LayersControl,
	Marker,
	Popup,
} from "react-leaflet";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Box,
	Typography,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import "./TrackOrder.css";
import {
	fetchActiveOrders,
	fetchRestaurantById,
	fetchMenu,
	calculateTotalFromCart,
} from "@/utils/ApiUtils";
import L from "leaflet";

let DefaultIcon = L.icon({
	iconUrl: "/restaurant.png",
	iconSize: [50, 50],
	iconAnchor: [30, 10],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function TrackOrder() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [orders, setOrders] = useState([]);
	const [menu, setMenu] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
	const [totals, setTotals] = useState([]);
	const [mapData, setMapData] = useState([]);
	const mapRef = useRef();

	useEffect(() => {
		const getData = async () => {
			const response = await fetch(
				"http://localhost:8080/geoserver/ne/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ne%3Aorders&maxFeatures=50&outputFormat=application%2Fjson&CQL_FILTER=status='pending'"
			);
			const data = await response.json();
			setMapData(data.features);
		};
		getData();
	}, [orders]);

	useEffect(() => {
		const getOrders = async () => {
			const data = await fetchActiveOrders();
			setOrders(data);
		};
		getOrders();
		setSelectedIndex(0);
	}, []);

	useEffect(() => {
		const calculateTotals = async () => {
			const newRestaurants = [];
			const newTotals = [];
			for (const order of orders) {
				const restaurantId = order.restaurant_id;
				const restaurant = await fetchRestaurantById(restaurantId);
				const menuId = restaurant.menu_id;
				const menuData = await fetchMenu(menuId);
				const total = calculateTotalFromCart(order.items, menuData);
				newRestaurants.push(restaurant);
				newTotals.push(total);
			}
			setRestaurants(newRestaurants);
			setTotals(newTotals);
		};
		if (orders.length > 0) {
			calculateTotals();
		}
	}, [orders]);

	useEffect(() => {
		const menuId = restaurants[selectedIndex]?.menu_id;
		if (menuId) {
			const getMenu = async () => {
				const data = await fetchMenu(menuId);
				setMenu(data);
			};
			getMenu();
		}
	}, [selectedIndex, restaurants]);

	useEffect(() => {
		if (mapRef.current && orders.length > 0 && mapData.length > 0) {
			const selectedOrder = orders[selectedIndex];
			const selectedFeature = mapData.find(
				(feature) =>
					parseInt(feature.id.split(".")[1]) ===
					parseInt(selectedOrder.id)
			);
			if (selectedFeature) {
				const [lng, lat] = selectedFeature.geometry.coordinates;
				mapRef.current.setView([lat, lng], 11);
			}
		}
	}, [selectedIndex, orders, mapData]);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	const handleMarkerClick = (orderId) => {
		const index = orders.findIndex((order) => order.id === orderId);
		if (index !== -1) {
			setSelectedIndex(index);
		}
	};

	return (
		<div>
			<div className="trackorder_everything">
				<div className="trackorder_topbanner">
					<GlobalTopBanner />
				</div>
				<div className="trackorder_midbanner">
					<div className="trackorder_map_wrapper">
						<MapContainer
							className="trackorder_map"
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
							</LayersControl>
							{mapData.map((feature, index) => {
								const orderId = parseInt(
									feature.id.split(".")[1]
								);
								return (
									<Marker
										key={index}
										position={[
											feature.geometry.coordinates[1],
											feature.geometry.coordinates[0],
										]}
										icon={DefaultIcon}
										eventHandlers={{
											click: () =>
												handleMarkerClick(orderId),
										}}
									></Marker>
								);
							})}
						</MapContainer>
					</div>
					<div className="trackorder_right">
						<div className="trackorder_list_wrapper">
							<List
								sx={{
									width: "100%",
									height: "95%",
									bgcolor: "background.secondary",
									overflow: "auto",
								}}
							>
								{orders.map((order, index) => (
									<ListItem
										sx={{borderBottom: "2px solid #d2a124"}}
										alignItems="flex-start"
										key={order.id}
									>
										<ListItemButton
											selected={selectedIndex === index}
											onClick={(event) =>
												handleListItemClick(
													event,
													index
												)
											}
										>
											<ListItemText
												primary={
													restaurants[index]?.name ||
													"Unknown"
												}
												secondary={
													<>
														<Typography
															sx={{
																display:
																	"inline",
															}}
															component="span"
															variant="body2"
															color="text.primary"
														>
															{order?.status.toUpperCase() ||
																"Unknown"}
														</Typography>
														<Box
															component="span"
															sx={{
																marginLeft:
																	"35px",
															}}
														>
															{totals[index] +
																"zł" ||
																"Unknown"}
														</Box>
													</>
												}
											/>
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</div>
						<div className="trackorder_details_wrapper">
							<List
								sx={{
									width: "100%",
									height: "95%",
									bgcolor: "background.secondary",
									overflow: "auto",
								}}
							>
								{orders[selectedIndex]?.items && menu ? (
									Object.entries(orders[selectedIndex].items)
										.filter(([itemId, count]) => count > 0)
										.map(([itemId, count]) => {
											const menuItem = menu.find(
												(item) =>
													item.id === parseInt(itemId)
											);
											if (!menuItem) return null;
											return (
												<ListItem
													alignItems="flex-start"
													key={itemId}
													sx={{
														borderBottom:
															"2px solid #d2a124",
													}}
												>
													<ListItemText
														primary={menuItem.name}
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
																	$
																	{
																		menuItem.price
																	}{" "}
																	x {count}
																</Typography>
															</React.Fragment>
														}
													/>
												</ListItem>
											);
										})
								) : (
									<div>Loading...</div>
								)}
							</List>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
