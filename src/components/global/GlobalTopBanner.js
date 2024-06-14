"use client";
import React from "react";
import "./GlobalTopBanner.css";
import MenuButton from "./MenuButton";
import Logo from "./Logo";

export default function GlobalTopBanner() {
	return (
		<div className="global_top_banner">
			<Logo className="item_left" />
			<MenuButton className="item_right" />
		</div>
	);
}
