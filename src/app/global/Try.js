import React from "react";
const {Client} = require("pg");

export default function Try() {
	const client = new Client({
		user: "postgres",
		host: "localhost",
		database: "psip",
		password: "Sql234OIE",
		port: 5432,
	});

	client
		.connect()
		.then(() => {
			console.log("Connected to PostgreSQL database");
		})
		.catch((err) => {
			console.error("Error connecting to PostgreSQL database", err);
		});
}
