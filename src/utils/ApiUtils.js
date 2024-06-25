export const fetchActiveOrders = async () => {
	try {
		const response = await fetch("/api/orders/active");
		if (!response.ok) {
			throw new Error(
				`Failed to fetch active orders: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch active orders", error);
		throw error;
	}
};

export const fetchDeliveredOrders = async () => {
	try {
		const response = await fetch("/api/orders/delivered");
		if (!response.ok) {
			throw new Error(
				`Failed to fetch delivered orders: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch delivered orders", error);
		throw error;
	}
};

export const fetchRestaurantById = async (restaurantId) => {
	try {
		const response = await fetch(`/api/restaurants/${restaurantId}`);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch restaurant: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch restaurant", error);
		throw error;
	}
};

export const fetchMenu = async (menuId) => {
	try {
		const response = await fetch(`/api/menu/${menuId}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch menu: ${response.statusText}`);
		}
		const data = await response.json();
		const menu = data[0];
		const combinedMenuData = menu.item_names.map((name, index) => ({
			id: index,
			name: name,
			price: menu.item_prices[index],
		}));
		return combinedMenuData;
	} catch (error) {
		console.error("Failed to fetch menu", error);
		throw error;
	}
};

export const fetchGeom = async (restaurantId) => {
	try {
		const response = await fetch(`/api/restaurants/geom/${restaurantId}`);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch geom response: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch geom", error);
		throw error;
	}
};

export const calculateTotalFromCart = (cart, menuData) => {
	let newTotal = 0;
	if (menuData) {
		Object.entries(cart).forEach(([itemId, count]) => {
			const menuItem = menuData.find(
				(item) => item.id === parseInt(itemId)
			);
			if (menuItem) {
				newTotal += menuItem.price * count;
			}
		});
	}
	return newTotal.toFixed(2);
};

export const deleteOrder = async (orderId) => {
	try {
		const response = await fetch(`/api/orders/delete/${orderId}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		console.log("Order deleted successfully:", data);
	} catch (error) {
		console.error("Failed to delete order:", error);
	}
};

export const placeOrder = async (order) => {
	const orderChanged = {
		geom: order.geom,
		restaurant_id: order.restaurant_id,
		items: order.items,
	};
	try {
		const response = await fetch("/api/orders/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderChanged),
		});

		if (!response.ok) {
			throw new Error("Failed to place order");
		}

		const result = await response.json();
		console.log("Order placed successfully:", result);
	} catch (error) {
		console.error("Error placing order:", error);
	}
};
