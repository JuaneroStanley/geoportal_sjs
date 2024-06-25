"use client";
import React from "react";
import GlobalTopBanner from "../global/GlobalTopBanner";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Box,
	Typography,
	Button,
} from "@mui/material";
import {useEffect} from "react";
import "./OrderHistory.css";
import {
	fetchMenu,
	fetchRestaurantById,
	fetchDeliveredOrders,
	calculateTotalFromCart,
	deleteOrder,
	placeOrder,
} from "@/utils/ApiUtils";
import {useRouter} from "next/navigation";

function OrderHistory() {
	const [orders, setOrders] = React.useState([]);
	const [selectedOrder, setSelectedOrder] = React.useState(0);
	const [restaurants, setRestaurants] = React.useState([]);
	const [totals, setTotals] = React.useState([]);
	const [menu, setMenu] = React.useState([]);
	const router = useRouter();
	const [deletedOrder, setDeletedOrder] = React.useState(false);

	useEffect(() => {
		const getGetDeliveredOrders = async () => {
			const data = await fetchDeliveredOrders();
			setOrders(data);
		};
		getGetDeliveredOrders();
	}, []);

	useEffect(() => {
		const calculateTotals = async () => {
			const newRestaurants = [];
			const newTotals = [];
			for (const order of orders) {
				const restaurantId = order.restaurant_id;
				const restaurant = await fetchRestaurantById(restaurantId);
				const menuId = restaurant.menu_id;
				if (!menuId) return null;
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
		const getMenu = async () => {
			const menuId = restaurants[selectedOrder]?.menu_id;
			if (!menuId) return null;
			const data = await fetchMenu(menuId);
			setMenu(data);
		};
		getMenu();
	}, [selectedOrder, restaurants]);

	const orderAgainButtonHandler = async () => {
		const order = orders[selectedOrder];
		await placeOrder(order);
		router.push("./trackorder");
	};

	const deleteButtonHandler = () => {
		deleteOrder(orders[selectedOrder].id);
		orders.splice(selectedOrder, 1);
		setOrders([...orders]);
	};

	return (
		<div className="orderhistory_all">
			<div className="orderhistory_topbanner">
				<GlobalTopBanner />
			</div>
			<div className="orderhistory_midbanner">
				<div className="orderhistory_orderslist_wrapper">
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
								sx={{
									borderBottom: "2px solid #d2a124",
								}}
								alignItems="flex-start"
								key={order.id}
							>
								<ListItemButton
									selected={selectedOrder === index}
									onClick={() => setSelectedOrder(index)}
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
														display: "inline",
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
														marginLeft: "35px",
													}}
												>
													{totals[index] + "zł" ||
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
				<div className="orderhistory_orderdetails_wrapper">
					<div className="orderhistory_title">
						{orders[selectedOrder] ? (
							<Typography variant="h4">
								Order #{orders[selectedOrder].id} Details
							</Typography>
						) : (
							<Typography variant="h4">Loading...</Typography>
						)}
					</div>
					<div className="orderhistory_orderdetails">
						<List
							sx={{
								width: "100%",
								height: "95%",
								bgcolor: "background.secondary",
								overflow: "auto",
							}}
						>
							{orders[selectedOrder]?.items && menu ? (
								Object.entries(orders[selectedOrder].items).map(
									([itemId, count]) => {
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
																{menuItem.price}{" "}
																x {count}
															</Typography>
														</React.Fragment>
													}
												/>
											</ListItem>
										);
									}
								)
							) : (
								<div
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "100%",
									}}
								>
									Select the order to see details
								</div>
							)}
						</List>
					</div>
					<div className="orderhistory_button_wrapper">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => orderAgainButtonHandler()}
						>
							Order Again
						</Button>
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => deleteButtonHandler()}
						>
							Delete Order
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderHistory;
