"use client";
import React from "react";
import TextField from "@mui/material/TextField";
//import {TextField,Button} from "../global/mui";
import Button from "@mui/material/Button";
import "./Login.css";
import GlobalTopBanner from "../global/GlobalTopBanner";
import {Link} from "react-router-dom";

export default function Login() {
	return (
		<div className="login_everything">
			<div className="login_topbanner">
				<GlobalTopBanner />
			</div>
			<div className="login_midbanner">
				<div className="login_exsiting">
					<div className="login_exsisting_top">Existing User</div>
					<div className="login_exsisting_mid">
						<div className="login_exsisting_user">
							<TextField
								className="login_exsisting_user_field"
								id="filled-basic"
								label="Username"
								variant="filled"
							></TextField>
						</div>
						<div className="login_exsisting_password">
							<TextField
								className="login_exsisting_password_field"
								id="filled-password-input"
								type="password"
								label="Password"
								autoComplete="current-password"
								variant="filled"
							></TextField>
						</div>
					</div>
					<div className="login_exsisting_bot">
						<Link to="/services">
							<Button
								className="login_exsisting_btn"
								variant="contained"
								sx={{fontSize: "26px"}}
							>
								LOGIN
							</Button>
						</Link>
					</div>
				</div>
				<div className="login_new">
					<div className="login_new_top">Register</div>
					<div className="login_new_mid">
						<div className="login_new_email">
							<TextField
								className="login_new_email_field"
								id="filled-basic"
								label="Email"
								variant="filled"
							></TextField>
						</div>
						<div className="login_new_password">
							<TextField
								className="login_new_password_field"
								id="filled-password-input"
								type="password"
								label="Password"
								autoComplete="current-password"
								variant="filled"
							></TextField>
						</div>
						<div className="login_new_repeat_password">
							<TextField
								className="login_new_repeat_password_field"
								id="filled-password-input"
								type="password"
								label="Repeat Password"
								autoComplete="current-password"
								variant="filled"
							></TextField>
						</div>
					</div>
					<div className="login_new_bot">
						<Link to="/services">
							<Button
								className="login_new_btn"
								variant="contained"
								sx={{fontSize: "26px"}}
							>
								REGISTER
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
