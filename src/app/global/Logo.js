import React from "react";
import "./Logo.css";
import Link from "next/link";

function Logo() {
  return (
    <div className="logo">
      <div className="logo_text">
        <div className="left_logo">FOOD.</div>
        <div className="right_logo">GIVEME</div>
      </div>
      <Link href="/">
        <button className="logo_btn"></button>
      </Link>
    </div>
  );
}

export default Logo;
