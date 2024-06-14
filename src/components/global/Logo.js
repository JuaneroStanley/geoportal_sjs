"use client";
import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="logo">
      <div className="logo_text">
        <div className="left_logo">FOOD.</div>
        <div className="right_logo">GIVEME</div>
      </div>
      <Link to="/">
        <button className="logo_btn"></button>
      </Link>
    </div>
  );
}

export default Logo;
