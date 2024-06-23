"use client";
import React from "react";
import GlobalTopBanner from "../global/GlobalTopBanner";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { Avatar, Button, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./TrackOrder.css";

export default function TrackOrder() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [orders, setOrders] = React.useState([]);
  const [menu, setMenu] = React.useState([null]);
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    const fetchActiveOrders = async () => {
      try {
        const response = await fetch("/api/orders/active");
        const data = await response.json();
        console.log("Fetched active orders:", data); // Log data to console
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch active orders", error);
      }
    };

    fetchActiveOrders();
  }, []);

  React.useEffect(() => {
    const fetchRestaurantsOfActiveOrders = async () => {
      const newRestaurants = [];
      for (const order of orders) {
        try {
          const response = await fetch(
            `/api/restaurants/${order.restaurant_id}`
          );
          const data = await response.json();
          console.log("Fetched restaurant:", data); // Log data to console
          newRestaurants.push(data);
        } catch (error) {
          console.error("Failed to fetch restaurant", error);
        }
      }
      setRestaurants(newRestaurants);
    };

    if (orders.length > 0) {
      fetchRestaurantsOfActiveOrders();
    }
  }, [orders]);

  const fetchMenu = async (menuId) => {
    try {
      const response = await fetch(`/api/menu/${menuId}`);
      const data = await response.json();
      console.log("Fetched menu:", data); // Log data to console
      setMenu(data);
    } catch (error) {
      console.error("Failed to fetch menu", error);
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
                  <ListItem alignItems="flex-start" key={order.id}>
                    <ListItemButton selected={selectedIndex === index}>
                      <ListItemText
                        primary={restaurants[index]?.name || "Unknown"}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {order?.status.toUpperCase() || "Unknown"}
                            </Typography>
                            <Typography component="span">{"553zł"}</Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>
            <Button
              className="trackorder_button"
              variant="contained"
              color="primary"
              style={{ fontSize: "26px" }}
              onClick={(event) => handleButtonItemClick(event)}
            >
              Zamów
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
