import {Pool} from "pg";

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	database: "geoportal_sjs",
	password: "Sql234OIE",
});

export const query = (text, params) => pool.query(text, params);
