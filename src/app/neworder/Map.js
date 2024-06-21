"use client";
import {MapContainer, Marker, TileLayer, LayersControl} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map() {
	return (
		<MapContainer className="map" center={[52.232222, 21.0]} zoom={6}>
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
	);
}
