import { query } from "@/app/global/db";

export async function POST(req) {
  const { geom, restaurant_id, items } = await req.json();
  try {
    const { rows } = await query(
      "INSERT INTO orders (geom, restaurant_id, items,status) VALUES (ST_SetSRID($1::geometry, 4326), $2, $3, $4) RETURNING *",
      [geom, restaurant_id, items, "pending"]
    );
    return new Response(JSON.stringify(rows[0]), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
