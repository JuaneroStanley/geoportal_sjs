import {query} from "@/app/global/db";

export async function DELETE(req, {params}) {
	const {id} = params;

	try {
		const {rows} = await query(
			"DELETE FROM orders WHERE id = $1 RETURNING *",
			[id]
		);
		if (rows.length === 0) {
			return new Response(JSON.stringify({error: "Order not found"}), {
				status: 404,
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
		return new Response(
			JSON.stringify({
				message: "Order deleted successfully",
				order: rows[0],
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		console.error("Error deleting order:", error);
		return new Response(JSON.stringify({error: "Internal Server Error"}), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
