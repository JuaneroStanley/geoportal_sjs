import {query} from "@/app/global/db";

export async function GET(req) {
	try {
		const {rows} = await query(
			"SELECT * FROM orders WHERE status = 'delivered'"
		);
		return new Response(JSON.stringify(rows), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error fetching active orders:", error.message);
		return new Response(JSON.stringify({error: "Internal Server Error"}), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
